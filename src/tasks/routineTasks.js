const {dateDiffInDays, dateDiffInHours} = require('../utils/datesHelper');
const {addStaleLabel} = require('../utils/labelHelper');
const { createComment, welcomeComment } = require('../utils/commentsHelper');
const metadata = require('probot-metadata');
const { Octokit } = require('octokit');
const { default: axios } = require('axios');
require('dotenv').config()

//reference variable for octokit.rest sdk  ...in probot its simillar to  context.octokit
let octokit=new Octokit({

});


let routineTask = async (context) => {

          //this is a routine task that will be triggered according to the configured scheduler
          

}
module.exports = routineTask;