<template>
  <v-card>
    <v-img :src="carregarImagem" class="white--text align-end" height="200px" width="400px">
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
            var imagem = this.propjogo.videoimagepreview == null ? this.propjogo.background : this.propjogo.videoimagepreview
            return imagem
        }

    },
    methods: {
        
    }
};
</script>

<style>
</style>