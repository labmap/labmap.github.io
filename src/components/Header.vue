<template>
  <header
    id="header"
    class="uk-grid-small uk-flex-center uk-background-primary uk-padding-small uk-child-width-1-3@s uk-child-width-1-1"
    uk-grid
  >
    <div></div>
    <div class="text-white uk-text-center">
      <a class="uk-logo" href="">LabMap</a>
    </div>
    <div
      id="toggle-switch"
      class="uk-flex-inline uk-flex-center uk-flex-right@s uk-flex-middle"
    >
      <div class="uk-margin-right">Timetable</div>
      <toggle-button
        :value="false"
        :labels="false"
        :color="{ checked: 'lightgray', unchecked: 'lightgray' }"
        @change="onToggleHandler"
      />
      <div class="uk-margin-left">Computers</div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    onToggleHandler({ value }) {
      // eslint-disable-next-line no-console
      console.log(value);
      const newDisplay = value ? "computers" : "timetable";
      // eslint-disable-next-line no-console
      console.log(newDisplay);
      this.$emit("update:display", newDisplay);
    }
  }
};
</script>

<style scoped>
* {
  color: white !important;
}
</style>
