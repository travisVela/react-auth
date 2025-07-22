import { format } from "date-fns";
import { v4 as uuid } from "uuid";

import fs from "fs";
import path from "path";

export const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyy/MMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  // console.log(logItem);

  try {
    // test
    if (!fs.existsSync(path.join(import.meta.dirname, "..", "logs"))) {
      await fs.promises.mkdir(path.join(import.meta.dirname, "..", "logs"));
    }
    await fs.promises.appendFile(
      path.join(import.meta.dirname, "..", "logs", logName),
      logItem
    );
  } catch (error) {
    console.error(error);
  }
};

export const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  // console.log(`${req.method} ${req.path}`);
  next();
};
