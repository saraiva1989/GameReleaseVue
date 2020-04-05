/* eslint-disable */
const SET_LISTAGEM_JOGOS = (state, payload) => {
    state.GET_LISTAGEM_JOGOS = payload
}
const SET_NEXT = (state, payload) => {
    state.GET_NEXT = payload
}
const SET_CARREGANDO = (state, payload) => {
    state.GET_CARREGANDO = payload
}

const SET_JOGO_BY_ID = (state, payload) => {
    state.GET_JOGO_BY_ID = payload
}

export default {
    SET_LISTAGEM_JOGOS,
    SET_CARREGANDO,
    SET_NEXT,
    SET_JOGO_BY_ID,
}