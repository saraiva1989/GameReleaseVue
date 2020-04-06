<template>
  <v-row v-if="jogo!=null" justify="center">
    <v-dialog
      persistent
      v-model="dialogDetalhes"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card dark>
        <v-row class="header-detalhe">
          <v-col cols="10" sm="11">
            <v-btn icon dark @click="fechar()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="2" sm="1">
            <v-btn icon dark @click="salvar()">
              <v-icon>{{favoritoicon}}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>

        <v-card dark>
          <v-img :src="carregarImagem" class="white--text align-end" height="350px">
            <div style="background: #00000077">
              <v-card-title v-text="jogo.nome"></v-card-title>
              <v-card-text class="detalhesjogo" style="padding-bottom: 0px">
                <p>{{jogo.nota}}</p>
                <p>{{jogo.publishers}}</p>
                <p>
                  <b>Genero:</b>
                  {{genero}}
                </p>
                <p>
                  <b>Date:</b>
                  {{jogo.data}}
                </p>
              </v-card-text>
            </div>
          </v-img>
        </v-card>
        <v-card dark class="card">
          <v-card-title primary-title>Description:</v-card-title>
          <v-card-text>
            <p v-if="jogoById == null">carregando descrição</p>
            <div v-else v-html="jogoById.descricaohtml"></div>
          </v-card-text>
        </v-card>

        <v-card dark class="card scrollhorizontal">
          <span style="font-size:22px;  padding-left:10px">
            <b>Plataforms:</b>
          </span>
          <span
            v-for="plataforma in iconePlataforma"
            :key="plataforma.id"
            style="padding-right:10px"
          >
            <v-btn icon dark>
              <v-icon>{{plataforma.icone}}</v-icon>
            </v-btn>
          </span>
        </v-card>

        <v-card dark class="card scrollhorizontal" v-if="jogoById != null">
          <span style="font-size:22px;  padding-left:10px">
            <b>Lojas:</b>
          </span>
          <span v-for="loja in iconeLojas" :key="loja.id" style="padding-right:10px;">
            <v-btn icon dark :href="loja.url" target="_blank">
              <v-icon>{{loja.icone}}</v-icon>
            </v-btn>
          </span>
        </v-card>

        <v-card dark class="card">
          <v-carousel hide-delimiters height="300">
            <v-carousel-item
              v-for="(item,i) in jogo.fotos"
              :key="i"
              :src="item.url"
              :href="item.url"
              target="_blank"
            ></v-carousel-item>
          </v-carousel>
        </v-card>
        <v-card dark class="card">
          <iframe :src="jogo.videoyoutube" frameborder="0"></iframe>
        </v-card>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
/* eslint-disable */
export default {
  name: "Detalhes",
  data() {
    return {
      jogoById: null,
      favoritoicon: "mdi-heart-outline"
    };
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
        if (i + 1 == this.jogo.generos.length)
          genero += this.jogo.generos[i].nome;
        else genero += this.jogo.generos[i].nome + " - ";
      }

      return genero;
    },
    iconePlataforma() {
      var newPlataformas = [];
      for (var i = 0; i < this.jogo.plataformas.length; i++) {
        var plataforma = {};
        plataforma.id = this.jogo.plataformas[i].id;
        plataforma.nome = this.jogo.plataformas[i].nome;
        plataforma.icone = this.retornaIconePlataforma(
          this.jogo.plataformas[i].id
        );
        newPlataformas.push(plataforma);
      }
      return newPlataformas;
    },
    iconeLojas() {
      var newlojas = [];
      for (var i = 0; i < this.jogoById.lojas.length; i++) {
        var loja = {};
        loja.id = this.jogoById.lojas[i].id;
        loja.nome = this.jogoById.lojas[i].nome;
        loja.url = this.jogoById.lojas[i].url;
        loja.icone = this.retornaIconeLoja(this.jogoById.lojas[i].id);
        newlojas.push(loja);
      }
      return newlojas;
    }
  },
  methods: {
    fechar() {
      this.$emit("cancel");
      this.jogoById = null;
    },
    retornaIconeLoja(id) {
      var icone = null;
      switch (id) {
        case 1:
          icone = "mdi-steam";
          break;
        case 3:
          icone = "mdi-sony-playstation";
          break;
        case 2:
          icone = "mdi-microsoft-xbox";
          break;
        case 6:
          icone = "mdi-nintendo-switch";
          break;

        default:
          icone = "mdi-gamepad-square";
          break;
      }
      return icone;
    },
    retornaIconePlataforma(id) {
      var icone = null;
      switch (id) {
        case 4:
          icone = "mdi-steam";
          break;
        case 18:
          icone = "mdi-sony-playstation";
          break;
        case 1:
          icone = "mdi-microsoft-xbox";
          break;
        case 7:
          icone = "mdi-nintendo-switch";
          break;

        default:
          icone = "mdi-gamepad-square";
          break;
      }
      return icone;
    },
    async carregarJogo() {
      await this.$store.dispatch(
        "listarJogos/REQUEST_JOGO_BY_ID",
        this.jogo.id
      );
      this.jogoById = this.$store.state.listarJogos.GET_JOGO_BY_ID;
    },
    salvar() {
      if (localStorage["jogo-"+this.jogo.id]){
        localStorage.removeItem("jogo-"+this.jogo.id)
        this.favoritoicon = "mdi-heart-outline"
      }
      else{
      localStorage["jogo-"+this.jogo.id] = JSON.stringify(this.jogo)
      this.favoritoicon = "mdi-heart"
      }
    }
  },
  updated() {
    if (this.jogo != null && this.dialogDetalhes && this.jogoById == null){
      document.getElementsByClassName('v-dialog v-dialog--active')[0].scrollTop = 0
      if (localStorage["jogo-"+this.jogo.id]){
        this.favoritoicon = "mdi-heart"
      }
      else{
        this.favoritoicon = "mdi-heart-outline"
      }
      this.carregarJogo();
    }
  }
};
</script>

<style>
.card {
  margin: 20px 20px 20px 20px;
  min-height: 80px;
}

.scrollhorizontal {
  overflow-x: auto;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.header-detalhe {
  position: fixed;
  z-index: 1;
  width: 100%;
  max-width: 700px;
  margin-right: 0px;
  margin-left: 0px;
}
</style>