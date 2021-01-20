<template>
  <div>
    <h1>{{ $t("home.header") }}</h1>
    <SelectLocale />
    <router-link :to="{ name: 'setup' }"> Start a Quiz </router-link>
  </div>
</template>

<script>
import SelectLocale from "@/components/home/SelectLocale.vue";

export default {
  name: "home",
  components: {
    SelectLocale,
  },
  mounted() {
    console.log("locale home", this.$i18n.locale);
  },
};
</script>
