// const core = require("@actions/core");
const exec = require("@actions/exec");
// const cache = require("@actions/cache");
// const github = require("@actions/github");

async function run() {
  let output = "";
  let error = "";

  const options = {};
  options.listeners = {
    stdout: data => {
      output += data.toString();
    },
    stderr: data => {
      error += data.toString();
    },
  };

  await exec.exec("uname", options);

  // eslint-disable-next-line no-console
  console.log(output);
  // eslint-disable-next-line no-console
  console.log(error);

  await exec.exec("node", ["index.js", "foo=bar"], options);
  // const cacheKey = await cache.restoreCache(
  //   ["node_modules"],
  //   primaryKey,
  //   restoreKeys
  // );
}

run();
