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

const {assert} = require('chai');
const execa = require('execa');
const exec = async cmd => (await execa(cmd, {shell: true})).stdout;

const organization_id = process.env['GCLOUD_ORGANIZATION'];

describe('listAllAssets', () => {
  it('should print all assets in org', async () => {
    const output = await exec(`node v1/listAllAssets.js ${organization_id}`);
    assert.isAtLeast(output.match(/\n/g).length + 1, 62);
    assert.notMatch(output, /undefined/);
  });
});
