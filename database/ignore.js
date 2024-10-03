/** @format
 *
 * GPT 4o By mahaaranii
 * Version: 6.0.0-beta
 * © 2024 NextGen Coders
 */

const JOSH = require("@joshdb/core");
const JSON = require("@joshdb/json");

module.exports = new JOSH({
  name: "ignore",
  provider: JSON,
  providerOptions: {
    cleanupEmpty: true,
    dataDir: "./josh-data/ignore",
  },
});
