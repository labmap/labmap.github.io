<template>
  <main id="app">
    <Header v-bind:display.sync="display"></Header>
    <main
      class="uk-grid-small uk-padding-small background-muted uk-flex uk-flex-top uk-flex-wrap-top"
      uk-height-viewport="expand: true"
      uk-height-match
      uk-grid
    >
      <Card
        v-for="room in rooms"
        v-bind:key="room.id"
        v-bind:room="room"
        v-bind:display="display"
      ></Card>
    </main>
    <Footer></Footer>
  </main>
</template>

<script>
import UIkit from "uikit";
import moment from "moment";
import axios from "axios";
import _ from "lodash";

import Icons from "uikit/dist/js/uikit-icons";
import Header from "./components/Header";
import Card from "./components/Card";
import Footer from "./components/Footer";

UIkit.use(Icons);

const rooms = [
  { id: "2041", color: "red", timetable: [], isLoading: false },
  { id: "2042", color: "pink", timetable: [], isLoading: false },
  { id: "2043", color: "orange", timetable: [], isLoading: false },
  { id: "2044", color: "brown", timetable: [], isLoading: false },
  { id: "2045", color: "yellow", timetable: [], isLoading: false },
  { id: "3041", color: "khaki", timetable: [], isLoading: false },
  { id: "3042", color: "green", timetable: [], isLoading: false },
  { id: "3043", color: "cyan", timetable: [], isLoading: false },
  { id: "3044", color: "blue", timetable: [], isLoading: false },
  { id: "3045", color: "violet", timetable: [], isLoading: false }
];

function setTimetable(room, timetable) {
  const now = moment();
  const weekday = now.format("dddd").toLowerCase();
  const todayEvents = timetable[weekday];
  const preprocessedEvents = todayEvents.map((event, id) => {
    const start = moment(event.start_time, "H:m");
    const end = moment(event.end_time, "H:m");
    return _.assign(event, {
      id: id,
      isEnded: now.isAfter(end),
      isActive: now.isBetween(start, end),
      isNext: false,
      isLast: false
    });
  });
  const nextEvent = preprocessedEvents.find(event => !event.isEnded);
  if (nextEvent !== undefined) {
    nextEvent.isNext = true;
  } else if (!preprocessedEvents[0].isEnded) {
    preprocessedEvents[0].isNext = true;
  }
  preprocessedEvents.forEach(event => room.timetable.push(event));
}

export default {
  name: "app",
  components: {
    Footer,
    Card,
    Header
  },
  data() {
    return {
      display: "timetable",
      rooms: rooms
    };
  },
  mounted() {
    const timetable_url =
      "https://students.mimuw.edu.pl/~tm385898/labmap/api/timetable/";
    rooms.forEach(room => {
      room.isLoading = true;
      axios.get(timetable_url + room.id).then(response => {
        setTimetable(room, response.data);
        room.isLoading = false;
      });
    });
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Comfortaa&display=swap");

@import "~uikit/src/scss/variables-theme.scss";
@import "~uikit/src/scss/mixins-theme.scss";
@import "~uikit/src/scss/uikit-theme.scss";

@import "assets/sass/colors";

* {
  font-family: "Comfortaa", cursive !important;
}
</style>
