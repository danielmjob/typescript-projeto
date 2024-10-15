import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { GrupoTransacao } from "./GrupoTransacao.js";

let saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0; // PEGA O SALDO DO LOCAL STORAGE SE NÃO HOUVER SALDO ELE INICIA COM 0
const transacoes: Transacao[] =
  JSON.parse(
    localStorage.getItem("transacoes"),
    (key: string, value: string) => {
      if (key === "data") {
        return new Date(value);
      }

      return value;
    }
  ) || []; // TRANSFORMA OS DADOS EM JSON - para guardar no Local Storage dentro de inspecionar é possivel ver

function debitar(valor: number): void {
  if (valor <= 0) {
    throw new Error("O valor a ser debitado deve ser maior que zero!");
  }

  if (valor > saldo) {
    throw new Error("Saldo insuficiente!");
  }

  saldo -= valor;
  localStorage.setItem("saldo", saldo.toString()); // altera o dado no local storage
}

function depositar(valor: number): void {
  if (valor <= 0) {
    throw new Error("O valor a ser depositado deve ser maior que zero!");
  }

  saldo += valor;
  localStorage.setItem("saldo", saldo.toString()); // altera o dado no local storage
}

const Conta = {
  getSaldo() {
    return saldo;
  },

  getDataAcesso(): Date {
    return new Date();
  },

  getGruposTransacoes(): GrupoTransacao[] {
    const gruposTransacoes: GrupoTransacao[] = [];
    const listaTransacoes: Transacao[] = structuredClone(transacoes); // structuredClone() clona a lista para que não possa ser alterada a lista original
    const transacoesOrdenandas: Transacao[] = listaTransacoes.sort(
      (t1, t2) => t2.data.getTime() - t1.data.getTime()
    ); // ordenando atraves da comparação via sort
    let labelAtualGrupoTransacao: string = "";

    for (let transacao of transacoesOrdenandas) {
      let labelGrupoTransacao: string = transacao.data.toLocaleDateString(
        "pt-br",
        { month: "long", year: "numeric" }
      );
      if (labelAtualGrupoTransacao != labelGrupoTransacao) {
        labelAtualGrupoTransacao = labelGrupoTransacao;

        gruposTransacoes.push({
          label: labelGrupoTransacao,
          transacoes: [],
        });
      }
      gruposTransacoes.at(-1).transacoes.push(transacao);
    }
    return gruposTransacoes;
  },

  registrarTransacao(novaTransacao: Transacao): void {
    if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
      depositar(novaTransacao.valor);
    } else if (
      novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA ||
      novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO
    ) {
      debitar(novaTransacao.valor);
    } else {
      throw new Error("Tipo de Transação é inválido!");
    }

    transacoes.push(novaTransacao);
    console.log(this.getGruposTransacoes());
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
  },
};

export default Conta;
