const { ProbotOctokit } = require("probot");
const createScheduler = require('probot-scheduler-pro');
const routineTask = require("./src/tasks/routineTasks");
const onIssueOpened = require("./src/tasks/onIssueOpened");
const onIssueClosed = require("./src/tasks/onIssueClosed");
const { isMemeber } = require("./src/utils/teamsHelper");
const { getFutureDate, isTimeOut } = require("./src/utils/momentHelper");





let date = new Date();

console.log("FUTURE DATE ", getFutureDate(date, 3));
console.log("IS TIME OUT ", isTimeOut(date, 1));


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
    interval: 1000
  });
  app.on('schedule.repository', routineTask);
  app.on("issues.opened", onIssueOpened);
  app.on("issues.closed", onIssueClosed);
};


