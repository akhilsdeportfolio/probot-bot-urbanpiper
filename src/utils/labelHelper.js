async function addStaleLabel(context, number) {
          let owner = context.payload.repository.owner.login;
          let repo = context.payload.repository.name;

          await context.octokit.issues.addLabels({
                    owner,
                    repo,
                    issue_number: number,
                    labels: ['stale']
          })

}


async function addLabel(context, number, labelsArray) {
          let owner = context.payload.repository.owner.login;
          let repo = context.payload.repository.name;

          await context.octokit.issues.addLabels({
                    owner,
                    repo,
                    issue_number: number,
                    labels: labelsArray
          })

}

module.exports = { addStaleLabel, addLabel };