class Schedule {
	constructor() {
		this.schedule = new Map()
		this.dateFormat = new Intl.DateTimeFormat(
			"en-US",
			{timeZone: "UTC", hour: "2-digit", minute: "2-digit"}
		)
	}

	addBooking(booking) {
		let timeSlot = this.schedule.get(booking.startTime)

		if ( ! timeSlot ) {
			booking.accepted = true
			this.schedule.set(booking.startTime, [booking])
		} else {
			booking.accepted = false
			timeSlot.push(booking)
		}
	}


	outputSolution() {
		this.schedule = new Map([...this.schedule.entries()].sort())
		const timeslots = this.schedule.values()
		for(const timeslot of timeslots) {
			this.outputTimeSlot(timeslot)
		}
	}

	outputTimeSlot(timeslot) {
		for (const booking of timeslot) {
			this.outputBooking(booking)
		}
	}

	outputBooking(booking) {
		const startTime = this.unixTimestampToString(booking.startTime)
		const endTime = this.unixTimestampToString(booking.endTime + 1)
		const status = (booking.accepted) ? "accepted" : "rejected"
		console.log(`${booking.name}, ${booking.phone}, ${startTime} - ${endTime}, ${status}`);
	}

	unixTimestampToString(unixTs) {
		return this.dateFormat
			.format(new Date(unixTs * 1000))
			.replace(" ", "")
			.toLowerCase()
	}
}

const bookings = [
	{"name": "Jenny", "phone": "416 555-8181", "startTime": 1664481600, "endTime": 1664483399},
	{"name": "Robert", "phone": "416 472-2542", "startTime": 1664487000, "endTime": 1664488799},
	{"name": "Steve", "phone": "416 715-1933", "startTime": 1664469000, "endTime": 1664470799},
	{"name": "Boris", "phone": "416 565-6267", "startTime": 1664469000, "endTime": 1664470799},
	{"name": "Cory", "phone": "416 555-1044", "startTime": 1664476200, "endTime": 1664477999},
	{"name": "Jeff", "phone": "416 555-9211", "startTime": 1664487000, "endTime": 1664488799},
	{"name": "Penny", "phone": "416 555-6807", "startTime": 1664470800, "endTime": 1664472599},
	{"name": "Nathan", "phone": "416 555-3215", "startTime": 1664490600, "endTime": 1664492399},
	{"name": "Daniel", "phone": "416 555-8311", "startTime": 1664481600, "endTime": 1664483399},
	{"name": "Karen", "phone": "416 555-3215", "startTime": 1664451000, "endTime": 1664452799}
];

let schedule = new Schedule;

for (const booking of bookings) {
	schedule.addBooking(booking)
}

schedule.outputSolution()
