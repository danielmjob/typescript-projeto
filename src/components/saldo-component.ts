import { formatarData } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import { formartarMoeda } from "../utils/formatters.js";
import Conta from "../types/conta.js";

const elementoSaldo = document.querySelector(
  ".saldo-valor .valor"
) as HTMLElement;

const elementoDataAcesso = document.querySelector(
  ".block-saldo time"
) as HTMLElement;

if (elementoDataAcesso != null) {
  elementoDataAcesso.textContent = formatarData(
    Conta.getDataAcesso(),
    FormatoData.DIA_SEMANA_DIA_MES_ANO
  );
}

renderizarSaldo();
function renderizarSaldo(): void {
  if (elementoSaldo != null) {
    elementoSaldo.textContent = formartarMoeda(Conta.getSaldo());
  }
}

const SaldoComponent = {
  atualizar() {
    renderizarSaldo();
  },
};

export default SaldoComponent;
