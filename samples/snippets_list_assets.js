/**
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

module.exports = {
  /* Prints all assets and returns a count of assets. */
  listAllAssets: function listAllAssets(organization_id) {
    // [START demo_list_all_assets]
    // Imports the Google Cloud client library.
    const sc = require('@google-cloud/security-center');

    // Creates a new client.
    const client = new sc.SecurityCenterClient();
    //  organization_id is the numeric ID of the organization.
    /*
     * TODO(developer): Uncomment the following lines
     */
    // organization_id = "1234567777"
    const orgName = client.organizationPath(organization_id);
    // Call the API with automatic pagination.
    return client
      .listAssets({parent: orgName})
      .then(responses => {
        // A page of results from the list query.
        const listAssetResults = responses[0];
        // The next request if the response shows that there are more
        // responses.
        for (let x = 0; x < listAssetResults.length; x += 1) {
          const asset = listAssetResults[x].asset;
          const asset_num = x + 1;
          console.log(
            asset_num +
              ' ' +
              asset.name +
              ' ' +
              asset.securityCenterProperties.resourceName
          );
        }
        return listAssetResults.length;
      })
      .catch(err => {
        console.log(err);
      });
  },
  /*
   * Prints all GCP Project Assets and returns a count of the the number
   * found.
   */
  listWithFilters: function listAllAssets(organization_id) {
    // [START demo_list_assets_with_filter]
    // Imports the Google Cloud client library.
    const sc = require('@google-cloud/security-center');

    // Creates a new client.
    const client = new sc.SecurityCenterClient();
    //  organization_id is the numeric ID of the organization.
    /*
     * TODO(developer): Uncomment the following lines
     */
    // organization_id = "1234567777"
    const orgName = client.organizationPath(organization_id);
    const options = {autoPaginate: false};

    // Define a call back that returns the final count of assets returned.
    // This callback manually controls pagination by constructing and making
    // follow-up calls to the API.
    function callback(count) {
      return responses => {
        // A page of results from the list query.
        const listAssetResults = responses[0];
        // The next request if the response shows that there are more responses.
        const nextRequest = responses[1];
        for (let x = 0; x < listAssetResults.length; x += 1) {
          count += 1;
          const asset = listAssetResults[x].asset;
          console.log(
            count +
              ' ' +
              asset.name +
              ' ' +
              asset.securityCenterProperties.resourceName
          );
        }
        if (nextRequest) {
          // Fetch the next page.
          return client.listAssets(nextRequest, options).then(callback(count));
        }
        return count;
      };
    }

    const projectFilter =
      'security_center_properties.resource_type=\
                     "google.cloud.resourcemanager.Project"';
    // Call the service.
    return client
      .listAssets({parent: orgName, filter: projectFilter})
      .then(callback(0))
      .catch(err => {
        console.log(err);
      });
    // [END demo_list_assets_with_filter]
  },
  /*
   * Prints all GCP project assets as of 1 day ago and returns a count of
   * assets.
   */
  listAssetsWithFilterAndReadTime: function(organization_id) {
    // [START demo_list_with_filter_and_readtime]
    // Imports the Google Cloud client library.
    const sc = require('@google-cloud/security-center');

    // Creates a new client.
    const client = new sc.SecurityCenterClient();

    // organization_id is the numeric ID of the organization.
    /*
     * TODO(developer): Uncomment the following lines
     */
    // organization_id = "1234567777"
    const orgName = client.organizationPath(organization_id);
    const projectFilter =
      'security_center_properties.resource_type=\
                     "google.cloud.resourcemanager.Project"';

    // Call the API and automatically collect the pages.
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    // Convert the Date to a format compatible with google.protobuf.Timestamp
    const ts = {
      seconds: Math.floor(oneDayAgo.getTime() / 1000),
      nanos: (oneDayAgo.getTime() % 1000) * 1e6,
    };
    return client
      .listAssets({parent: orgName, filter: projectFilter, readTime: ts})
      .then(responses => {
        // A page of results from the list query.
        const listAssetResults = responses[0];

        // The next request if the response shows that there are more
        // responses.
        for (let x = 0; x < listAssetResults.length; x += 1) {
          const asset = listAssetResults[x].asset;
          console.log(
            x +
              1 +
              ' ' +
              asset.name +
              ' ' +
              asset.securityCenterProperties.resourceName
          );
        }
        return listAssetResults.length;
      })
      .catch(err => {
        console.log(err);
      });
    // [END demo_list_with_filter_and_readtime]
  },
  /*
   * Demonstrates listing current assets and there state change compared
   * to 30 days ago.
   */
  listAssetsAndStateChanges: function(organization_id) {
    // [START demo_list_with_changes]
    // Imports the Google Cloud client library.
    const sc = require('@google-cloud/security-center');
    // Creates a new client.
    const client = new sc.SecurityCenterClient();
    //  organization_id is the numeric ID of the organization.
    /*
     * TODO(developer): Uncomment the following lines
     */
    // organization_id = 1234567777
    const orgName = client.organizationPath(organization_id);
    const projectFilter =
      'security_center_properties.resource_type=\
                     "google.cloud.resourcemanager.Project"';

    // Call the API and automatically collect the pages.
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 30);
    // Initialize a timestamp object with oneDayAgo
    return client
      .listAssets({
        parent: orgName,
        filter: projectFilter,
        compareDuration: {seconds: 30 * /*Second in Day=*/ 86400, nanos: 0},
      })
      .then(responses => {
        // A page of results from the list query.
        const listAssetResults = responses[0];
        // The next request if the response shows that there are more
        // responses.
        for (let x = 0; x < listAssetResults.length; x += 1) {
          const asset = listAssetResults[x].asset;
          const asset_num = x + 1;
          console.log(
            asset_num +
              ' ' +
              asset.name +
              ' ' +
              asset.securityCenterProperties.resourceName +
              ' ' +
              listAssetResults[x].stateChange
          );
        }
        return listAssetResults.length;
      })
      .catch(err => {
        console.log(err);
      });
    // [END demo_list_with_changes]
  },
};
