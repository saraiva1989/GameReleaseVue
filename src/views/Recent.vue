<template>
  <div>
    <p>recent</p>
    <v-card class="mx-auto" max-width="500" dark>
      <v-container fluid>
        <v-row dense>
          <v-col v-for="jogo in listaJogos" :key="jogo.id">
            <v-card>
              <v-img
                :src="jogo.background"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="jogo.nome"></v-card-title>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Recent",

  data() {
    return {
      next: null,
      carregando: false,
      listaJogos: []
    };
  },
  methods: {
    carregarJogo() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow && !this.carregando) {
          if(this.next == null) return;
          this.carregando = true
          axios
            .get(`https://arcadaweb.com.br/api/gamerelease/listagames.php?next=${this.next}`)
            .then(response => {
              // JSON responses are automatically parsed.
              this.next = response.data.next
              response.data.retorno.forEach(element => {
                this.listaJogos.push(element)
              });
              this.carregando = false
              console.log(this.listaJogos)
            })
            .catch(e => {
              this.errors.push(e);
            });
        }
      };
      axios
        .get(`https://arcadaweb.com.br/api/gamerelease/listagames.php`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.next = response.data.next;
          this.listaJogos = response.data.retorno;
          //debugger; // eslint-disable-line
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