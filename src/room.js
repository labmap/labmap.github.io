import moment from "moment";
import axios from "axios";
import _ from "lodash";

const API_URL = "https://students.mimuw.edu.pl/~tm385898/labmap/api";
const TIMETABLE_URL = `${API_URL}/timetable`;
const COMPUTERS_URL = `${API_URL}/computers`;

export default class Room {
  constructor(id, color) {
    this.id = id;
    this.color = color;
    this.timetable = [];
    this.isTimetableLoading = false;
    this.computers = [];
    this.areComputersLoading = false;
  }

  loadData() {
    this.isTimetableLoading = true;
    this.areComputersLoading = true;
    axios.get(`${TIMETABLE_URL}/${this.id}`).then(response => {
      this.initializeTimetable(response.data);
      this.isTimetableLoading = false;
    });
    axios.get(`${COMPUTERS_URL}/${this.id}`).then(response => {
      this.initializeComputers(response.data);
      this.areComputersLoading = false;
    });
  }

  initializeComputers(computers) {
    computers.forEach(computer => this.computers.push(computer));
  }

  initializeTimetable(events) {
    const currentTime = moment();
    const currentWeekday = currentTime.format("dddd").toLowerCase();
    const todayEvents = events[currentWeekday];
    if (todayEvents && todayEvents.length > 0) {
      const preprocessedEvents = this.preprocessEvents(
        todayEvents,
        currentTime
      );
      preprocessedEvents.forEach(event => this.timetable.push(event));
    }
  }

  preprocessEvents(events, currentTime) {
    const preprocessedEvents = events.map((event, index) =>
      this.preprocessEvent(event, index, currentTime)
    );
    const nextEvent = this.getNextEvent(preprocessedEvents);
    if (nextEvent !== undefined) {
      nextEvent.isNext = true;
    }
    const lastEvent = preprocessedEvents[preprocessedEvents.length - 1];
    if (lastEvent.isEnded) {
      lastEvent.isLast = true;
    }
    return preprocessedEvents;
  }

  preprocessEvent(event, index, currentTime) {
    const start = moment(event.start_time, "H:m");
    const end = moment(event.end_time, "H:m");
    return _.assign(event, {
      id: index,
      isEnded: currentTime.isAfter(end),
      isActive: currentTime.isBetween(start, end),
      isNext: false,
      isLast: false
    });
  }

  getNextEvent(events) {
    if (!events[0].isEnded) {
      return events[0];
    } else {
      return events.find(event => !event.isEnded);
    }
  }
}
