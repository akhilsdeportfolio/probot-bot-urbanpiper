const { ProbotOctokit } = require("probot");
const createScheduler = require('probot-scheduler-pro');
const dateDiffInDays = require('./src/utils/date');
const { createComment, welcomeComment } = require('./src/utils/commentsHelper');
const addStaleLabel = require("./src/utils/labelHelper");
module.exports = (app) => {
  const octokit = new ProbotOctokit({
    auth: {
      token: process.env.TOKEN,
    },
    log: app.log.child({ name: "my-octokit" }),
  });
  createScheduler(app, {
    name: 'daily',
    delay: !!process.env.DISABLE_DELAY,
    interval: 1000
  });
  app.on('schedule.repository', async (context) => {
    context.octokit.issues.listForRepo({ owner: context.payload.repository.owner.login, repo: context.payload.repository.name }).then((issue) => {
      let data = issue.data;
      data.forEach(async (obj) => {
        let labels = obj.labels;
        labels = labels.map((label) => {
          return label.name;
        });
        //getting teams and picking the first team as default.
        //let teams = await octokit.orgs.listForAuthenticatedUser({ per_page: 10, page: 1 });
        let team = context.payload.repository.owner.login;
        if (obj.assignee === null && (labels.includes('bug') || labels.includes('support'))) {          
          if ((dateDiffInDays(new Date(obj.created_at), new Date()) === 1)) {
            createComment(context, `@${team}\t please give an update on this issue.`, obj.number);
          }
          else if ((dateDiffInDays(new Date(obj.created_at), new Date()) > 1 && dateDiffInDays(new Date(obj.created_at), new Date()) < 7)) {
            createComment(context, `@${team}\t please assign someone to the issue.`, obj.number);
          } else if (dateDiffInDays(new Date(obj.created_at), new Date()) !== 0 && (dateDiffInDays(new Date(obj.created_at), new Date()) % 7 === 0)) {
            createComment(context, `@${team} \t There has been no activity on this issue for a while. Please give an update about this issue`, obj.number);
          }
          ///if the issue is not assigned even after 15 days add label stale
          if(dateDiffInDays(new Date(obj.created_at), new Date())>=2)
          {
                addStaleLabel(context,obj.number);
          }
        }
        else
        {
              //issue has assignees
              let message=`@${obj.assignee.login} please resolve this issue as soon as possible`;
              createComment(context,message,obj.number);            
        }
      });
    }).catch((err) => {
      context.log.info(err);
    });

  });
  app.on("issues.opened", async (context) => {
    let teams = await octokit.orgs.listForAuthenticatedUser({ per_page: 10, page: 1 });
    let team = teams.data[0].login;
    return welcomeComment(context, ` Thanks for creating the issue, someone from ${team} will be soon assigned to take a look at it.`);
  });
  app.on("issues.closed", async (context) => {
    console.log("issue has been closed",context.issue);

  });
};



