const axios = require('axios');
require('dotenv').config();



async function postMessage(message) {
          //console.log(process.env);
          await axios.post(process.env.SLACK_HOOK, {
                    text: message
          });
}



module.exports = { postMessage };


