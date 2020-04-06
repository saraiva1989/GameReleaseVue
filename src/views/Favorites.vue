<template>
  <div>
    <!-- <div class="loading" v-if="this.$store.state.listarJogos.GET_CARREGANDO">
      <v-progress-circular indeterminate color="white"></v-progress-circular>
    </div>-->
    <detalhes :dialogDetalhes="dialogDetalhes" :jogo="jogo" @cancel="dialogDetalhes = false"></detalhes>
    <v-card class="mx-auto" max-width="700" dark>
      <v-row class="header">
        <v-col cols="12">
          <p>Favorites</p>
        </v-col>
      </v-row>
      <v-container fluid v-for="jogo in jogos" :key="jogo.id">
        <cardjogo :propjogo="jogo" @filhoclickCard="detalhes"></cardjogo>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import cardjogo from "../components/CardJogo.vue";
import detalhes from "../components/Detalhes.vue";

export default {
  name: "Favorites",
  components: {
    cardjogo,
    detalhes
  },
  data() {
    return {
      jogos: [],
      dialogDetalhes: false,
      jogo: null
    };
  },
  computed: {},

  methods: {
    detalhes(payload) {
      this.jogo = payload;
      this.dialogDetalhes = true;
    },
    carregarBanco() {
      this.jogos = []
      const BD = { ...localStorage };
      for (var item in BD) {
        if (item.includes("jogo")) {
          var jogo = JSON.parse(localStorage[item]);
          this.jogos.push(jogo);
        }
      }
    }
  },

  mounted() {
    this.carregarBanco()
  },
  // updated() {
  //   this.carregarBanco()
  // }
};
</script>

<style>
</style>