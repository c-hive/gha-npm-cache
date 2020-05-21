const core = require("@actions/core");
const cache = require("@actions/cache");

async function run() {
  const cacheKey = core.getState("NPM_CACHE_RESULT");
  const primaryKey = core.getState("NPM_CACHE_KEY");
  const cachePath = core.getState("NPM_CACHE_PATH");

  if (cacheKey === primaryKey) {
    core.info(
      `Cache hit occurred on the primary key ${primaryKey}, not saving cache.`
    );
    return;
  }

  await cache.saveCache([cachePath], primaryKey);
}

run().catch(err => {
  core.setFailed(err.toString());
});
