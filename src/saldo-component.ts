let saldo: number = 3000;

const elementoSaldo = document.querySelector(
  ".saldo-valor .valor"
) as HTMLElement;

if (elementoSaldo != null) {
  elementoSaldo.textContent = saldo.toLocaleString("pt-br", {
    currency: "BRL",
    style: "currency",
  });
}

const elementoDataAcesso = document.querySelector(
  ".block-saldo time"
) as HTMLElement;

if (elementoDataAcesso != null) {
  const dataAcesso: Date = new Date();
  elementoDataAcesso.textContent = dataAcesso.toLocaleDateString("pt-br", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const elementoFormulario = document.querySelector(
  ".block-nova-transacao form"
) as HTMLFormElement;

// sempre ao alterar o codigo em ts necessário recompilar comando: tsc bytebank.ts
// ATUALIZAÇÃO >> após criação do tsconfig.json necessário apenas usar o comando: tsc -w assim ele irá criar de forma automatica
