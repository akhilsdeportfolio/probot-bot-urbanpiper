const { getFutureDate, getFormattedDate } = require("./momentHelper");

const moment=require('moment');

async function createComment(context, message, number) {
          let owner = context.payload.repository.owner.login;
          let repo = context.payload.repository.name;
          await context.octokit.issues.createComment({
                    owner,
                    repo,
                    issue_number:number,
                    body: message
          });

}
async function welcomeComment(context, message) {
          const issueComment = context.issue({
                    body:message
          });
          await context.octokit.issues.createComment(issueComment);
}

async function addResolutionDateComment(context)
{         


          console.log("Payload",moment(context.payload.issue.created_at,"DD-MM-YYYY").toDate());

          const resolutionComment = context.issue({
                    body:"Resolution Date - "+getFutureDate(getFormattedDate(moment.utc('2022-02-16T09:06:16Z').format("DD-MM-YYYY")),3)
          });
          await context.octokit.issues.createComment(resolutionComment);
          


}
module.exports = { createComment, welcomeComment,addResolutionDateComment};         