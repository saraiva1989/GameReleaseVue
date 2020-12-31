<template>
  <v-container>
    <v-btn color="success" @click="goto">saraiva</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({}),
  methods: {
    goto() {
      this.$router.push({
        name: "About",
        params: { errors: "123" }
      });
    }
  }
};
</script>
