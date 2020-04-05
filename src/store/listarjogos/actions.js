import axios from "axios";
const urlBase = "https://arcadaweb.com.br/api/gamerelease/listagames.php?"
export default {
    async REQUEST_JOGOS(context, payload) {
        context.commit('SET_CARREGANDO', true)
        var listaAtual = context.state.GET_LISTAGEM_JOGOS
        await axios
            .get(urlBase + payload)
            .then(response => {
                // JSON responses are automatically parsed.
                context.commit('SET_NEXT', response.data.next)
                if (listaAtual.length > 0) {
                    response.data.retorno.forEach(element => {
                        listaAtual.push(element);
                    });
                    context.commit('SET_LISTAGEM_JOGOS', listaAtual)
                } else {
                    context.commit('SET_LISTAGEM_JOGOS', response.data.retorno)
                }
                context.commit('SET_CARREGANDO', false)
            })
            .catch(e => {
                context.commit('SET_CARREGANDO', false)
                console.log(e);
            });
    },

    async REQUEST_JOGO_BY_ID(context, payload) {
        await axios
            .get(`${urlBase}id=${payload}`)
            .then(response => {
                // JSON responses are automatically parsed.
                context.commit('SET_JOGO_BY_ID', response.data)
                // context.commit('SET_CARREGANDO', false)
            })
            .catch(e => {
                // context.commit('SET_CARREGANDO', false)
                context.commit('SET_JOGO_BY_ID', "")
                console.log(e);
            });
    }
}