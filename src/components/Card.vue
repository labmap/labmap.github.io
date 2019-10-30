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
    <div v-if="isLoading()" class="uk-padding-small uk-flex uk-flex-center">
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
    <div v-else>
      <table
        class="uk-table uk-table-small uk-table-divider uk-table-middle uk-margin-remove"
        style="border-bottom: 1px solid #e5e5e5"
      >
        <tbody>
          <Computer
            v-for="computer in room.computers"
            v-bind:key="computer.id"
            v-bind:computer="computer"
          ></Computer>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Event from "./Event";
import Computer from "./Computer";
export default {
  name: "Card",
  components: { Computer, Event },
  props: {
    room: Object,
    display: String
  },
  data() {
    return {};
  },
  methods: {
    isLoading() {
      return (
        (this.display === "timetable" && this.room.isTimetableLoading) ||
        (this.display === "computers" && this.room.areComputersLoading)
      );
    }
  }
};
</script>

<style scoped>
div.uk-card {
  background-clip: content-box;
}
</style>
