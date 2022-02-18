const { dateDiffInDays, dateDiffInHours } = require('../utils/datesHelper');
const { addLabel } = require('../utils/labelHelper');
const { createComment, welcomeComment } = require('../utils/commentsHelper');
const { Octokit } = require('octokit');
const { default: axios } = require('axios');
const { isBug, isSupport, isServiceRequest, isNoLabels, isResolved, isAcknowledged, hasResolutionComment } = require('../utils/issueHelper');
require('dotenv').config();
const moment = require('moment');
const { postMessage } = require('../utils/slackHelper');


let routineTask = async (context) => {
          //this is a routine task that will be triggered according to the configured scheduler
          //get all issues for a repo and dosomething accordingly


          // get only open issues			 
          try {
                    let issues = await context.octokit.issues.listForRepo({
                              owner: context.payload.repository.owner.login, repo: context.payload.repository.name, state: "open", per_page: 100
                    });
                    console.log("TOTAL ISSUES FOUND FOR " + context.payload.repository.name, issues);
                    //incase we have some issues
                    if (issues.data.length > 0) {
                              issues.data.forEach(async issue => {
                                        //we have some issues for repo now check for labels
                                        //issues might have lables (bug,support,service-request)
                                        let labels = issue.labels;
                                        let mLabels = labels.map((label) => label.name);
                                        if (mLabels.length > 0) {
                                                  if (isBug(mLabels) || isSupport(mLabels)) {
                                                            //console.log("BUG",issue.created_at);
                                                            //get the created date and check the time passsed
                                                            let diffInDays = dateDiffInDays(new Date(issue.created_at), new Date());

                                                            let diffInHours = dateDiffInHours(new Date(issue.created_at));
                                                            console.log(+diffInHours.split(":")[0].split("").slice(1).join(""));

                                                            console.log("Diff", diffInDays);

                                                            if (diffInDays === 0) {
                                                                      //issue is created today only.
                                                                      let comm = await hasResolutionComment(issue, context);
                                                                      //console.log(comm);
                                                                      if (comm.status) {
                                                                                //has resolution date comment check if the issue is resolved as per mentioned date //if resolved donothing else add sla-v-3
                                                                                console.log("Resolution Date", comm.date.split("-")[1].trim());;
                                                                                //find the diff between dates and if > 0 add sla-v-3
                                                                      }
                                                                      else {
                                                                                //doesnt have resolution date add
                                                                                addLabel(context, issue.number, ['sla-v-2']);

                                                                      }


                                                            }
                                                            else if (diffInDays >= 1 && diffInDays <= 3) {
                                                                      //console.log("24 - 48","check if acknowledged")



                                                                      if (isAcknowledged(issue, context)) {
                                                                                console.log("ISSUE HAS BEEN ACKNOWLEDGED ON TIME");


                                                                      }
                                                                      else {
                                                                                addLabel(context, issue.number, ['sla-v-1']);

                                                                      }



                                                                      //check if comment is there or not


                                                            }
                                                            else if (diffInDays > 3) {
                                                                      //check for resolution date in the comments                                                                      
                                                                      if (isResolved(issue)) {

                                                                      }
                                                                      else {
                                                                                addLabel(context, issue.number, ['sla-v-3'])

                                                                                postMessage("Please fix it on prioroty @issues-prime");
                                                                      }



                                                            }



                                                  }
                                                  else if (isServiceRequest(mLabels)) {

                                                            console.log("Service req");
                                                            let diffInDays = dateDiffInDays(new Date(issue.created_at), new Date());

                                                            if (diffInDays > 0 && diffInDays < 2) {
                                                                      // it been a day
                                                                      if (isAcknowledged(issue, context)) {

                                                                      }
                                                                      else {
                                                                                addLabel(context, issue.number, ['sla-v-1']);
                                                                      }
                                                            }
                                                            else if (diffInDays > 3) {
                                                                      console.log(isResolved(issue));
                                                                      if (isResolved(issue)) {

                                                                      }
                                                                      else {
                                                                                addLabel(context, issue.number, ['sla-v-2'])
                                                                      }


                                                            }



                                                  }
                                                  if (isNoLabels(mLabels)) {
                                                            console.log("No labels", issue);

                                                            //alert in the slack channel
                                                  }


                                        }
                                        else {
                                                  //this is an unlablled issue act accordingly by alerting on slack.
                                        }

                              });

                    }
                    else {
                              //we dont have any issues for the repo...do nothing
                    }
          }
          catch (err) {
                    console.log(err);
          };


}
module.exports = routineTask;