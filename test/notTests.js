const moment= require('moment');

var now  = "04/09/2013 15:00:00";
var then = "04/09/2013 14:20:30";

var ms = moment(then,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"));
var d = moment.duration(ms);
var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

console.log(s.startsWith("-"));