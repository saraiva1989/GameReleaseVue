import Vue from 'vue'
import Vuex from 'vuex'
//importa o caminho do modulo (organização por pasta)
import listarJogos from './listarjogos/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {

  },
  actions: {

  },
  getters: {

  },
  modules: {
    //informa o nome do modulo importado
    listarJogos
  }
})
