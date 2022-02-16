const { ProbotOctokit, Probot } = require("probot");
const { welcomeComment } = require("../utils/commentsHelper");
const axios = require('axios');

let onIssueOpened = async (context) => {
          //this is triggered when ever issue is created;
          let team = context.payload.repository.owner.login;
          let teams_url = context.payload.repository.teams_url;
          return welcomeComment(context, ` Thanks for creating the issue, someone from @${team} will be soon assigned to take a look at it.`);
}

module.exports = onIssueOpened;