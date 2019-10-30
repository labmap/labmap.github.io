<template>
  <tr v-if="computer.state === 'off'" class="uk-text-muted">
    <td class="uk-table-shrink">{{ computer.id }}</td>
    <td class="uk-padding-remove-left"></td>
    <td class="uk-padding-remove-left"></td>
    <td class="uk-padding-remove-left uk-table-shrink"></td>
  </tr>
  <tr v-else class="text-black">
    <td class="uk-table-shrink">{{ computer.id }}</td>
    <td class="uk-text-center">{{ computer.user }}</td>
    <td class="uk-padding-remove-left uk-table-shrink">
      <i v-if="computer.state === 'linux'" class="fab fa-linux"></i>
      <i v-else-if="computer.state === 'windows'" class="fab fa-windows"></i>
      <i v-else-if="computer.state === 'macos'" class="fab fa-apple"></i>
    </td>
  </tr>
</template>

<script>
export default {
  name: "Computer",
  props: {
    computer: Object
  }
};
</script>

<style scoped>
i {
  font-family: "Font Awesome 5 Brands", cursive !important;
}
</style>
