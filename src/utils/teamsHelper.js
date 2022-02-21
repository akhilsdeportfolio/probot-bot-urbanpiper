const teams = {
          "issues-prime": ['aznn', 'vrajroham','parth-koshta', 'ibrahimkundlik','akhilsdeportfolio'],
          "issues-codex": ['anirvan-majumdar','suvodhoy','ray-abhishek','tohidur','nikhil-31','infiniti-code','abhi-1408','manoharup03'],
          "ola-clone": ['akhilsdeportfolio'],
          "test-team-1": ['akhilsdeportfolio']          
}


//key value pairs for repo and teams
const repoMap = {
       "issues-codex":"codex",
       "issues-prime":"stl-prime",       
       "bot-testing":"test-team-1"
}


const teamsUrl = {
          "stl-prime":"urbanpiper/teams/stl-prime",
          "atlas":"urbanpiper/teams/atlas",
          "codex":"urbanpiper/teams/codex",
          "meraki":"urbanpiper/teams/meraki",
          "test-team-1":"akhil-org/teams/test-team-1"

}


function getTeam(repoName)
{
          return repoMap[repoName];
}

function isMemeber(team, memeberId) {

          if (teams[team] !== undefined) {
                    const members = teams[team] || [];
                   // console.log(members);
                    return members.includes(memeberId) === true ? true : false;
          }
          else {
                    return false;
          }
}

module.exports = {isMemeber, teams,repoMap,teamsUrl,getTeam};