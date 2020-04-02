<style scoped>
.header {
  width: 100%;
  position: -webkit-sticky; /* Necessário para funcionar no Safari */
  position: sticky;
  top: 0;
  background: #1e1e1e;
  z-index: 1;
}
p {
  font-size: 20px;
  margin-top: 10px
}
</style>

<template>
  <div>
    <v-dialog dark v-model="dialogFilter" max-width="290">
      <v-card>
        <v-card-title class="headline">Filter</v-card-title>

        <v-card-text>Adicionar os filtros</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="blue" text @click="dialogFilter = false">Cancel</v-btn>

          <v-btn color="blue" text @click="dialogFilter = false">Search</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card class="mx-auto" max-width="700" dark>
      <v-row class="header">
        <v-col>
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
import axios from "axios";
import cardjogo from "../components/CardJogo.vue";
export default {
  name: "Recent",
  components: {
    cardjogo
  },

  data() {
    return {
      next: null,
      carregando: false,
      dataInicio: null,
      dataFim: null,
      dialogFilter: false,
      listaJogos: []
    };
  },
  methods: {
    setData() {
      var dataInicio = new Date().setDate(new Date().getDate() - 92);
      dataInicio = new Date(dataInicio).toLocaleDateString("pt-BR");
      dataInicio = dataInicio.split("/");
      this.dataInicio = `${dataInicio[2]}-${dataInicio[1]}-${dataInicio[0]}`;
      var dataFim = new Date().toLocaleDateString("pt-BR");
      dataFim = dataFim.split("/");
      this.dataFim = `${dataFim[2]}-${dataFim[1]}-${dataFim[0]}`;
    },
    carregarJogo() {
      this.setData();
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow && !this.carregando) {
          if (this.next == null) return;
          this.carregando = true;
          if (this.listaJogos.length > 20) this.listaJogos.splice(0, 20);
          axios
            .get(
              `https://arcadaweb.com.br/api/gamerelease/listagames.php?next=${this.next}`
            )
            .then(response => {
              // JSON responses are automatically parsed.
              this.next = response.data.next.replace(/&/g, "amp;");
              response.data.retorno.forEach(element => {
                this.listaJogos.push(element);
              });
              this.carregando = false;
            })
            .catch(e => {
              this.errors.push(e);
            });
        }
      };
      axios
        .get(
          `https://arcadaweb.com.br/api/gamerelease/listagames.php?datainicio=${this.dataInicio}&datafim=${this.dataFim}&order=-released`
        )
        .then(response => {
          // JSON responses are automatically parsed.
          this.next = response.data.next.replace(/&/g, "amp;");
          this.listaJogos = response.data.retorno;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  mounted() {
    this.carregarJogo();
  }
};
</script>

<style>
</style>