<style scoped>
</style>

<template>
  <div>
    <div class="loading" v-if="this.$store.state.listarJogos.GET_CARREGANDO">
      <v-progress-circular indeterminate color="white"></v-progress-circular>
    </div>
    <!-- @filhosearch e @ cancel são eventos acionados pelo componente filho -->
    <filtro :dialogFilter="dialogFilter" @filhosearch="search" @cancel="dialogFilter = false"></filtro>
    <detalhes :dialogDetalhes="dialogDetalhes" :jogo="jogo" @cancel="dialogDetalhes = false"></detalhes>

    <v-card class="mx-auto" max-width="700" dark>
      <v-row class="header">
        <v-col cols="8">
          <p>Recent Release</p>
        </v-col>
        <v-col class="text-right primaryback">
          <v-btn class="ma-2" text icon color="white lighten-2" @click.stop="dialogFilter = true">
            <v-icon>mdi-filter</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-container fluid v-for="jogo in listaJogos" :key="jogo.id">
        <cardjogo :propjogo="jogo" @filhoclickCard="detalhes"></cardjogo>
      </v-container>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import cardjogo from "../components/CardJogo.vue";
import filtro from "../components/Filtro.vue";
import detalhes from "../components/Detalhes.vue";
export default {
  name: "Recent",
  components: {
    cardjogo,
    filtro,
    detalhes
  },

  data() {
    return {
      next: null,
      dataInicio: null,
      dataFim: null,
      dialogFilter: false,
      dialogDetalhes: false,
      jogo: null
    };
  },

  computed: {
    listaJogos: {
      get() {
        //pega os dados que estão no state [pasta listarjogos]
        return this.$store.state.listarJogos.GET_LISTAGEM_JOGOS;
      },
      set(value) {
        //atualiza o dado da store usando o mutation
        this.$store.commit("listarJogos/SET_LISTAGEM_JOGOS", value);
      }
    }
  },

  methods: {
    detalhes(payload) {
      this.jogo = payload
      this.dialogDetalhes = true
    },
    filterCancel() {
      this.dialogFilter = false;
    },
    search(payload) {
      this.$store.commit("listarJogos/SET_LISTAGEM_JOGOS", []);
      this.dialogFilter = payload.dialogFilter;
      this.dataInicio = payload.fiterDateStart;
      this.dataFim = payload.fiterDateEnd;
      if (payload.searchName !== null && payload.searchName != "") {
        this.requestJogo(`nome=${payload.searchName}`);
      } else {
        this.requestJogo(
          `order=released&datainicio=${this.dataInicio}&datafim=${this.dataFim}&plataforma=${payload.consoleSelected.id}`
        );
      }
    },

    setData() {
      var dataInicio = new Date().setDate(new Date().getDate() - 92);
      this.dataInicio = new Date(dataInicio).toISOString().substr(0, 10);
      this.dataFim = new Date().toISOString().substr(0, 10);
    },
    requestJogo(queryString) {
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
          //dispach chama uma action que atualiza da um commit na mutation e atualiza a store.
          this.$store.dispatch("listarJogos/REQUEST_JOGOS", `next=${next}`);
        }
      };
      //usado para chamar a action
      this.$store.dispatch("listarJogos/REQUEST_JOGOS", queryString);
    }
  },
  mounted() {
    this.setData();
    this.$store.commit("listarJogos/SET_LISTAGEM_JOGOS", []);
    this.requestJogo(
      `datainicio=${this.dataInicio}&datafim=${this.dataFim}&order=-released`
    );
  }
};
</script>

<style>
</style>