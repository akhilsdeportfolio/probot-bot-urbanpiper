async function addStaleLabel(context,number)
{         
          let owner = context.payload.repository.owner.login;
          let repo = context.payload.repository.name;

          await context.octokit.issues.addLabels({
                    owner,
                    repo,
                    issue_number:number,
                    labels:['stale']
          })

}

module.exports=addStaleLabel;