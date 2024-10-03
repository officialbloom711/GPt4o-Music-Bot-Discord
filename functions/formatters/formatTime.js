/** @format
 *
 * GPT 4o By mahaaranii
 * Version: 6.0.0-beta
 * © 2024 NextGen Coders
 */

module.exports = (duration) => {
  var moment = require("moment");
  require("moment-duration-format");
  return moment
    .duration(duration, "milliseconds")
    .format("d[d] h[h] m[m] s[s]", {
      trim: true,
    });
};
