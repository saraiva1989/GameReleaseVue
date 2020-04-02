<template>
  <v-card>
    <v-img :src="carregarImagem" class="white--text align-end" height="200px">
      <v-card-title v-text="propjogo.nome"></v-card-title>
    </v-img>
  </v-card>
</template>

<script>
export default {
    name: 'CardJogo',
    props: ['propjogo'],
    data() {
        return {
            urlImagem: null
        }
    },
    computed: {
        carregarImagem() {
            var imagem = this.propjogo.videoimagepreview != null ? 
            this.propjogo.videoimagepreview : this.propjogo.background != null ? this.propjogo.background :
            "https://arcadaweb.com.br/img/cardnotfound.jpg"
            return imagem
        }

    },
    methods: {
        
    }
};
</script>

<style>
</style>