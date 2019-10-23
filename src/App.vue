<template>
  <main id="app">
    <Header></Header>
    <main
      class="uk-grid-small uk-padding-small background-muted uk-flex uk-flex-stretch"
      uk-height-viewport="expand: true"
      uk-grid
    >
      <Card
        v-for="room in rooms"
        v-bind:key="room.id"
        v-bind:room="room"
      ></Card>
    </main>
    <Footer></Footer>
  </main>
</template>

<script>
import UIkit from "uikit";
import moment from "moment";
import axios from "axios";

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
  const todayTimetable = timetable[weekday];
  todayTimetable.forEach((event, id) => {
    const start = moment(event.start_time, "H:m");
    const end = moment(event.end_time, "H:m");
    event.isActive = now.isBetween(start, end);
    event.id = id;
    room.timetable.push(event);
  });
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
