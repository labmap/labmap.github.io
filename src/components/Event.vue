<template>
  <main
    :class="[
      'uk-border-rounded',
      'uk-card',
      'uk-flex',
      'uk-flex-column',
      'text-white',
      'uk-margin-bottom',
      event.isActive ? `background-${highlightColor}` : 'background-grey'
    ]"
    style="padding: 5px;"
  >
    <div class="uk-text-bold">
      {{ event.course_name }}
    </div>
    <div v-if="event.teachers !== null">
      {{ event.start_time }} - {{ event.end_time }}, {{ event.teachers }}
    </div>
    <div v-else>{{ event.start_time }} - {{ event.end_time }}</div>
  </main>
</template>

<script>
export default {
  name: "Event",
  props: {
    event: Object,
    highlightColor: String
  }
};
</script>

<style scoped>
main.uk-margin-bottom {
  margin-bottom: 10px !important;
}
</style>
