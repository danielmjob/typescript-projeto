export class Armazenador {
  private constructor() {}

  static salvar(chave: string, valor: any): void {
    const valorComoString = JSON.stringify(valor);
    localStorage.setItem(chave, valorComoString);
  }
  // static permite chamar um metodo sem a necessidade de estanciar a classe
  static obter(
    chave: string,
    reviver?: (this: any, key: string, value: any) => any
  ) {
    const valor = localStorage.getItem(chave);

    if (valor === null) {
      return null;
    }

    if (reviver) {
      return JSON.parse(valor, reviver);
    }

    return JSON.parse(valor);
  }
}
