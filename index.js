bookingData = [
  { "name": "Jenny", "phone": "416 555-8181", "startTime": 1664481600, "endTime": 1664483399 },
  { "name": "Robert", "phone": "416 472-2542", "startTime": 1664487000, "endTime": 1664488799 },
  { "name": "Steve", "phone": "416 715-1933", "startTime": 1664469000, "endTime": 1664470799 },
  { "name": "Boris", "phone": "416 565-6267", "startTime": 1664469000, "endTime": 1664470799 },
  { "name": "Cory", "phone": "416 555-1044", "startTime": 1664476200, "endTime": 1664477999 },
  { "name": "Jeff", "phone": "416 555-9211", "startTime": 1664487000, "endTime": 1664488799 },
  { "name": "Penny", "phone": "416 555-6807", "startTime": 1664470800, "endTime": 1664472599 },
  { "name": "Nathan", "phone": "416 555-3215", "startTime": 1664490600, "endTime": 1664492399 },
  { "name": "Daniel", "phone": "416 555-8311", "startTime": 1664481600, "endTime": 1664483399 },
  { "name": "Karen", "phone": "416 555-3215", "startTime": 1664451000, "endTime": 1664452799 }
]



const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {

  function compare(startTime) {
    return function (a, b) {
      if (a[startTime] > b[startTime])
        return 1;
      else if (a[startTime] < b[startTime])
        return -1;

      return 0;
    }
  }
  sortedBookingData = bookingData.sort(compare("startTime"))

  
  var bookedSlots = []
  var status
  for (let i = 0; i < sortedBookingData.length; i++) {

    st = sortedBookingData[i].startTime
    et = sortedBookingData[i].endTime + 1

    var options = {timeZone: 'America/Creston', hour: "numeric", minute: "numeric"};
    pst = new Date((st) * 1000).toLocaleTimeString('en-US', options)
    pet = new Date((et) * 1000).toLocaleTimeString('en-US', options)

    if (bookedSlots.includes(st) || et - st > 1800) {
      status = "rejected"
    } else {
      bookedSlots[i] = st
      status = "accepted"
    }

    // console.log(sortedBookingData[i].name + " " + pst + "  -  " + pet + "," + status)
    res.write(sortedBookingData[i].name + ", " + sortedBookingData[i].phone + ", " + pst + "  -  " + pet + ", " + status + "\n")
  }
  // console.log(sortedBookingData)
  res.send()
})

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));