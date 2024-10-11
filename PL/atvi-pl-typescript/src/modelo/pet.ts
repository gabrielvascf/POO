export default class Pet {
    private nome: string
    private tipo: string
    private raca: string

    constructor(nome: string, raca: string, tipo: string) {
        this.nome = nome
        this.raca = raca
        this.tipo = tipo
    }

    public get getNome(){return this.nome}
    public get getRaca(){return this.raca}
    public get getTipo(){return this.tipo}

    public set setNome(nome: string){this.nome = nome}
    public set setRaca(raca: string){this.raca = raca}
    public set setTipo(tipo: string){this.tipo = tipo}
}