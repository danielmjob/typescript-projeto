import { formatarData } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import { formartarMoeda } from "../utils/formatters.js";

let saldo: number = 3000;

const elementoSaldo = document.querySelector(
  ".saldo-valor .valor"
) as HTMLElement;

const elementoDataAcesso = document.querySelector(
  ".block-saldo time"
) as HTMLElement;

if (elementoSaldo != null) {
  elementoSaldo.textContent = formartarMoeda(saldo);
}

if (elementoDataAcesso != null) {
  const dataAcesso: Date = new Date();
  elementoDataAcesso.textContent = formatarData(
    dataAcesso,
    FormatoData.DIA_SEMANA_DIA_MES_ANO
  );
}

const elementoFormulario = document.querySelector(
  ".block-nova-transacao form"
) as HTMLFormElement;

// sempre ao alterar o codigo em ts necessário recompilar comando: tsc bytebank.ts
// ATUALIZAÇÃO >> após criação do tsconfig.json necessário apenas usar o comando: tsc -w assim ele irá criar de forma automatica
