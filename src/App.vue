<template>
  <main id="app">
    <Header v-bind:display.sync="display"></Header>
    <main
      class="uk-grid-small uk-margin-remove uk-padding-small uk-padding-remove-left background-muted uk-flex uk-flex-top uk-flex-wrap-top"
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
import Icons from "uikit/dist/js/uikit-icons";
import Header from "./components/Header";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Room from "./room";

UIkit.use(Icons);

const rooms = [
  new Room("2041", "red"),
  new Room("2042", "pink"),
  new Room("2043", "orange"),
  new Room("2044", "brown"),
  new Room("2045", "yellow"),
  new Room("3041", "khaki"),
  new Room("3042", "green"),
  new Room("3043", "cyan"),
  new Room("3044", "blue"),
  new Room("3045", "violet")
];

export default {
  name: "app",
  components: { Footer, Card, Header },
  data() {
    return { display: "timetable", rooms: rooms };
  },
  mounted() {
    rooms.forEach(room => room.loadData());
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Comfortaa&display=swap");

@import "~uikit/src/scss/variables-theme.scss";
@import "~uikit/src/scss/mixins-theme.scss";
@import "~uikit/src/scss/uikit-theme.scss";
@import "~@fortawesome/fontawesome-free/css/all.css";
@import "assets/sass/colors";

* {
  font-family: "Comfortaa", cursive !important;
}
</style>
