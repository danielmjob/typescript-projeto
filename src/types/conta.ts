import { Armazenador } from "./Armazenador.js";
import { ValidaDebito, ValidaDeposito } from "./Decorators.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

export class Conta {
  protected nome: string;
  protected saldo: number = Armazenador.obter<number>("saldo") || 0;
  private transacoes: Transacao[] =
    Armazenador.obter<Transacao[]>("transacoes", (key: string, value: any) => {
      if (key === "data") {
        return new Date(value);
      }
      return value;
    }) || [];

  constructor(nome: string) {
    this.nome = nome;
  }

  public getTitular() {
    return this.nome;
  }

  getGruposTransacoes(): GrupoTransacao[] {
    const gruposTransacoes: GrupoTransacao[] = [];
    const listaTransacoes: Transacao[] = structuredClone(this.transacoes); // structuredClone() clona a lista para que não possa ser alterada a lista original
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
  }

  getSaldo() {
    return this.saldo;
  }

  getDataAcesso() {
    return new Date();
  }

  registrarTransacao(novaTransacao: Transacao): void {
    if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
      this.depositar(novaTransacao.valor);
    } else if (
      novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA ||
      novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO
    ) {
      this.debitar(novaTransacao.valor);
      novaTransacao.valor *= -1; // para mostrar como debito com negativo
    } else {
      throw new Error("Tipo de Transação é inválido!");
    }

    this.transacoes.push(novaTransacao);
    console.log(this.getGruposTransacoes());
    Armazenador.salvar("transacoes", JSON.stringify(this.transacoes));
  }
  @ValidaDebito // Decorators.ts
  debitar(valor: number): void {
    this.saldo -= valor;
    Armazenador.salvar("saldo", this.saldo.toString()); // altera o dado no local storage
  }

  @ValidaDeposito // Decorators.ts
  depositar(valor: number): void {
    this.saldo += valor;
    Armazenador.salvar("saldo", this.saldo.toString()); // altera o dado no local storage
  }
}

export class ContaPremium extends Conta {
  registrarTransacao(transacao: Transacao): void {
    if (transacao.tipoTransacao === TipoTransacao.DEPOSITO) {
      console.log("Ganhou um bônus de 0.50 centavos");
      transacao.valor += 0.5;
    }
    super.registrarTransacao(transacao); // super -  chama o metodo da classe herdada
  }
}

const conta = new Conta("Joana da Silva Oliveira");
const contaPremium = new ContaPremium("Daniel M. Santos");
export default conta;
