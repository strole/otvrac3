const mongoose = require("mongoose");

var boatSchema = mongoose.Schema(
  {
    base: {
      name: String,
      number: Number,
    },
    beam: String,
    berths: Number,
    cabins: Number,
    length: String,
    model: String,
    name: String,
    skipper: {
      licence: String,
      name: String,
      surname: String,
    },
    type: String,
    wc: Number,
    year: Number,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Boat", boatSchema);
