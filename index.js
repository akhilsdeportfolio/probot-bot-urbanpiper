const { ProbotOctokit } = require("probot");
const createScheduler = require('probot-scheduler-pro');
const routineTask = require("./src/tasks/routineTasks");
const onIssueOpened = require("./src/tasks/onIssueOpened");
const onIssueClosed = require("./src/tasks/onIssueClosed");
const { isMemeber } = require("./src/utils/teamsHelper");
const { getFutureDate, isTimeOut } = require("./src/utils/momentHelper");

module.exports = (app) => {
  const octokit = new ProbotOctokit({
    auth: {
      token: process.env.TOKEN,
    },
    log: app.log.child({ name: "Urbanpiper-bot" }),
  });
  createScheduler(app, {
    name: 'daily',
    delay: !!process.env.DISABLE_DELAY,
    interval: 10*1000
  });
  app.on('schedule.repository', routineTask);
  app.on("issues.opened", onIssueOpened);
  app.on("issues.closed", onIssueClosed);
};


