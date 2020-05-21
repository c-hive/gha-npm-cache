const core = require("@actions/core");
const exec = require("@actions/exec");
const md5File = require("md5-file");
const cache = require("@actions/cache");

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
  const primaryKey = `${os.trim()}-npm-cache-${hash}`;
  const restoreKeys = [`${os.trim()}-npm-cache-`];
  core.saveState("CACHE_KEY", primaryKey);

  const cacheKey = await cache.restoreCache(
    cachePaths,
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

  core.saveState("CACHE_RESULT", cacheKey);
  const isExactKeyMatch = primaryKey === cacheKey;
  core.setOutput("cache-hit", isExactKeyMatch.toString());

  core.info(`Cache restored from key: ${cacheKey}`);
}

run();
