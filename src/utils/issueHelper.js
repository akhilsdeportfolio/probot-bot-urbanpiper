function isBug(labels)
{
          return labels.includes('bug');
}

function isSupport(labels)
{
          return labels.includes('support');
}

function isServiceRequest(labels)
{
          return labels.includes('service-request');
}

function isNoLabels(labels)
{
          return labels.length===0;
}

function isAcknowledged(issue,context)
{
          //console.log(issue);
          
          return false;
}

function isValidReaction(issue,context,team)
{
          
}

function isResolved(issue)
{
          console.log(issue.state);
          return issue.state==='closed';
}


module.exports= {isBug,isSupport,isServiceRequest,isNoLabels,isAcknowledged,isResolved}