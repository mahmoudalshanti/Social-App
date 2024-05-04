const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const printsEvents = async (msg, fileName) => {
  const dateTime = `${format(new Date(), "yyyyMMMdd\tHH:mm:ss")}`;
  const printItem = `${dateTime}\t ${uuid()}\t ${msg}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "printFiles"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "printFiles"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "printFiles", fileName),
      printItem
    );
  } catch (err) {
    console.log(err);
  }
};

const accessServer = (req, res, next) => {
  printsEvents(
    `${req.method}\t ${req.url}\t ${req.headers.origin}`,
    "accessServer.log"
  );

  next();
};

const errorServer = (err, req, res, next) => {
  printsEvents(
    `${err.name}\t ${err.message}\t ${req.method}\t ${req.url}\t  ${req.headers.origin}`,
    "errorServer.log"
  );

  console.log(err.name, err.message);

  const status = res.statusCode ? res.statusCode : 500;

  res.status(status).json({ message: err.message });
};

module.exports = { accessServer, errorServer, printsEvents };
