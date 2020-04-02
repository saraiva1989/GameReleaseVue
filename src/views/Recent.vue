<template>
  <div>
    <p>recent</p>
    <v-card class="mx-auto" max-width="500" dark>
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
        </v-card> -->
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import cardjogo from "../components/CardJogo.vue"
export default {
  name: "Recent",
  components: {
    cardjogo
  },

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
          if (this.next == null) return;
          this.carregando = true;
          if (this.listaJogos.length > 20) this.listaJogos.splice(0, 20);
          axios
            .get(
              `https://arcadaweb.com.br/api/gamerelease/listagames.php?next=${this.next}`
            )
            .then(response => {
              // JSON responses are automatically parsed.
              this.next = response.data.next;
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