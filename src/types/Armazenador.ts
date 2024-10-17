export class Armazenador {
  private constructor() {}

  static salvar(chave: string, valor: any): void {
    const valorComoString = JSON.stringify(valor);
    localStorage.setItem(chave, valorComoString);
  }
  // static permite chamar um metodo sem a necessidade de estanciar a classe
  // <T> aplicação de Generics
  static obter<T>(
    chave: string,
    reviver?: (this: any, key: string, value: any) => any
  ): T | null {
    const valor = localStorage.getItem(chave);

    if (valor === null) {
      return null;
    }

    if (reviver) {
      return JSON.parse(valor, reviver) as T;
    }

    return JSON.parse(valor) as T;
  }
}
