const { ProbotOctokit, Probot } = require("probot");
const { welcomeComment, addResolutionDateComment } = require("../utils/commentsHelper");
const axios = require('axios');
const metaData = require('probot-metadata');
const { isMemeber, getTeam } = require("../utils/teamsHelper");
const { postMessage } = require('../utils/slackHelper');

let onIssueOpened = async (context) => {
          //this is triggered when ever issue is created;

          let repo = context.payload.repository.name;
          let team = getTeam(repo);
          // find the corresponding team based on repo using teamsHelper 
          console.log("Repo \t:", repo, "Team \t:", team);


          postMessage(`New issue #${context.payload.issue.number} from the [${context.payload.repository.name}] repo has been created, please assign some from ${team}. \n ${context.payload.issue.html_url}`);

          await welcomeComment(context, ` Thanks for creating the issue, someone from @${team} will be soon assigned to take a look at it. `);
}

module.exports = onIssueOpened;