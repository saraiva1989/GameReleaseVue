<template>
<div>
  <p>favorites {{this.$store.state.listarJogos.abc}}</p>
  <p>favorites {{abc}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
name: 'Favorites',
data(){
  return{

  }
},
computed: {
  ...mapState('listarJogos', ['abc'])
}
  

}
</script>

<style>

</style>