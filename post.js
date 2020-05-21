// const core = require("@actions/core");
const exec = require("@actions/exec");
const md5File = require("md5-file");
const cache = require("@actions/cache");
// const github = require("@actions/github");

async function run() {
  let os = "";

  const options = {};
  options.listeners = {
    stdout: data => {
      os += data.toString();
    },
  };

  await exec.exec("uname", [], options);
  const hash = md5File.sync("package-lock.json");

  const cachePaths = ["node_modules"];
  const primaryKey = `${os}-npm-cache-${hash}`;

  await cache.saveCache(cachePaths, primaryKey);
}

run();
