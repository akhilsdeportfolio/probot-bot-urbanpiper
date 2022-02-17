const moment= require('moment');

var now  = "04/09/2013 15:00:00";
var then = "04/09/2013 14:20:30";

var ms = moment(then,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"));
var d = moment.duration(ms);
var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

//console.log(s.startsWith("-"));

function useRegex(input) {
          let regex=/^Resolution\sDate\s-\s([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
          return regex.test(input);
}

console.log(useRegex('Resolution Date - 17/02/2022'));

let arr = [1,34,3,34,434,34,34,34];

let resp=arr.forEach((el)=>{
          if(el==434)
          return true
})

console.log(resp);