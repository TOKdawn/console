/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
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

import { get, has, isEmpty, set, debounce } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import { getDisplayName } from 'utils'
import { PATTERN_ENV_NAME } from 'utils/constants'
import classNames from 'classnames'
import { Input, Select, Icon } from '@kube-design/components'
import styles from './index.scss'

import ObjectInput from '../ObjectInput'

export default class EnvironmentInputItem extends React.Component {
  state = {
    keyError: false,
  }

  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    configMaps: PropTypes.array,
    secrets: PropTypes.array,
  }

  static defaultProps = {
    name: '',
    value: {},
    onChange() {},
    configMaps: [],
    secrets: [],
  }

  static getDerivedStateFromProps(nextProps) {
    const { value } = nextProps
    if (value.valueFrom) {
      return {
        envType: Object.keys(value.valueFrom)[0],
      }
    }
    return {
      envType: 'customization',
    }
  }

  get resourceOptions() {
    return [
      {
        label: t('CUSTOM'),
        value: 'customization',
      },
      {
        label: t('FROM_CONFIGMAP'),
        value: 'configMapKeyRef',
      },
      {
        label: t('FROM_SECRET'),
        value: 'secretKeyRef',
      },
    ]
  }

  componentDidMount() {
    this.checkName()
  }

  parseValue(data) {
    const resourceType = has(data, 'configMapKeyRef')
      ? 'configMapKeyRef'
      : 'secretKeyRef'
    const resourceName = get(data, `${resourceType}.name`, '')
    const resourceKey = get(data, `${resourceType}.key`, '')
    return { resourceType, resourceName, resourceKey }
  }

  handleResourceValueForm = name => {
    const { configMaps, secrets } = this.props
    const { envType } = this.state

    const valueFrom = {}
    let data

    if (envType === 'configMapKeyRef') {
      data = configMaps.find(item => item.name === name)
    } else if (envType === 'secretKeyRef') {
      data = secrets.find(item => item.name === name)
    }

    valueFrom[envType] = {
      name: data ? data.name : '',
      key: '',
    }

    return { valueFrom, resourceType: envType }
  }

  handleChange = value => {
    const { onChange } = this.props
    const isEmptyValue = Object.values(value).every(_value => {
      return isEmpty(_value)
    })

    if (isEmptyValue) {
      return
    }

    const newValue = { name: '', valueFrom: {} }

    if (value.resource) {
      const { valueFrom, resourceType } = this.handleResourceValueForm(
        value.resource
      )

      newValue.valueFrom = { ...valueFrom }

      if (value.resourceKey) {
        newValue.valueFrom[resourceType].key = value.resourceKey
      }
    }

    newValue.name = value.name
    onChange(newValue)
  }

  handleKeyData = data => {
    const newValue = { ...this.props.value }
    const key = Object.keys(newValue.valueFrom)

    if (key) {
      set(newValue, `valueFrom.${key}.key`, data)
    }

    if (!newValue.name) {
      newValue.name = data
    }

    this.props.onChange(newValue)
  }

  get getConfigOrSecretOptions() {
    const { configMaps, secrets } = this.props
    const { envType } = this.state
    return envType === 'configMapKeyRef'
      ? configMaps.map(config => ({
          label: getDisplayName(config),
          value: config.name,
        }))
      : secrets.map(secret => ({
          label: getDisplayName(secret),
          value: secret.name,
        }))
  }

  checkName = () => {
    const { value = {} } = this.props
    if (value.valueFrom) {
      this.validEnvKey(value.name, value)
    }
  }

  handleCfOrScChange = cfOrScName => {
    const { envType } = this.state

    this.props.onChange({
      name: this.props.value.name || '',
      valueFrom: {
        [envType]: {
          name: cfOrScName || '',
          key: '',
        },
      },
    })
  }

  getKeysOptions({ resourceType, resourceName }) {
    const { configMaps, secrets } = this.props

    let data
    if (resourceType === 'configMapKeyRef') {
      data = configMaps.find(item => item.name === resourceName)
    } else if (resourceType === 'secretKeyRef') {
      data = secrets.find(item => item.name === resourceName)
    }

    if (!data) {
      return []
    }

    return Object.keys(data.data || {}).map(key => ({
      label: key,
      value: key,
    }))
  }

  validEnvKey = debounce((value, target = {}) => {
    const { handleKeyError, handleInputError } = this.props
    const invalid = !PATTERN_ENV_NAME.test(value)
    if (value === '' && target.value === '') {
      handleKeyError()
      handleInputError()
      this.setState({
        keyError: false,
      })
    } else {
      if (invalid) {
        const message =
          value !== ''
            ? t('ENVIRONMENT_INVALID_TIP')
            : t('ENVIRONMENT_CANNOT_BE_EMPTY')
        handleInputError({ message })
        handleKeyError({ message })
      } else {
        handleKeyError()
        handleInputError()
      }
      this.setState({
        keyError: invalid,
      })
    }
  }, 300)

  handleValueChange = debounce(({ name, value }) => {
    if (name === '' && value === '') {
      this.props.handleKeyError()
      this.props.handleInputError()
      this.setState({
        keyError: false,
      })
    } else {
      this.validEnvKey(name, value)
    }
  }, 300)

  handleTypeChange = val => {
    const { value, onChange } = this.props
    this.setState(
      {
        envType: val,
      },
      () => {
        if (val !== 'customization') {
          onChange({
            name: value.name || '',
            valueFrom: {
              [val]: {
                name: '',
                key: '',
              },
            },
          })
        } else {
          onChange({
            name: value.name || '',
            value: '',
          })
        }
      }
    )
  }

  renderConfigOrSecret = () => {
    const { value = {} } = this.props
    const { keyError, envType } = this.state

    const { resourceType, resourceName, resourceKey } = this.parseValue(
      value.valueFrom
    )

    const formatValue = {
      name: value.name,
      resource: resourceName,
      resourceKey,
    }

    return (
      <ObjectInput value={formatValue} onChange={this.handleChange}>
        <div className={styles.typeBox}>
          <Select
            options={this.resourceOptions}
            onChange={this.handleTypeChange}
            value={envType}
          ></Select>
        </div>
        <Input
          name="name"
          placeholder={t('KEY')}
          className={classNames({
            [styles.formError]: keyError,
          })}
          onChange={v => this.validEnvKey(v, value)}
        />
        <Select
          name="resource"
          placeholder={t('RESOURCE')}
          prefixIcon={
            <Icon name={envType === 'configMapKeyRef' ? 'hammer' : 'key'} />
          }
          options={this.getConfigOrSecretOptions}
          onChange={this.handleCfOrScChange}
        />
        <Select
          name="resourceKey"
          placeholder={t('KEY_IN_RESOURCE')}
          options={this.getKeysOptions({ resourceType, resourceName })}
          onChange={this.handleKeyData}
        />
      </ObjectInput>
    )
  }

  render() {
    const { value = {}, onChange } = this.props
    const { keyError, envType } = this.state

    if (value.valueFrom) {
      return this.renderConfigOrSecret()
    }

    return (
      <ObjectInput value={value} onChange={onChange}>
        <div className={styles.typeBox}>
          <Select
            options={this.resourceOptions}
            onChange={this.handleTypeChange}
            value={envType}
          ></Select>
        </div>
        <Input
          name="name"
          placeholder={t('KEY')}
          className={classNames({
            [styles.formError]: keyError,
          })}
          onChange={v => this.validEnvKey(v, value)}
        />
        <Input
          name="value"
          placeholder={t('VALUE')}
          onChange={() => this.handleValueChange(value)}
        />
      </ObjectInput>
    )
  }
}
