let saldo = 3000;
const elementoSaldo = document.querySelector(".saldo-valor .valor");
if (elementoSaldo != null) {
    elementoSaldo.textContent = saldo.toString();
}
const elementoFormulario = document.querySelector(".block-nova-transacao form");
// sempre ao alterar o codigo em ts necessário recompilar comando: tsc bytebank.ts
// ATUALIZAÇÃO >> após criação do tsconfig.json necessário apenas usar o comando: tsc -w assim ele irá criar de forma automatica
