/*
 * Copyright 2019, Google, LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/**
 * Demonstrates how to determine if your service user has appropriate
 * access to create and update findings.
 */
function main(sourceName = 'FULL_SOURCE_PATH') {
  // [START demo]
  // Imports the Google Cloud client library.
  const {SecurityCenterClient} = require('@google-cloud/security-center');

  // Creates a new client.
  const client = new SecurityCenterClient();

  // sourceName is the full resource name of the source to test for permissions.
  /*
   * TODO(developer): Uncomment the following lines
   */
  // const sourceName = "organizations/111122222444/sources/1234";
  async function testIam() {
    {
      const [policy] = await client.testIamPermissions({
        resource: sourceName,
        permissions: ['securitycenter.findings.update'],
      });
      console.log(
        `Permissions to create/update findings? ${
          policy.permissions.length > 0
        }`
      );
    }
    {
      const [policy] = await client.testIamPermissions({
        resource: sourceName,
        permissions: ['securitycenter.findings.setState'],
      });
      console.log(
        `Permissions to update state? ${policy.permissions.length > 0}`
      );
    }
  }
  testIam();
  // [END demo]
}

main(...process.argv.slice(2));
