<template>
  <div>
    <v-card class="mx-auto" max-width="700" dark>
      <v-row>
        <v-col>
          <p>Recent Release</p>
        </v-col>
        <v-col class="text-right">
          <v-btn class="ma-2" text icon color="white lighten-2">
            <v-icon>mdi-filter</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-container fluid v-for="jogo in listaJogos" :key="jogo.id">
        <cardjogo :propjogo="jogo"></cardjogo>
        <!-- <v-card>
          <v-img
            :src="jogo.background"
            class="white--text align-end"
            height="200px"
          >
            <v-card-title v-text="jogo.nome"></v-card-title>
          </v-img>
        </v-card>-->
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
          console.log(this.next);
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