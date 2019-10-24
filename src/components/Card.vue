<template>
  <div
    class="uk-card uk-flex-inline uk-flex-column uk-background-default uk-width-1-5@xl uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s"
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
    <div v-if="room.isLoading" class="uk-padding-small uk-flex uk-flex-center">
      <div uk-spinner="ratio: 1.5"></div>
    </div>
    <div
      class="uk-flex-1 uk-card-default uk-card-body uk-overflow-auto uk-padding-small"
      v-else-if="display === 'timetable'"
    >
      <Event
        v-for="event in room.timetable"
        v-bind:key="event.id"
        v-bind:event="event"
        v-bind:highlight-color="room.color"
      ></Event>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import Event from "./Event";
export default {
  name: "Card",
  components: { Event },
  props: {
    room: Object,
    display: String
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
div.uk-card {
  background-clip: content-box;
}
</style>
