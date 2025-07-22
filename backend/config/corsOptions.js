import allowedOrigins from "./allowdOrigns.js";
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowd by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
