const core = require('@actions/core');
const countapi = require('countapi-js');

const namespace = core.getInput('namespace');
const key = core.getInput('key');

countapi.hit(namespace, key).then((result) => {
  core.setOutput("value", result.value);
}).catch((error) => {
  core.setFailed(error.message);
});