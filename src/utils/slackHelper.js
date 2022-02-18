const axios = require('axios');

async function postMessage(message) {
          await axios.post("https://hooks.slack.com/services/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", {
                    text: message
          });
}



module.exports = { postMessage };


