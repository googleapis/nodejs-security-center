/**
 * Copyright 2019, Google, LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const {assert} = require('chai');
const execa = require('execa');
const uuid = require('uuid');
const organization = process.env['GCLOUD_ORGANIZATION']

// Skipped because createSource requires special permissions only
// grantable on the organization level.
it.skip('should run the quickstart', async () => {
  const {stdout} = await execa.shell(
    `node quickstart ${organization}`
  );

  assert.match(stdout, /Source created\./);
});
