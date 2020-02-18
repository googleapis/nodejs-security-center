// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const {SecurityCenterClient} =
    require('@google-cloud/security-center').v1p1beta1;
const {assert} = require('chai');
const {describe, it, before} = require('mocha');
const {execSync} = require('child_process');
const exec = cmd => execSync(cmd, {encoding: 'utf8'});

const organizationId = process.env['GCLOUD_ORGANIZATION'];
const orgName = 'organizations/' + organizationId;
const pubsubTopic = 'projects/project-a-id/topics/notification-sample-topic';

describe('Client with Notifications', async () => {
  const createConfig = 'notif-config-test-node-create';
  const deleteConfig = 'notif-config-test-node-delete';
  const getConfig = 'notif-config-test-node-get';
  const listConfig = 'notif-config-test-node-list';
  const updateConfig = 'notif-config-test-node-update';

  before(async () => {
    const client = new SecurityCenterClient();
    async function createNotificationConfig(configId) {
      const [response] = await client.createNotificationConfig({
        parent: orgName,
        configId: configId,
        notificationConfig: {
          description: 'Sample config for node.js',
          pubsubTopic: pubsubTopic,
          eventType: 'FINDING',
          streamingConfig: {filter: 'state = "ACTIVE"'},
        },
      });
    }

    createNotificationConfig(deleteConfig);
    createNotificationConfig(getConfig);
    createNotificationConfig(listConfig);
    createNotificationConfig(updateConfig);
  });

  after(async () => {
    const client = new SecurityCenterClient();
    async function deleteNotificationConfig(configId) {
      const name = client.notificationConfigPath(organizationId, configId);
      await client.deleteNotificationConfig({name: name});
    }

    deleteNotificationConfig(createConfig);
    deleteNotificationConfig(getConfig);
    deleteNotificationConfig(listConfig);
    deleteNotificationConfig(updateConfig);
  });

  it('client can create config', () => {
    const output = exec(`node v1p1beta1/createNotificationConfig.js ${
        organizationId} ${createConfig} ${pubsubTopic}`)
    assert.match(output, new RegExp(createConfig));
    assert.match(output, /Notification config creation succeeded/);
    assert.notMatch(output, /undefined/);
  });

  it('client can delete config', () => {
    const output = exec(`node v1p1beta1/deleteNotificationConfig.js ${
        organizationId} ${deleteConfig}`)
    assert.match(output, /Notification config delete/);
    assert.notMatch(output, /undefined/);
  });

  it('client can get config', () => {
    const output = exec(`node v1p1beta1/getNotificationConfig.js ${
        organizationId} ${createConfig}`)
    assert.match(output, new RegExp(getConfig));
    assert.match(output, /Notification config/);
    assert.notMatch(output, /undefined/);
  });

  it('client can list configs', () => {
    const output =
        exec(`node v1p1beta1/listNotificationConfigs.js ${organizationId}`)
    assert.match(output, new RegExp(listConfig));
    assert.match(output, /Received Notification configs/);
    assert.notMatch(output, /undefined/);
  });

  it('client can update configs', () => {
    const output = exec(`node v1p1beta1/updateNotificationConfig.js ${
        organizationId} ${createConfig} ${pubsubTopic}`)
    assert.match(output, new RegExp(updateConfig));
    assert.match(output, /notification config update succeeded/);
    assert.notMatch(output, /undefined/);
  });
});
