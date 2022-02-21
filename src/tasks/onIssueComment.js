const { postMessage } = require('../utils/slackHelper');

let onIssueComment = async (context) => {
          //console.log(context.payload);
          let action = context.payload.action;
          let comment = context.payload.comment;
          let user = context.payload.comment.user;
          switch (action) {
                    case 'created':
                              postMessage(`@${user.login} has commented on issue ${comment.html_url} \n #${comment.body}`);
                              break;
                    case 'edited':
                              postMessage(`@${user.login} has edited the comment on issue ${comment.html_url} \n #${comment.body}`);
                              break;
                    case 'deleted':
                              postMessage(`@${user.login} has deleted the comment on issue ${comment.html_url} \n #${comment.body}`);
                              break;
          }


}


module.exports = onIssueComment;