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

function main(
  projectId = 'your-project-id',
  subscriptionId = 'your-subscription-id'
) {
  // [START scc_receive_notifications]
  const {PubSub} = require('@google-cloud/pubsub');
  const {StringDecoder} = require('string_decoder');

  const gax = require('google-gax');
  const path = require('path');
  const protobuf = require('protobufjs');

  let protoFilesRoot = new gax.GoogleProtoFilesRoot();
  // Load in proto root for Finding.
  protoFilesRoot = protobuf.loadSync(
    path.join(
      __dirname,
      '..',
      'node_modules',
      '@google-cloud',
      'security-center',
      'build',
      'protos',
      'google',
      'cloud',
      'securitycenter',
      'v1p1beta1',
      'securitycenter_service.proto'
    ),
    protoFilesRoot
  );

  // Load in proto root for NotificationMessage.
  protoFilesRoot = protobuf.loadSync(
    path.join(
      __dirname,
      '..',
      'node_modules',
      '@google-cloud',
      'security-center',
      'build',
      'protos',
      'google',
      'cloud',
      'securitycenter',
      'v1p1beta1',
      'notification_message.proto'
    ),
    protoFilesRoot
  );

  const NotificationMessage = protoFilesRoot.lookup(
    'google.cloud.securitycenter.v1p1beta1.NotificationMessage'
  );
  const Finding = protoFilesRoot.lookup(
    'google.cloud.securitycenter.v1p1beta1.Finding'
  );

  // projectId = 'your-project-id'
  // subscriptionId = 'your-subscription-id'

  const subscriptionName =
    'projects/' + projectId + '/subscriptions/' + subscriptionId;
  const pubSubClient = new PubSub();

  function listenForMessages() {
    const subscription = pubSubClient.subscription(subscriptionName);

    // message.data is a buffer array of json
    // 1. Convert buffer to normal string
    // 2. Convert json to NotificationMessage object
    const messageHandler = message => {
      const jsonString = new StringDecoder('utf-8').write(message.data);
      const parsedNotificationMessage = NotificationMessage.create(
        JSON.parse(jsonString)
      );
      const parsedFinding = Finding.create(parsedNotificationMessage.finding);

      console.log(parsedNotificationMessage);
      console.log(parsedFinding);

      // ACK when done with message
      message.ack();
    };

    subscription.on('message', messageHandler);

    // Set timeout to 1 minute
    setTimeout(() => {
      subscription.removeListener('message', messageHandler);
    }, 60000);
  }

  listenForMessages();
  // [END scc_receive_notifications]
}

main(...process.argv.slice(2));
