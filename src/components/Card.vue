<template>
  <div
    class="uk-card uk-flex uk-flex-column uk-width-1-5@xl uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s"
  >
    <header
      :class="[
        'uk-padding-small',
        'text-white',
        'uk-flex',
        'uk-navbar-container',
        'uk-navbar-transparent',
        `background-${room.color}`
      ]"
    >
      <div class="uk-h3 text-white uk-margin-remove">
        {{ room.id }}
      </div>
    </header>
    <main
      class="uk-flex-1 uk-card-default uk-card-body uk-overflow-auto uk-padding-small"
    >
      <Event
        v-for="event in room.timetable"
        v-bind:key="event.id"
        v-bind:event="event"
        v-bind:highlight-color="room.color"
      ></Event>
    </main>
  </div>
</template>

<script>
import Event from "./Event";
export default {
  name: "Card",
  components: { Event },
  props: {
    room: Object
  }
};
</script>

<style scoped>
main.uk-card-body {
  padding: 10px 10px 0 10px !important;
}
</style>
