<template>
  <div>
    <div class="loading" v-if="this.$store.state.listarJogos.GET_CARREGANDO">
      <v-progress-circular indeterminate color="white"></v-progress-circular>
    </div>
    <v-card class="mx-auto" max-width="700" dark>
      <v-row class="header">
        <v-col cols="12">
          <p>Next 30 days</p>
        </v-col>
      </v-row>
      <v-container fluid v-for="jogo in listaJogos" :key="jogo.id">
        <cardjogo :propjogo="jogo"></cardjogo>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import cardjogo from "../components/CardJogo.vue";
export default {
  name: "NextDays",
  components: {
    cardjogo
  },
  data() {
    return {
      dataInicio: new Date().toISOString().substr(0, 10),
      dataFim: new Date(new Date().setDate(new Date().getDate() + 30))
        .toISOString()
        .substr(0, 10)
    };
  },
  computed: {
    listaJogos: {
      get() {
        return this.$store.state.listarJogos.GET_LISTAGEM_JOGOS;
      },
      set(value) {
        this.$store.commit("listarJogos/SET_LISTAGEM_JOGOS", value);
      }
    }
  },
  methods: {
    carregarJogo(queryString) {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow && !this.$store.state.listarJogos.GET_CARREGANDO) {
          if (this.$store.state.listarJogos.GET_NEXT == null) return;
          var next = this.$store.state.listarJogos.GET_NEXT.replace(
            /&/g,
            "amp;"
          );
          if (this.listaJogos.length > 20) this.listaJogos.splice(0, 20);
          this.$store.dispatch("listarJogos/REQUEST_JOGOS", `next=${next}`);
        }
      };
      //usado para chamar a action
      this.$store.dispatch("listarJogos/REQUEST_JOGOS", queryString);
    }
  },
  mounted() {
    this.$store.commit("listarJogos/SET_LISTAGEM_JOGOS", []);
    this.carregarJogo(
      `order=released&datainicio=${this.dataInicio}&datafim=${this.dataFim}`
    );
  }
};
</script>

<style>
</style>