import Pet from "./pet"

export default class Produto {
    public nome!: string
    public preco!: number
    public consumidor?: Pet
    // Overload signatures
    constructor();
    constructor(nome: string, preco: number);
    constructor(nome: string, preco: number, consumidor: Pet);

    // Implementation
    constructor(nome?: string, preco?: number, consumidor?: Pet) {
        this.nome = nome || '';
        this.preco = preco || 0;
        this.consumidor = consumidor || undefined;
    }
}