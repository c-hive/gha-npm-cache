const core = require("@actions/core");
const exec = require("@actions/exec");
const md5File = require("md5-file");
const cache = require("@actions/cache");

async function uname() {
  let output = "";
  const options = {};
  options.listeners = {
    stdout: data => {
      output += data.toString();
    },
  };
  await exec.exec("uname", [], options);

  return output.trim();
}

async function npmCache() {
  let output = "";
  const options = {};
  options.listeners = {
    stdout: data => {
      output += data.toString();
    },
  };
  await exec.exec("npm config get cache", [], options);

  return output.trim();
}

async function run() {
  const os = uname();
  const cachePath = npmCache();
  core.saveState("NPM_CACHE_PATH", cachePath);

  const hash = md5File.sync("package-lock.json");

  const primaryKey = `${os.trim()}-npm-cache-${hash}`;
  const restoreKeys = [`${os.trim()}-npm-cache-`];
  core.saveState("NPM_CACHE_KEY", primaryKey);

  const cacheKey = await cache.restoreCache(
    [cachePath],
    primaryKey,
    restoreKeys
  );

  if (!cacheKey) {
    core.info(
      `Cache not found for input keys: ${[primaryKey, ...restoreKeys].join(
        ", "
      )}`
    );
    return;
  }

  core.saveState("NPM_CACHE_RESULT", cacheKey);
  const isExactKeyMatch = primaryKey === cacheKey;
  core.setOutput("cache-hit", isExactKeyMatch.toString());

  core.info(`Cache restored from key: ${cacheKey}`);
}

run();
