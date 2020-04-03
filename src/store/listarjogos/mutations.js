/* eslint-disable */
const consoleSelected = (state) => {
    debugger
    state.consoleSelected.nome = state.consoleSelected.nome 
    state.consoleSelected.id = state.consoleSelected.id
}

const searchName = (state, payload) => {
    state.searchName = payload
}


export default {
    consoleSelected,
    searchName
}