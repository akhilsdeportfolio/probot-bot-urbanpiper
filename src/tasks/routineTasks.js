const dateDiffInDays = require('../utils/date');
const addStaleLabel = require('../utils/labelHelper');
const { createComment, welcomeComment } = require('../utils/commentsHelper');

let routineTask = async (context) => {

          //this is a routine task that will be triggered according to the configured scheduler
          context.octokit.issues.listForRepo({ owner: context.payload.repository.owner.login, repo: context.payload.repository.name }).then((issue) => {
                    let data = issue.data;
                    data.forEach(async (obj) => {
                              let labels = obj.labels;
                              labels = labels.map((label) => {
                                        return label.name;
                              });
                              //team is the owner of the repo
                              let team = context.payload.repository.owner.login;
                              if (obj.assignee === null && (labels.includes('bug') || labels.includes('support'))) {
                                        if ((dateDiffInDays(new Date(obj.created_at), new Date()) === 0) || (dateDiffInDays(new Date(obj.created_at), new Date()) === 1)) {
                                                  createComment(context, `@${team}\t please give an update on this issue.`, obj.number);
                                        }
                                        else if ((dateDiffInDays(new Date(obj.created_at), new Date()) > 1 && dateDiffInDays(new Date(obj.created_at), new Date()) < 7)) {
                                                  createComment(context, `@${team}\t please assign someone to the issue.`, obj.number);
                                        } else if (dateDiffInDays(new Date(obj.created_at), new Date()) !== 0 && (dateDiffInDays(new Date(obj.created_at), new Date()) % 7 === 0)) {
                                                  createComment(context, `@${team} \t There has been no activity on this issue for a while. Please give an update about this issue`, obj.number);
                                        }
                                        ///if the issue is not assigned even after 15 days add label stale
                                        if (dateDiffInDays(new Date(obj.created_at), new Date()) >= 15) {
                                                  addStaleLabel(context, obj.number);
                                        }
                              }
                              else if (obj.assignee !== null && (labels.includes('bug') || labels.includes('support'))) {
                                        //issue has assignees
                                        let message = `@${obj.assignee.login} please resolve this issue as soon as possible`;
                                        createComment(context, message, obj.number);
                              }
                    });
          }).catch((err) => {
                    context.log.info(err);
          });

}
module.exports = routineTask;