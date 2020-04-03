<template>
  <div>
    <div class="loading" v-if="carregando">
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
import axios from "axios";
import cardjogo from "../components/CardJogo.vue";
export default {
name: 'NextDays',
components: {
    cardjogo
  },
  data() {
    return {
      next: null,
      carregando: false,
      dataInicio: new Date().toISOString().substr(0, 10),
      dataFim: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().substr(0, 10),
      listaJogos: [],
      urlBase: "https://arcadaweb.com.br/api/gamerelease/listagames.php?"
    }
  },
  methods: {
    carregarJogo(url) {
      this.carregando = true;
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow && !this.carregando) {
          if (this.next == null) return;
          this.carregando = true;
          this.next = this.next.replace(/&/g, "amp;");
          if (this.listaJogos.length > 20) this.listaJogos.splice(0, 20);
          axios
            .get(`${this.urlBase}next=${this.next}`)
            .then(response => {
              // JSON responses are automatically parsed.
              this.next = response.data.next.replace(/&/g, "amp;");
              response.data.retorno.forEach(element => {
                this.listaJogos.push(element);
              });
              this.carregando = false;
            })
            .catch(e => {
              console.log(e)
              this.carregando = false;
            });
        }
      };
      axios
        .get(url)
        .then(response => {
          // JSON responses are automatically parsed.
          this.next = response.data.next
          this.listaJogos = response.data.retorno;
          this.carregando = false;
        })
        .catch(e => {
          this.carregando = false;
          console.log(e);
        });
    },
  },
  mounted(){
    this.carregarJogo(`${this.urlBase}order=released&datainicio=${this.dataInicio}&datafim=${this.dataFim}`)
  }
}
</script>

<style>

</style>