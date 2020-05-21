const core = require("@actions/core");
const cache = require("@actions/cache");

async function run() {
  const cacheKey = core.getState("NPM_CACHE_RESULT");
  const primaryKey = core.getState("NPM_CACHE_KEY");

  if (cacheKey === primaryKey) {
    core.info(
      `Cache hit occurred on the primary key ${primaryKey}, not saving cache.`
    );
    return;
  }

  const cachePaths = ["node_modules"];

  await cache.saveCache(cachePaths, primaryKey);
}

run();
