
/**
 * 
 * Schedule class - handles scheduling of bookings and output as described in the assignment
 * 
 * This class could be put in its on file and imported.
 * 
 * 1. It provides good code separation:
 *   - Especially nice for those solutions that had an express server
 *   - Use of functions that are easy to read, debug and update
 *   - Could be expanded easily, for example: Get only bookings for timeslot 9:30
 * 
 * 2. For display don't use string manipulation when not needed
 *   - Uses a date formatter to format Date objects
 *   - To satisfy the exact output, the solution uses String.replace() and String.lowerCase()
 * 
 * This is only a example solution showing some ideas that many 
 */
class Schedule {

	constructor() {

		// Store bookings in a Map object
		// Key:   Unix timestamp of the start time, ie: 9:00, 9:30, ...
		// Value: Array of bookings that came in for that timeslot
		this.schedule = new Map()

		// Date formatter for unix timestamp to string to satisfy requirements from assignment
		this.dateFormat = new Intl.DateTimeFormat(
			"en-US",
			{timeZone: "UTC", hour: "2-digit", minute: "2-digit"}
		)
	}

	/**
	 * Adds a booking to the schedule into a timeslot
	 */
	addBooking(booking) {

		// Search map for timeslot
		let timeSlot = this.schedule.get(booking.startTime)

		// If timeslot doesn't exist, add set an array to the timeslot and add the booking that's accepted
		if ( ! timeSlot ) {
			booking.accepted = true
			this.schedule.set(booking.startTime, [booking])
		}
		
		// If timeslot exists, push booking in the timeslot that's not accepted
		else {
			booking.accepted = false
			timeSlot.push(booking)
		}
	}

	/**
	 * Orders the timeslots. For each timeslot, output the array of bookings
	 */
	outputSolution() {
		this.schedule = new Map([...this.schedule.entries()].sort())

		const timeslots = this.schedule.values()
		for(const timeslot of timeslots) {
			this.outputTimeSlot(timeslot)
		}
	}

	/**
	 * Loops over all bookings for a timeslot
	 */
	outputTimeSlot(timeslot) {
		for (const booking of timeslot) {
			this.outputBooking(booking)
		}
	}

	/**
	 * Outputs a booking to console, as described in the assignment
	 */
	outputBooking(booking) {
		const startTime = this.unixTimestampToString(booking.startTime)
		const endTime = this.unixTimestampToString(booking.endTime + 1)
		const status = (booking.accepted) ? "accepted" : "rejected"
		console.log(`${booking.name}, ${booking.phone}, ${startTime} - ${endTime}, ${status}`);
	}

	/**
	 * Helper function to format a unixtimestamp to a string format, as described in the assignment
	 */
	unixTimestampToString(unixTs) {
		return this.dateFormat
			.format(new Date(unixTs * 1000))
			.replace(" ", "")
			.toLowerCase()
	}
}


// Input for assignment
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
