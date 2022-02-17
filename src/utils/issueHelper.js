const { ProbotOctokit } = require('probot');
const { isMemeber } = require('./teamsHelper');

const oc = new ProbotOctokit({

});

function isBug(labels) {
          return labels.includes('bug');
}

function isSupport(labels) {
          return labels.includes('support');
}

function isServiceRequest(labels) {
          return labels.includes('service-request');
}

function isNoLabels(labels) {
          return labels.length === 0;
}

async function isAcknowledged(issue, context) {
          //let isValidAssignee = false;
          //let isValidReaction = false;
          //for debugging purpose
          //console.log(issue);
          let assignee = issue.assignee;
          let assignees = issue.assignees;
          let reactions = await context.octokit.reactions.listForIssue({
                    owner: context.payload.repository.owner.login, repo: context.payload.repository.name,
                    issue_number: issue.number,
          });


          //console.log(reactions);
          //check if it is a valid reaction from the team member
          if (reactions.data.length > 0) {
                    //check if it is a valid reaction

                    reactions.data.forEach((reaction) => {
                              //console.log("Reaction", reaction.user.login);
                              if (isValidReaction(reaction.user.login, context.payload.repository.name))
                                        return true;

                    });

          }


          if (assignees.length > 0) {
                    //check if issue has valid assignee from the team
                    assignees.forEach((assignee) => {
                              //console.log("Assignee",assignee);
                              if (isMemeber(context.payload.repository.name, assignee.login)) {
                                        return true;
                              }
                    })
          }


          return false;
          //return isValidReaction === true || isValidAssignee === true ? true : false;

}


function isValidReaction(user, repo) {
          return isMemeber(repo, user);

}

function isResolved(issue) {
          return issue.state === 'closed';
}


async function hasResolutionComment(issue,context) {
          let notFoundInComment=false;
          let foundInComments= false;
          let date ="";
          //check if issue has a resolution comment          
          let comments=await context.octokit.issues.listComments({
                    owner: context.payload.repository.owner.login, repo: context.payload.repository.name,
                    issue_number: issue.number,
          });

          if(comments.data.length > 0)
          {
                  comments.data.forEach((comment)=>{
                              console.log("Helper",isValidResolutionDateComment(comment.body))
                              if(isValidResolutionDateComment(comment.body)==true)
                                        {
                                                  foundInComments=true;
                                                  date=comment.body;
                                        }
                              
                    })                    
                    notFoundInComment=true;

          }
          

          
          if(foundInComments===true)          
                    return {status:true,date};                    
          else 
                    return {status:false,date:null};               
}

function isValidResolutionDateComment(input) {
          let regex=/^Resolution\sDate\s-\s([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
          return regex.test(input);
}



module.exports = { isBug, isSupport, isServiceRequest, isNoLabels, isAcknowledged, isResolved ,hasResolutionComment}