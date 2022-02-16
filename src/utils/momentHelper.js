const moment = require('moment');

function getFutureDate(currentDate, futureDays) {
          let op = "";
          let newDate = moment(currentDate, "DD-MM-YYYY").add('days', futureDays);
          op += newDate.format('DD');
          op += "-";
          op += newDate.format('MM');
          op += "-";
          op += newDate.format('YYYY');
          return op;
}

function isTimeOut(createdDate, timeOutDays) {
          let resolveDate = getFutureDate(createdDate, timeOutDays);
          let today = getFutureDate(new Date(), 0);

          console.log("Resolve Date , today", resolveDate, "\t", today);
          return resolveDate === today ? true : false;
}




module.exports = { getFutureDate, isTimeOut };        