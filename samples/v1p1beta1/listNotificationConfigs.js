// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
'use strict';

function main(organizationId = 'your-org-id') {
  // [END scc_list_notification_configs]
  // npm install @google-cloud/security-center/
  const {
    SecurityCenterClient,
  } = require('@google-cloud/security-center').v1p1beta1;

  const client = new SecurityCenterClient();

  // TODO(UpdateMe) organizationId = "your-org-id";
  const orgName = client.organizationPath(organizationId);

  async function listNotificationConfigs() {
    const [resources] = await client.listNotificationConfigs({parent: orgName});
    console.log('Received Notification configs: ');
    for (const resource of resources) {
      console.log(resource);
    }
  }

  listNotificationConfigs();
  // [END scc_list_notification_configs]
}

main(...process.argv.slice(2));
