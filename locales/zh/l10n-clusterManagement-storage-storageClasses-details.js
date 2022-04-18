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
module.exports = {
  // Details
  TRUE: '是',
  FALSE: '否',
  // More > Set as Default Storage Class
  SET_DEFAULT_STORAGE_CLASS_TITLE: '设为默认存储类型',
  SET_AS_DEFAULT_STORAGE_CLASS: '设为默认存储类型',
  STORAGE_CLASS_SET_DEFAULT_DESC: '设置为默认存储类型后，如果没有特殊指定，系统将默认创建该类型的存储卷。一个 KubeSphere 集群中仅允许设置一个默认存储类型。',
  // More > Edit Authorization Rules
  SET_AUTHORIZATION_RULES: '设置授权规则',
  AUTHORIZATION_RULES: '授权规则',
  AUTHORIZATION_RULES_DESC: '设置授权规则使存储类型只能在特定项目和企业空间访问。',
  OPERATOR_IN: '属于',
  OPERATOR_NOT_IN: '不属于',
  // More > Set Volume Permissions
  SET_VOLUME_PERMISSIONS: '设置存储卷权限',
  VOLUME_CLONING: '存储卷克隆',
  VOLUME_CLONING_DESC: '允许用户克隆存储卷。',
  VOLUME_SNAPSHOT_CREATION: '存储卷快照创建',
  VOLUME_SNAPSHOT_CREATION_DESC: '允许用户创建存储卷快照。',
  VOLUME_EXPANSION_DESC: '允许用户对存储卷扩容。存储卷容量只能增加，不能减少。',
  SET_VOLUME_PERMISSIONS_TIP: '以下设置仅控制用户是否被允许在 Web 控制台执行操作。基于存储类型创建的存储卷是否实际支持这些操作取决于后端存储系统。',
  // More > Set Auto Expansion
  SET_AUTO_EXPANSION: '设置自动扩容',
  AUTO_EXPANSION: '自动扩容',
  AUTO_EXPANSION_DESC: '设置系统在存储卷剩余空间低于阈值时自动对存储卷进行扩容。',
  AUTO_EXPANSION_SETTINGS: '自动扩容设置',
  MAXIMUM_SIZE: '最大容量',
  INCREMENT: '容量增量',
  INCREMENT_DESC: 'Please set the increment according to the expansion step size of StorageClass-csi, otherwise it may not work.',
  RESTART_WORKLOAD_AUTOMATICALLY: '自动重启工作负载',
  RESTART_WORKLOAD_AUTOMATICALLY_DESC: '该系统自动检查存储卷状态，以确定是否需要重新启动工作负载。',
  RESTART_WORKLOAD_AUTOMATICALLY_TIP: '如果到达超时时间时存储卷仍未扩容成功，系统将在工作负载上添加“restart.kubesphere.io/skip”注解使工作负载不再被重启。如需再次为工作负载启用自动重启功能，您需要在工作负载上手动删除该注解。',
  // More > Delete
  // Volumes
  VOLUME_COUNT: '存储卷数量'
};