const allowedOrigin = require("./allowedOrigin");

// check
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigin.indexOf(origin) !== -1 || !origin)
      return callback(null, true);
    else callback(new Error("CAN NOT ACCESS TO SERVER"));
  },

  optionsSuccessStatus: 200, //def 204
};

module.exports = corsOptions;
