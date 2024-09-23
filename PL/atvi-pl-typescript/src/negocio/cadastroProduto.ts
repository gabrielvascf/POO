import Entrada from "../io/entrada";
import Produto from "../modelo/produto";
import Cadastro from "./cadastro";

export default class CadastroProduto extends Cadastro {
    private produtos: Array<Produto>
    private entrada: Entrada
    constructor(produtos: Array<Produto>) {
        super()
        this.entrada = new Entrada()
        this.produtos = produtos
    }

    cadastrar() {
        console.log(`Cadastrando produto`)
        let nome = this.entrada.receberTexto(`Digite o nome do produto: `)
        let preco = this.entrada.receberNumero(`Digite o preço do produto: `)
        let produto = new Produto()
        produto.nome = nome
        produto.preco = preco

        this.produtos.push(produto)
        console.log(`Produto cadastrado com sucesso`);
        
    }   
}