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

// Note: this file is purely for documentation. Any contents are not expected
// to be loaded as the JS file.

/**
 * Cloud Security Command Center's (Cloud SCC) finding source. A finding source
 * is an entity or a mechanism that can produce a finding. A source is like a
 * container of findings that come from the same scanner, logger, monitor, etc.
 *
 * @property {string} name
 *   The relative resource name of this source. See:
 *   https://cloud.google.com/apis/design/resource_names#relative_resource_name
 *   Example:
 *   "organizations/123/sources/456"
 *
 * @property {string} displayName
 *   The source’s display name.
 *   A source’s display name must be unique amongst its siblings, for example,
 *   two sources with the same parent can't share the same display name.
 *   The display name must start and end with a letter or digit, may contain
 *   letters, digits, spaces, hyphens, and underscores, and can be no longer
 *   than 32 characters. This is captured by the regular expression:
 *   [\p{L}\p{N}](https://cloud.google.com{\p{L}\p{N}_- ]{0,30}[\p{L}\p{N}])?.
 *
 * @property {string} description
 *   The description of the source (max of 1024 characters).
 *   Example:
 *   "Cloud Security Scanner is a web security scanner for common
 *   vulnerabilities in App Engine applications. It can automatically
 *   scan and detect four common vulnerabilities, including cross-site-scripting
 *   (XSS), Flash injection, mixed content (HTTP in HTTPS), and
 *   outdated/insecure libraries."
 *
 * @typedef Source
 * @memberof google.cloud.securitycenter.v1
 * @see [google.cloud.securitycenter.v1.Source definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/securitycenter/v1/source.proto}
 */
const Source = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};