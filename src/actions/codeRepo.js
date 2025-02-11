/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2022 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */
import { Modal } from 'components/Base'
import { Notify } from '@kube-design/components'
import DeleteModal from 'components/Modals/Delete'
import CodeRepoModal from 'components/Modals/CodeRepoCreate'
import FORM_TEMPLATES from 'utils/form.templates'
import { cloneDeep, get, set } from 'lodash'

const getRepoUrl = (repoType, repo) => {
  switch (repoType) {
    case 'github':
      return `https://github.com/${repo.owner}/${repo.repo}`
    case 'gitlab':
      return `${repo.server_name}/${repo.repo}`
    case 'bitbucket_server':
      return `${repo.api_uri}/${repo.repo}`
    default:
      return repo.repo || repo.url || repo.remote
  }
}

const handleFormData = ({ data, module, devops, formTemplate }) => {
  const postData = FORM_TEMPLATES[module]({ namespace: devops })
  const repoType = data.sources.source_type
  const repo = get(data, `sources.${repoType}_source`, {})
  const repoURL = repo.repo || repo.url || repo.remote
  let isEditCodeURl = false

  if (formTemplate) {
    const editRepo = get(formTemplate, `sources.${repoType}_source`, {})
    const editRepoURL = editRepo.repo || editRepo.url || editRepo.remote
    isEditCodeURl = editRepoURL === repoURL
  }

  const url = !isEditCodeURl ? getRepoUrl(repoType, repo) : repoURL

  const spec = {
    provider: data.sources.source_type,
    url,
    secret: {
      name: repo.credential_id || data.sources.credentialId,
      namespace: devops,
    },
  }

  set(postData, 'metadata', data.metadata)
  set(postData, 'spec', spec)
  return postData
}

export default {
  'codeRepo.create': {
    on({ store, cluster, devops, module, success, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          const postData = handleFormData({ data, module, devops })

          await store.create({ data: postData, devops })

          Notify.success({ content: t('CREATE_SUCCESSFUL') })
          success && success()
          Modal.close(modal)
        },
        store,
        module,
        cluster,
        devops,
        formTemplate: {},
        modal: CodeRepoModal,
        ...props,
      })
    },
  },
  'codeRepo.edit': {
    on({ store, cluster, devops, module, detail, success, ...props }) {
      const template = cloneDeep(detail)
      const metadata = get(template, '_originData.metadata', {})

      const type = template.provider === 'git' ? 'url' : 'repo'

      const editTemplate = {
        metadata,
        sources: {
          source_type: template.provider,
          [`${template.provider}_source`]: {
            [type]: template.repoURL,
          },
          credentialId: template.secret.name,
        },
      }

      const modal = Modal.open({
        onOk: async data => {
          const postData = handleFormData({
            data,
            module,
            devops,
            formTemplate: editTemplate,
          })

          await store.edit({ data: postData, devops, name: detail.name })

          Notify.success({ content: t('UPDATE_SUCCESSFUL') })
          success && success()
          Modal.close(modal)
        },
        store,
        module,
        cluster,
        devops,
        formTemplate: editTemplate,
        modal: CodeRepoModal,
        isEdit: true,
        ...props,
      })
    },
  },
  'codeRepo.delete': {
    on({ store, detail, devops, success, ...props }) {
      const modal = Modal.open({
        onOk: async () => {
          await store.delete({ ...detail, devops })
          Modal.close(modal)
          Notify.success({ content: t('DELETE_SUCCESSFUL') })
          success && success()
        },
        store,
        modal: DeleteModal,
        resource: detail.name,
        ...props,
      })
    },
  },
}
