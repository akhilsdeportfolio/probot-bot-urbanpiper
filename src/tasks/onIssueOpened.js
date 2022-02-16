const { ProbotOctokit, Probot } = require("probot");
const { welcomeComment, addResolutionDateComment } = require("../utils/commentsHelper");
const axios = require('axios');

let onIssueOpened = async (context) => {
          //this is triggered when ever issue is created;
          let team = context.payload.repository.owner.login;
          let teams_url = context.payload.repository.teams_url;
          //get labels and check for bug,support or service request or none and act accordingly.
          let labels = context.payload.issue.labels;

          labels=labels.map((label)=>label.name);
          console.log("labels",labels)
          if(labels.length > 0)
          {         

                    if(labels.includes('bug')|| labels.includes('support'))
                    {         
                    
                              //comment the resolution date;
                             return addResolutionDateComment(context);


                    }else if(labels.includes('service-request')||labels.includes('feature'))
                    {



                    }
                    else
                    {
                              console.log("Cant find the labels");
                    }




          }
          else
          {         
                    //no labels for the issue



          }

          /* console.log(context);

          return welcomeComment(context, ` Thanks for creating the issue, someone from @${team} will be soon assigned to take a look at it.`); */
}

module.exports = onIssueOpened;