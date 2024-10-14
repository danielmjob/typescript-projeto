//apenas para estudo
let valor = 3000;
let nome = "";
let isPago = false;
let qualquer = ""; // faz com que a variavel possa receber qualquer tipo de valor
//Arrays
// se usada dessa forma vai aceitar qualquer tipo de valor
const lista = [];
lista.push("Daniel", "Cachorro", 22, true, []);
// para definir valores use
const outraLista = [];
outraLista.push(13, 22.5, 22, 89, 1.58);
// controle de valores fixos Enum
var TipoTransacao;
(function (TipoTransacao) {
    TipoTransacao["DEPOSITO"] = "Dep\u00F3sito";
    TipoTransacao["TRANSFERENCIA"] = "Transfer\u00EAncia";
    TipoTransacao["PAGAMENTO_BOLETO"] = "Pagamento de Boleto";
})(TipoTransacao || (TipoTransacao = {}));
//usando o tipo criado
const novaTransacao = {
    tipoTransacao: TipoTransacao.PAGAMENTO_BOLETO,
    data: new Date(),
    valor: 0,
};
