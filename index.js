const {nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, flyover) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  finalPrint(flyover);
});

const finalPrint = function (flyover) {
  for (fly of flyover) {
    console.log(`Next pass at ${Date(fly.risetime)} for ${fly.duration} seconds`);
  }
}
// fetchMyIP((error, myIpObject) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   // console.log('It worked! Returned IP:', myIpObject);

//   const { ip } = myIpObject;

//   fetchCoordsByIp(ip, (error, coords) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   // console.log('It worked! Returned IP:' , coords);

//   fetchISSFlyOverTimes(coords, (error, duration) => {
//     if (error) {
//       console.log("It didn't work!", error);
//       return;
//     }
  
//     // console.log('It worked! Returned IP:', duration);

//     nextISSTimesForMyLocation((error, passTimes) => {
//       if (error) {
//         return console.log("It didn't work!", error);
//       }
      
//       console.log(passTimes);
//     });
//   });

//   });
  
// });


