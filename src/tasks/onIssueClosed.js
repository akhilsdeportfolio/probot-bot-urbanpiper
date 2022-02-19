const { createComment, closedComment } = require("../utils/commentsHelper");

let onIssueClosed = async (context) => {
          //this is triggered when ever issue is close;
          closedComment(context);
}

module.exports = onIssueClosed;