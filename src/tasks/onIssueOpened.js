const { welcomeComment } = require("../utils/commentsHelper");


let onIssueOpened=async (context) => {
          console.log(context.payload.repository.owner);
          let team = context.payload.repository.owner.login;
          return welcomeComment(context, ` Thanks for creating the issue, someone from @${team} will be soon assigned to take a look at it.`);
}

module.exports=onIssueOpened;