<template>
  <div v-if="jogo!=null">
    <v-dialog
      persistent
      v-model="dialogDetalhes"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card dark>
        <v-toolbar color="black">
          <v-btn icon dark @click="$emit('cancel')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Detalhes</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card dark>
          <v-img :src="carregarImagem" class="white--text align-end" height="350px">
            <div style="background: #00000077">
              <v-card-title v-text="jogo.nome"></v-card-title>
              <v-card-text class="detalhesjogo" style="padding-bottom: 0px">
                <p>{{jogo.nota}}</p>
                <p>{{jogo.publishers}}</p>
                <p>
                  <b>Genero: </b>
                  {{genero}}
                </p>
                <p><b>Date: </b>{{jogo.data}}</p>
              </v-card-text>
            </div>
          </v-img>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Detalhes",
  data() {
    return {};
  },
  props: ["dialogDetalhes", "jogo"],
  computed: {
    carregarImagem() {
      var imagem =
        this.jogo.background != null
          ? this.jogo.background
          : this.jogo.videoimagepreview != null
          ? this.jogo.videoimagepreview
          : "https://arcadaweb.com.br/img/cardnotfound.jpg";
      return imagem;
    },
    genero() {
      var genero = "";
      for (var i = 0; i < this.jogo.generos.length; i++) {
        if (i+1 == this.jogo.generos.length) genero += this.jogo.generos[i].nome;
        else genero += this.jogo.generos[i].nome + " - ";
      }

      return genero;
    }
  },
  methods: {},
  mounted() {}
};
</script>

<style>
</style>