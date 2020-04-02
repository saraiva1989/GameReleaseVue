<template>
  <div>
    <p>recent</p>
    <v-card class="mx-auto" max-width="500" dark>
      <v-container fluid>
        <v-row dense>
          <v-col v-for="jogo in jogos" :key="jogo.id">
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

  data: () => ({
    jogos: [],
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 12
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 6
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 6
      }
    ]
  }),
  methods: {
    carregarJogo() {
      axios
        .get(`https://arcadaweb.com.br/api/gamerelease/listagames.php`)
        .then(response => {
          // JSON responses are automatically parsed.
          debugger // eslint-disable-line
          this.jogos = response.data.retorno;
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