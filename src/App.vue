<style>
.header {
  width: 100%;
  position: -webkit-sticky; /* Necessário para funcionar no Safari */
  position: sticky;
  top: 0;
  background: #1e1e1e;
  z-index: 1;
}

.header p {
  font-size: 20px;
  margin-top: 10px;
  margin-left: 10px;
}

p {
  color: white;
}
.primaryback {
  background: #1e1e1e;
}
.primarytext {
  color: white;
}

.loading {
  position: fixed;
  z-index: 1;
  margin-left: calc(50% - 15px);
  margin-top: 50%;
}
</style>

<template>
  <!-- <v-icon>mdi-open-in-new</v-icon> -->

  <v-app id="inspire" style="background-color:#1E1E1E">
    <v-content>
      <router-view></router-view>
    </v-content>

    <v-bottom-navigation :value="activeBtn" grow color="blue" dark app>
      <v-btn @click="goto(1)">
        <span>Recent release</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>
      <v-btn @click="goto(2)">
        <span>Next 30 days</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
      <v-btn @click="goto(3)">
        <span>My Favorites</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: "App",

  components: {
    // HelloWorld,
  },

  data: () => ({
    //
    activeBtn: 0
  }),
  methods: {
    goto(pagina) {
      switch (pagina) {
        case 1:
          this.$router.push({
            name: "Recent",
            params: { errors: "123" }
          }).catch(() => {});
          break;
        case 2:
          this.$router.push({
            name: "NextDays",
            params: { errors: "123" }
          }).catch(() => {});
          break;
        case 3:
          this.$router.push({
            name: "Favorites",
            params: { errors: "123" }
          }).catch(() => {});
          break;

        default:
          this.$router.push({
            name: "Recent",
            params: { errors: "123" }
          }).catch(() => {});
          break;
      }
    }
  }
};
</script>

