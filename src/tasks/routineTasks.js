const { dateDiffInDays, dateDiffInHours } = require('../utils/datesHelper');
const { addLabel } = require('../utils/labelHelper');
const { createComment, welcomeComment } = require('../utils/commentsHelper');
const { Octokit } = require('octokit');
const { default: axios } = require('axios');
const { isBug, isSupport, isServiceRequest, isNoLabels, isResolved, isAcknowledged, hasResolutionComment } = require('../utils/issueHelper');
require('dotenv').config();
const moment = require('moment');
const { postMessage } = require('../utils/slackHelper');
const { getTeam } = require('../utils/teamsHelper');

let routineTask = async (context) => {
   //this is a routine task that will be triggered according to the configured scheduler
   //get all issues for a repo and dosomething accordingly
   // get only open issues			 
   try {
      let issues = await context.octokit.issues.listForRepo({
         owner: context.payload.repository.owner.login, repo: context.payload.repository.name, state: "open", per_page: 100
      });
      //   console.log("TOTAL ISSUES FOUND FOR " + context.payload.repository.name, issues.data.length);
      //incase we have some issues
      if (issues.data.length > 0) {
         issues.data.forEach(async issue => {
            //we have some issues for repo now check for labels
            //issues might have lables (bug,support,service-request)
            let labels = issue.labels;
            let mLabels = labels.map((label) => label.name);
            if (mLabels.length > 0) {

               //console.log("Support", isSupport(mLabels));
               if (isBug(mLabels) || isSupport(mLabels)) {
                  //console.log("BUG",issue.created_at);
                  //get the created date and check the time passsed
                  let diffInDays = dateDiffInDays(new Date(issue.created_at), new Date());
                  let diffInHours = dateDiffInHours(new Date(issue.created_at));
                  diffInHours = +diffInHours.split(":")[0].split("").slice(1).join("");
                  //console.log("time after creating the issue ", diffInHours);
                  //  console.log("Diff", diffInDays);
                  if (diffInHours >= 24 && diffInHours <= 72) {
                     //console.log("24 - 48","check if acknowledged")
                     console.log(issue.number, await isAcknowledged(issue, context));
                     if (! await isAcknowledged(issue, context)) {
                        console.log("Issue is not acknowledged", issue.number);
                        await addLabel(context, issue.number, ['sla-v-1']);
                        await postMessage(`please assign someone from ${getTeam(context.payload.repository.name)} to the issue #${issue.number}. \n  ${issue.html_url}`);
                     }
                  }
                  else if (diffInDays > 3) {
                     //check for resolution date in the comments       

                     let comm = await hasResolutionComment(issue, context);
                     //console.log(comm);
                     if (comm.status) {
                        //has resolution date comment check if the issue is resolved as per mentioned date //if resolved donothing else add sla-v-3
                        resolutionDateAction(comm, context, issue)
                     }
                     else {
                        //doesnt have resolution date add
                        addLabel(context, issue.number, ['sla-v-2']);
                        postMessage(`please add a resolution date to the issue # ${issue.number} of repo [${context.payload.repository.name}]. \n  ${issue.html_url}`);
                     }

                     /*   */
                  }
               }
               else if (isServiceRequest(mLabels)) {

                  //   console.log("Service req");
                  let diffInDays = dateDiffInDays(new Date(issue.created_at), new Date());

                  if (diffInDays > 0 && diffInDays < 2) {
                     // it been a day
                     if (!isAcknowledged(issue, context)) {

                        addLabel(context, issue.number, ['sla-v-1']);
                     }

                  }
                  else if (diffInDays > 3) {
                     console.log(isResolved(issue));
                     if (!isResolved(issue)) {
                        addLabel(context, issue.number, ['sla-v-2'])
                     }
                  }
               }
            }
            else {
               //this is an unlablled issue act accordingly by alerting on slack.
               //post a slack message by tagging the respective team;
               //console.log(context);
               await postMessage(`Please add label to issue #${issue.number} of Repo:[${context.payload.repository.name}]. \n  ${issue.html_url}`);

            }
         });
      }
   }
   catch (err) {
      console.log(err);
   };
}


async function resolutionDateAction(comm, context, issue) {
   const resolutionDate = comm.date.split("-")[1].trim();
   let temp = resolutionDate.split("/");
   //console.log("Resolution Date", comm.date.split("-")[1].trim());;
   //console.log("Diff in hours res", dateDiffInHours(new Date(+temp[2], +temp[1] - 1, +temp[0])));
   //find the diff between dates and if > 0 add sla-v-3
   let diff = dateDiffInHours(new Date(+temp[2], +temp[1] - 1, +temp[0]))
   if (diff < 0) {

      if (!isResolved(issue)) {
         await addLabel(context, issue.number, ['sla-v-3']);
         await postMessage(`Please fix #${issue.number} of Repo [${context.payload.repository.name}] on prioroty.\n ${issue.html_url}`);
      }
      //addLabel(context, issue.number, ['sla-v-3']);
   }
}
module.exports = routineTask;