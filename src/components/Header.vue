<template>
  <header
    class="uk-navbar-container uk-navbar-transparent uk-background-primary uk-padding-small"
    uk-navbar
  >
    <div class="uk-navbar-center text-white">
      <a class="uk-logo" href="">LabMap</a>
    </div>
    <div class="uk-navbar-right">
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
