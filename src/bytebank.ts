let saldo = 3000;

const elementoSaldo = document.querySelector(
  ".saldo-valor .valor"
) as HTMLElement;

if (elementoSaldo != null) {
  elementoSaldo.textContent = saldo.toString();
}

const elementoFormulario = document.querySelector(
  ".block-nova-transacao form"
) as HTMLFormElement;
elementoFormulario.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!elementoFormulario.checkValidity()) {
    alert("Por favor, preencha todos os campos da transação!");
    return;
  }

  const inputTipoTransacao = elementoFormulario.querySelector(
    "#tipoTransacao"
  ) as HTMLSelectElement;
  const inputValor = elementoFormulario.querySelector(
    "#valor"
  ) as HTMLInputElement;
  const inputData = elementoFormulario.querySelector(
    "#data"
  ) as HTMLInputElement;

  let tipoTransacao: String = inputTipoTransacao.value;
  let valor: number = inputValor.valueAsNumber;
  let data: Date = new Date(inputData.value);

  if (tipoTransacao == "Depósito") {
    saldo += valor;
  } else if (
    tipoTransacao == "Transferência" ||
    tipoTransacao == "Pagamento de Boleto"
  ) {
    saldo -= valor;
  } else {
    alert("Tipo de Transação é invalido!");
    return;
  }

  elementoSaldo.textContent = saldo.toString();

  const novaTransacao = {
    tipoTransacao: tipoTransacao,
    valor: valor,
    data: data,
  };

  console.log(novaTransacao);
  elementoFormulario.reset();
});

// sempre ao alterar o codigo em ts necessário recompilar comando: tsc bytebank.ts
// ATUALIZAÇÃO >> após criação do tsconfig.json necessário apenas usar o comando: tsc -w assim ele irá criar de forma automatica
