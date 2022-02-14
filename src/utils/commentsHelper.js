async function createComment(context, message, number) {
          let owner = context.payload.repository.owner.login;
          let repo = context.payload.repository.name;
          await context.octokit.issues.createComment({
                    owner,
                    repo,
                    issue_number:number,
                    body: message
          });

}
async function welcomeComment(context, message) {
          const issueComment = context.issue({
                    body:message
          });
           await context.octokit.issues.createComment(issueComment);
}



module.exports = { createComment, welcomeComment };