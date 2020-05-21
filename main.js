const core = require("@actions/core");
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

  // eslint-disable-next-line no-console
  console.log(os);
  // eslint-disable-next-line no-console
  console.log(hash);

  const primaryKey = `${os}-npm-cache-${hash}`;
  const restoreKeys = [`${os}-npm-cache-`];

  const cacheKey = await cache.restoreCache(
    ["node_modules"],
    primaryKey,
    restoreKeys
  );

  if (!cacheKey) {
    core.info(
      `Cache not found for input keys: ${[primaryKey, ...restoreKeys].join(
        ", "
      )}`
    );
  }
}

run();
