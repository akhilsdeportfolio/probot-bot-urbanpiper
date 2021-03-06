const { createComment, closedComment } = require("../utils/commentsHelper");
const { postMessage } = require('../utils/slackHelper');
let onIssueClosed = async (context) => {
          //this is triggered when ever issue is close;
          closedComment(context);
          console.log(context.issue);
          postMessage(`Issue #${context.payload.issue.number} from the [${context.payload.repository.name}] repo has been closed by @${context.payload.sender.login}.\n ${context.payload.issue.html_url}`);
}

module.exports = onIssueClosed;