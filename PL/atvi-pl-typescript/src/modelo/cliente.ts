import CPF from "./cpf"
import Pet from "./pet"
import Produto from "./produto"
import RG from "./rg"
import Servico from "./servico"
import Telefone from "./telefone"

export default class Cliente {
    public nome: string
    public nomeSocial: string
    private cpf: CPF
    private rgs: Array<RG>
    private dataCadastro: Date
    private telefones: Array<Telefone>
    private produtosConsumidos: Array<Produto>
    private servicosConsumidos: Array<Servico>
    private pets: Array<Pet>
    constructor(nome: string, nomeSocial: string, cpf: CPF) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.cpf = cpf
        this.rgs = []
        this.dataCadastro = new Date()
        this.telefones = []
        this.produtosConsumidos = []
        this.servicosConsumidos = []
        this.pets = []
    }
    public get getCpf(): CPF {
        return this.cpf
    }
    public get getRgs(): Array<RG> {
        return this.rgs
    }
    public get getDataCadastro(): Date {
        return this.dataCadastro
    }
    public get getTelefones(): Array<Telefone> {
        return this.telefones
    }
    public get getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos
    }
    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos
    }
    public get getPets(): Array<Pet>{
        return this.pets
    }
    public adicionarServico(servico: Servico): void {
        this.servicosConsumidos.push(servico);
    }
    public removerServico(servico: Servico): void {
        const index = this.servicosConsumidos.indexOf(servico);
        if (index > -1) {
            this.servicosConsumidos.splice(index, 1);
        }
    }
    public adicionarProduto(produto: Produto): void {
        this.produtosConsumidos.push(produto);
    }
    public removerProduto(produto: Produto): void {
        const index = this.produtosConsumidos.indexOf(produto);
        if (index > -1) {
            this.produtosConsumidos.splice(index, 1);
        }
    }
    public getGastos(escopo: "produtos" | "serviços"): number {
        let total = 0
        // TODO: ADICIONAR PREÇO NOS PRODUTOS E SERVIÇOS
        if (escopo === "produtos") {
            this.produtosConsumidos.forEach(produto => {
                total += produto.getPreco
            })
        } else if (escopo === "serviços") {
            this.servicosConsumidos.forEach(servico => {
                total += servico.getPreco
            })
        }
        return total
    }
}