<template>
  <div>
    <h1>Home</h1>
    <router-link :to="{ name: 'Quiz' }"> Start a Quiz </router-link>
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>