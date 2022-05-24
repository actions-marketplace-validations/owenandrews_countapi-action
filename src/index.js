const core = require('@actions/core');
const countapi = require('countapi-js');

const method = core.getInput('method');
const namespace = core.getInput('namespace');
const key = core.getInput('key');

switch (method) {
  case 'get':
    countapi.get(namespace, key).then((result) => {
      setOutput("result", result);
    }).catch((error) => {
      setFailed(error);
    });
    break;
  case 'set':
    countapi.set(namespace, key, core.getInput('value')).then((result) => {
      setOutput("result", result);
    }).catch((error) => {
      setFailed(error);
    });
    break;
  case 'update':
    countapi.update(namespace, key, core.getInput('amount')).then((result) => {
      setOutput("result", result);
    }).catch((error) => {
      setFailed(error);
    });
    break;
  case 'hit':
    countapi.hit(namespace, key).then((result) => {
      setOutput("result", result);
    }).catch((error) => {
      console.log(error)
      setFailed(error);
    });
    break;
  case 'create':
    countapi.create({ namespace, key, value: core.getInput('input'), enable_reset: core.getBooleanInput('enable_reset'), update_lowerbound: core.getInput('update_lowerbound'), update_upperbound: core.getInput('update_upperbound') }).then((result) => {
      setOutput("result", result);
    }).catch((error) => {
      setFailed(error);
    });
    break;
  case 'info':
    countapi.update(namespace, key).then((result) => {
      setOutput("result", result);
    }).catch((error) => {
      setFailed(error);
    });
    break;
  case 'stats':
    countapi.update().then((result) => {
      setOutput("result", result);
    }).catch((error) => {
      setFailed(error);
    });
    break;
  default:
    setFailed(`Unknown method \`${method}\``);
}

function setFailed(message) {
  core.setFailed(message);
}

function setOutput(name, value) {
  core.info(JSON.stringify(value));
  core.setOutput(name, value);
}