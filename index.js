const axios = require('axios');
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");


  app.on("issues.opened", async (context) => {    
    const issueComment = context.issue({
      body: "Thanks for opening this issue our team will get back to you shortly!"
    });
    return context.octokit.issues.createComment(issueComment);










  });





};


