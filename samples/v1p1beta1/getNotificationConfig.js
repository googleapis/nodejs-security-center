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

function main(organizationId = 'your-org-id', configId = 'your-config-id') {
  // [START scc_get_notification_configs]
  // npm install @google-cloud/security-center/
  const {
    SecurityCenterClient,
  } = require('@google-cloud/security-center').v1p1beta1;

  const client = new SecurityCenterClient();

  // TODO(UpdateMe) organizationId = "your-org-id";
  // TODO(UpdateMe) configId = "your-config-id";
  const formattedConfigName = client.notificationConfigPath(
    organizationId,
    configId
  );

  async function getNotificationConfg() {
    const [response] = await client.getNotificationConfig({
      name: formattedConfigName,
    });
    console.log('Notification config: ', response);
  }

  getNotificationConfg();
  // [END scc_get_notification_configs]
}

main(...process.argv.slice(2));
