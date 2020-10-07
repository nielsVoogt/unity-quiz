<template>
  <div>
    <select v-model="$i18n.locale" @change="setLocale">
      <option v-for="(lang, i) in langs" :key="`lang-${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectLocale",
  data() {
    return { langs: ["en", "nl"] };
  },
  methods: {
    setLocale() {
      // When someone starts a quiz the page refreshes and the i18n is reset to it's fallback
      // To avoid this we set a locale key in sessionStorage and look for it in a mounted() hook
      sessionStorage.setItem("locale", this.$i18n.locale + "");
    },
  },
};
</script>
