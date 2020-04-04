/* eslint-disable */
const SET_CONSOLE_SELECTED = (state, payload) => {
    state.GET_CONSOLE_SELECTED.nome = payload.nome 
    state.GET_CONSOLE_SELECTED.id = payload.id
}

const SET_SEARCH_NAME = (state, payload) => {
    state.GET_SEARCH_NAME = payload
}

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
    SET_CONSOLE_SELECTED,
    SET_SEARCH_NAME,
    SET_LISTAGEM_JOGOS,
    SET_CARREGANDO,
    SET_NEXT,
}