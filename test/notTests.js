const moment =require('moment');

const resolutionDate = "18/02/2022";
let temp=resolutionDate.split("/");

console.log(new Date(+temp[2],+temp[1]-1,+temp[0]));

