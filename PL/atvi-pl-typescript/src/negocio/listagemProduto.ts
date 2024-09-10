import Entrada from "../io/entrada";
import Produto from "../modelo/produto";
import Listagem from "./listagem";

export default class ListagemProduto extends Listagem {
    produtos: Array<Produto>
    entrada: Entrada
    constructor(produtos: Array<Produto>) {
        super()
        this.entrada = new Entrada()
        this.produtos = produtos
    }

    editar() {
        let nome = this.entrada.receberTexto(`Digite o nome do produto que deseja editar: `)
        let produto = this.produtos.find(produto => produto.nome === nome)
        if (produto) {
            console.log(`Produto encontrado!`);
            console.log(`Nome: ` + produto.nome)
            console.log(`--------------------------------------`);
            console.log(`\n`);
            console.log(`Deseja editar o produto?`);
            console.log(`(1) - Sim`);
            console.log(`(2) - Não`);
            let entrada = this.entrada.receberNumero(`Digite a opção desejada: `);
            if (entrada === 1) {
                let novoNome = this.entrada.receberTexto(`Digite o novo nome do produto: `)
                produto.nome = novoNome
                console.log(`Produto editado com sucesso!`);
            }
        } else {
            console.log(`Produto não encontrado :(`);
        }
    }

    listar() {
        console.log(`\Lista de todos os produtos:`)
        for (let produto of this.produtos) {
            console.log(`Nome: ` + produto.nome)
            console.log(`--------------------------------------`);
        }
        console.log(`\n`);
        console.log(`Deseja editar algum produto?`);
        console.log(`(1) - Sim`);
        console.log(`(2) - Não`);
        let entrada = this.entrada.receberNumero(`Digite a opção desejada: `);
        if (entrada === 1) {
            this.editar()
        }

    }
}