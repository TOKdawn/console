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
  // Banner
  SERVICE_PL: '服務',
  SERVICE_DESC: '服務（Service）提供一種抽象的方法，將運行在容器组（Pod）上的應用程式公開為網路服務。',
  // List
  SERVICE_EMPTY_DESC: '請創建一個服務。',
  UNKNOWN: '未知',
  EXTERNAL_ACCESS: '外網訪問',
  // List > Edit YAML
  // List > Edit Service
  UNKNOWN_SERVICE_TYPE: '未知服務類型',
  // List > Delete
  SERVICE: '服務',
  SERVICE_LOW: '服務',
  // List > Create
  INTERNAL_ACCESS_MODE: '内部訪問模式',
  CREATE_SERVICE: '創建服務',
  // List > Create > Basic Information
  SERVICE_NAME_DESC: '名稱只能包含小寫字母、數字和連字符號（-），必須以小寫字母開頭並以小寫字母或數字结尾，最長 63 個字元。',
  // List > Create > Service Settings
  VIRTUAL_IP_TITLE: '虚擬 IP 地址',
  INTERNAL_DOMAIN_NAME: '内部域名',
  CONTAINER_PORT: '容器通訊埠',
  INVALID_PORT: '通訊埠無效。',
  PORT_EMPTY: '請輸入通訊埠',
  ENTER_SELECTOR_TIP: '請設置工作負載選擇器。',
  Ports: '通訊埠',
  SPECIFY_WORKLOAD: '指定工作負載',
  SELECT_WORKLOAD_DESC: '使用工作負載的標籤作為選擇器。',
  VIRTUAL_IP_DESC: 'The cluster generates a unique IP address for the Service and the Service can be accessed within the cluster using this IP address.',
  INTERNAL_DOMAIN_NAME_DESC: 'The cluster does not generate an IP address for the Service and the Service can be directly accessed using the Endpoint IP address of the Service.',
  SERVICE_PORTS_DESC: 'Set the container ports and Service ports.',
  NO_WORKLOAD_MATCH_SELECTOR: 'The current selector matches no workload.',
  WORKLOADS_MATCH_SELECTOR_SI: 'The current selector ({selector}) matches {count} workload.',
  WORKLOADS_MATCH_SELECTOR_PL: 'The current selector ({selector}) matches {count} workloads.',
  WORKLOAD_SELECTOR: 'Workload Selector',
  SERVICE_SETTINGS: '服務設置',
  // List > Create > Service Settings > Workload Selector > View Details
  TOTAL_WORKLOADS_VALUE: '共 {count} 個工作負載',
  // List > Create > Advanced Settings
  STICKY_SESSION: '會話保持',
  MAXIMUM_STICKINESS_DURATION: '最大會話保持時間（s）',
  STICKY_SESSION_DESC: 'Set the system to forward all requests from the same client to the same backend within a specified duration.',
  SERVICE_EXTERNAL_ACCESS_DESC: '將服務暴露给外網',
  ACCESS_NODEPORT_TIP: '通過集群節點的對應端口來訪問服務。',
  ACCESS_LOADBALANCER_TIP: '通過負載平衡器來訪問服務。',
  WORKLOAD_ANNOTATIONS: 'Workload Annotations',
  LABEL_FORMAT_DESC: 'The key and value can contain only uppercase and lowercase letters, numbers, hyphens (-), underscores (_), and dots (.), and must begin and end with an uppercase or lowercase letter or number. The maximum length is 63 characters. If the key contains the domain name, the maximum length is 253 characters.'
};