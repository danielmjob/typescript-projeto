//apenas para estudo
/*
let valor = 3000;
let nome: string = "";
let isPago: boolean = false;
let qualquer: any = ""; // faz com que a variavel possa receber qualquer tipo de valor

//Arrays
// se usada dessa forma vai aceitar qualquer tipo de valor
const lista = [];
lista.push("Daniel", "Cachorro", 22, true, []);

// para definir valores use
const outraLista: number[] = [];
outraLista.push(13, 22.5, 22, 89, 1.58);

// Tipos personalizados (Type Alias)
// faz com que seja respeitada a estrutura e tipagem de cada um
// criando um tipo
type Transacao = {
  tipoTransacao: TipoTransacao;
  data: Date;
  valor: number;
};

// controle de valores fixos Enum

enum TipoTransacao {
  DEPOSITO = "Depósito",
  TRANSFERENCIA = "Transferência",
  PAGAMENTO_BOLETO = "Pagamento de Boleto",
}

//usando o tipo criado

const novaTransacao: Transacao = {
  tipoTransacao: TipoTransacao.PAGAMENTO_BOLETO,
  data: new Date(),
  valor: 0,
};

console.log(novaTransacao);
*/
