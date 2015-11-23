var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var PornSiteSchema = new Schema ({
  site: String
})

module.exports = mongoose.model("PornSite", PornSiteSchema);
