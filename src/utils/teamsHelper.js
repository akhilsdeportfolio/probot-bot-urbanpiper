const teams = {
          "issues-prime": ['azaan', 'vaibhav', 'akhilsdeportfolio', 'ibrahim', 'parth'],
          "issues-atlas": [],
          "issues-codex": []
}
function isMemeber(team, memeberId) {

          if (teams[team] !== undefined) {
                    const members = teams[team];
                    console.log(members);
                    return members.includes(memeberId) === true ? true : false;
          }
          else {
                    return false;
          }
}

module.exports = { isMemeber };