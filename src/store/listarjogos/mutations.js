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

export default {
    SET_LISTAGEM_JOGOS,
    SET_CARREGANDO,
    SET_NEXT,
}