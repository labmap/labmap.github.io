<template>
  <div>
    <hr v-if="event.isNext" class="uk-divider-icon" />
    <main
      :class="[
        'uk-border-rounded',
        'uk-card',
        'uk-flex',
        'uk-flex-column',
        'text-white',
        'uk-margin-bottom',
        selectColorClass()
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
  </div>
</template>

<script>
export default {
  name: "Event",
  props: {
    event: Object,
    display: String,
    highlightColor: String
  },
  methods: {
    selectColorClass() {
      if (this.event.isActive) {
        return `background-${this.highlightColor}`;
      } else if (this.event.isEnded) {
        return "background-lightgrey";
      } else {
        return "background-darkgrey";
      }
    }
  }
};
</script>

<style scoped lang="scss">
hr {
  background-position-x: 0;
  margin-bottom: 10px;

  &:before {
    width: 0;
  }

  &:after {
    border-width: 2px;
    left: 25px;
    max-width: calc(100% - (50px / 2));
  }
}

main.uk-margin-bottom {
  margin-bottom: 10px !important;
}
</style>
