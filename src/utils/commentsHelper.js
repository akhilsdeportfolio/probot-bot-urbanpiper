const { getFutureDate, getFormattedDate, getFutureDateUF } = require("./momentHelper");

const moment = require('moment');
const metadata = require("probot-metadata");

async function createComment(context, message, number) {
          let owner = context.payload.repository.owner.login;
          let repo = context.payload.repository.name;
          await context.octokit.issues.createComment({
                    owner,
                    repo,
                    issue_number: number,
                    body: message
          });

}
async function welcomeComment(context, message) {
          const issueComment = context.issue({
                    body: message
          });
          await context.octokit.issues.createComment(issueComment);
}


async function closedComment(context)
{
          const issueComment = context.issue({
                    body: "Issue has been closed."
          });
          await context.octokit.issues.createComment(issueComment);

}

async function addResolutionDateComment(context) {




          const resolutionComment = context.issue({
                    body: "Resolution Date - " + getFutureDate(getFormattedDate(moment.utc(context.payload.issue.created_at).format("DD-MM-YYYY")), 3)
          });

          await context.octokit.issues.createComment(resolutionComment);

          await metadata(context).set({ "resolutionDate": getFutureDateUF(moment.utc(context.payload.issue.created_at), 3) });

}
module.exports = { createComment, welcomeComment, addResolutionDateComment,closedComment };         