<style scoped>
</style>

<template>
  <div>
    <div class="loading" v-if="this.$store.state.listarJogos.GET_CARREGANDO">
      <v-progress-circular indeterminate color="white"></v-progress-circular>
    </div>
    <v-dialog dark v-model="dialogFilter" max-width="290">
      <v-card>
        <v-card-title class="headline">Filter</v-card-title>

        <v-container>
          <v-select
            v-model="consoleSelected"
            :items="consoleItens"
            item-text="nome"
            item-value="id"
            label="nome"
            persistent-hint
            return-object
            single-line
          ></v-select>

          <v-menu
            ref="modalDataStart"
            v-model="modalDataStart"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="fiterDateStart"
                label="Start date"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="fiterDateStart" @input="menu2 = false">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalDataStart = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.modalDataStart.save(fiterDateStart)">OK</v-btn>
            </v-date-picker>
          </v-menu>

          <v-menu
            ref="modalDataEnd"
            v-model="modalDataEnd"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="fiterDateEnd"
                label="End date"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="fiterDateEnd" @input="menu2 = false">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalDataEnd = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.modalDataEnd.save(fiterDateEnd)">OK</v-btn>
            </v-date-picker>
          </v-menu>

          <v-text-field label="Search by name" v-model="searchName"></v-text-field>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="blue" text @click="dialogFilter = false">Cancel</v-btn>

          <v-btn color="blue" text @click="search()">Search</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        <cardjogo :propjogo="jogo"></cardjogo>
      </v-container>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import cardjogo from "../components/CardJogo.vue";
export default {
  name: "Recent",
  components: {
    cardjogo
  },

  data() {
    return {
      fiterDateStart: new Date().toISOString().substr(0, 10),
      fiterDateEnd: new Date(new Date().setDate(new Date().getDate() + 30))
        .toISOString()
        .substr(0, 10),
      modalDataStart: false,
      modalDataEnd: false,
      // pode ser feito dessa forma se for fazer na propria pagina ou usar o vuex (store)
      // consoleSelected: { nome: "Todos", id: "" },
      // consoleItens: [
      //   { nome: "All", id: "" },
      //   { nome: "PS4", id: "18" },
      //   { nome: "Xbox One", id: "1" },
      //   { nome: "PC", id: "4" },
      //   { nome: "Switch", id: "7" }
      // ],
      next: null,
      dataInicio: null,
      dataFim: null,
      dialogFilter: false
    };
  },

  computed: {
    searchName: {
      get() {
        //pega os dados que estão no state [pasta listarjogos]
        return this.$store.state.listarJogos.GET_SEARCH_NAME;
      },
      set(value) {
        //atualiza o dado da store usando o mutation
        this.$store.commit("listarJogos/SET_SEARCH_NAME", value);
      }
    },
    consoleSelected: {
      get() {
        return this.$store.state.listarJogos.GET_CONSOLE_SELECTED;
      },
      set(value) {
        this.$store.commit("listarJogos/SET_CONSOLE_SELECTED", value);
      }
    },
    listaJogos: {
      get() {
        return this.$store.state.listarJogos.GET_LISTAGEM_JOGOS;
      },
      set(value) {
        this.$store.commit("listarJogos/SET_LISTAGEM_JOGOS", value);
      }
    },
    consoleItens: {
      get() {
        return this.$store.state.listarJogos.GET_CONSOLE_ITENS;
      }
    }
  },

  methods: {
    search() {
      this.$store.commit("listarJogos/SET_LISTAGEM_JOGOS", []);
      this.dialogFilter = false;
      this.dataInicio = this.fiterDateStart;
      this.dataFim = this.fiterDateEnd;
      if (this.searchName !== null && this.searchName != "") {
        this.carregarJogo(`nome=${this.searchName}`);
      } else {
        this.carregarJogo(
          `order=released&datainicio=${this.dataInicio}&datafim=${this.dataFim}&plataforma=${this.consoleSelected.id}`
        );
      }
    },
    carregarJogoFiltro() {
      if (this.searchName !== null) {
        this.carregarJogo(`nome=${this.searchName}`);
      }
    },

    setData() {
      var dataInicio = new Date().setDate(new Date().getDate() - 92);
      this.dataInicio = new Date(dataInicio).toISOString().substr(0, 10);
      this.dataFim = new Date().toISOString().substr(0, 10);
    },
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
    this.setData();
    this.$store.commit("listarJogos/SET_LISTAGEM_JOGOS", []);
    this.carregarJogo(
      `datainicio=${this.dataInicio}&datafim=${this.dataFim}&order=-released`
    );
  }
};
</script>

<style>
</style>