// clean out folder
const fs = require('fs-extra');
fs.removeSync("./out");

// run all builders
require("./builders");

// if in dev environment, run express
if (process.env.NODE_ENV === "development") {
  const exec = require('child_process').exec;
  exec('yarn copy-data-2-fe');

  const express = require('express');
  const app = express();
  const port = 9090;
  app.use(express.static('out', { setHeaders: (res) => res.setHeader("Access-Control-Allow-Origin", "*") }));
  app.listen(port, () => console.log(`Backend listening on port ${port}!`));
}
