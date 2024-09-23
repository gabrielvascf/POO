import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";
import CadastroCliente from "../negocio/cadastroCliente";
import ListagemClientes from "../negocio/listagemClientes";
import CadastroProduto from "../negocio/cadastroProduto";
import ListagemProduto from "../negocio/listagemProduto";
import CadastroServico from "../negocio/cadastroServico";
import ListagemServico from "../negocio/listagemServico";

console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinarias`)
let empresa = new Empresa()
let execucao = true

while (execucao) {
    console.log(`Opções:`);
    console.log(`1 - Cadastrar cliente`);
    console.log(`2 - Listar todos os clientes`);
    console.log(`3 - Cadastrar produto`);
    console.log(`4 - Listar todos os produtos`);
    console.log(`5 - Cadastrar serviço`);
    console.log(`6 - Listar todos os serviços`);
    console.log(`7 - Cadastrar cliente em serviço`);
    console.log(`8 - Adicionar produto à cliente`);
    console.log(`9 - Clientes com mais produtos ou serviços consumidos`);
    console.log(`10 - Serviços ou produtos mais consumidos`);

    console.log(`0 - Sair`);

    let entrada = new Entrada()
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

    switch (opcao) {
        case 1:
            let cadastro = new CadastroCliente(empresa.getClientes)
            cadastro.cadastrar()
            break;
        case 2:
            let listagem = new ListagemClientes(empresa.getClientes)
            listagem.listar()
            break;
        case 3:
            let cadastroProduto = new CadastroProduto(empresa.getProdutos)
            cadastroProduto.cadastrar()
            break;
        case 4:
            let listagemProduto = new ListagemProduto(empresa.getProdutos)
            listagemProduto.listar()
            break;
        case 5:
            let cadastroServico = new CadastroServico(empresa.getServicos)
            cadastroServico.cadastrar()
            break;
        case 6:
            let listagemServico = new ListagemServico(empresa.getServicos)
            listagemServico.listar()
            break;
        case 7:
            console.log(`Deseja ver todos os serviços?`);
            console.log(`(1) - Sim`);
            console.log(`(2) - Não`);
            opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
            if (opcao === 1) {
                let listagemServico = new ListagemServico(empresa.getServicos)
                listagemServico.listar(true)
            }
            console.log(`Deseja ver todos os clientes?`);
            console.log(`(1) - Sim`);
            console.log(`(2) - Não`);
            opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
            if (opcao === 1) {
                let listagemCliente = new ListagemClientes(empresa.getClientes)
                listagemCliente.listar(true)
            }
            let nomeCliente = entrada.receberTexto(`Digite o nome do cliente: `)
            let nomeServico = entrada.receberTexto(`Digite o nome do serviço: `)
            let cliente = empresa.getClientes.find(cliente => cliente.nome === nomeCliente)
            let servico = empresa.getServicos.find(servico => servico.nome === nomeServico)
            if (cliente && servico) {
                cliente.adicionarServico(servico)
            } else {
                console.log(`Cliente ou serviço não encontrado :(`);
            }
            break;
        case 8:
            console.log(`Deseja ver todos os serviços?`);
            console.log(`(1) - Sim`);
            console.log(`(2) - Não`);
            opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
            if (opcao === 1) {
                let listagemServico = new ListagemServico(empresa.getServicos)
                listagemServico.listar(true)
            }
            console.log(`Deseja ver todos os produtos?`);
            console.log(`(1) - Sim`);
            console.log(`(2) - Não`);
            opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
            if (opcao === 1) {
                let listagemProduto = new ListagemProduto(empresa.getProdutos)
                listagemProduto.listar(true)
            }
            nomeCliente = entrada.receberTexto(`Digite o nome do cliente: `)
            let nomeProduto = entrada.receberTexto(`Digite o nome do produto: `)
            cliente = empresa.getClientes.find(cliente => cliente.nome === nomeCliente)
            let produto = empresa.getProdutos.find(produto => produto.nome === nomeProduto)
            if (cliente && produto) {
                cliente.adicionarProduto(produto)
            } else {
                console.log(`Cliente ou produto não encontrado :(`);
            }
            break;
        case 9:
            let clientes = empresa.getClientes
            console.log(`Deseja ordenar por: `);
            console.log(`(1) - Quantidade de produtos: `);
            console.log(`(2) - Quantidade de serviços: `);
            console.log(`(3) - Quantidade de serviços e produtos: `);
            opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
            switch (opcao) {
                case 1:
                    clientes.sort((a, b) => a.getProdutosConsumidos.length - b.getProdutosConsumidos.length)
                    break;
                case 2:
                    clientes.sort((a, b) => a.getServicosConsumidos.length - b.getServicosConsumidos.length)
                    break;
                case 3:
                    clientes.sort((a, b) => (a.getProdutosConsumidos.length + a.getServicosConsumidos.length) - (b.getProdutosConsumidos.length + b.getServicosConsumidos.length))
                    break;
            }
            let i = 0
            for (cliente of clientes) {
                console.log(`Nome: ` + cliente.nome);
                console.log(`Valor total gasto: ` + cliente.getGastos("total"));
                console.log(`Valor gasto em produtos: ` + cliente.getGastos("produtos"));
                console.log(`Valor gasto em serviços: ` + cliente.getGastos("serviços"));
                i++
                if (i == 10) {
                    break
                }
            }
        case 10:
            clientes = empresa.getClientes
            let itens = []
            console.log(`Deseja ordenar por: `);
            console.log(`(1) - Produtos: `);
            console.log(`(2) - Serviços: `);
            console.log(`(3) - Total: `);
            opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

            itens = opcao === 1 ? empresa.getProdutos : opcao === 2 ? empresa.getServicos : empresa.getProdutos.concat(empresa.getServicos) // O QUE É ISSO

            itens = itens.map(item => {
                return {item: item, total: 0, preco: item.preco}
            })

            for (cliente of clientes) {
                for (let item of itens) {
                    if (cliente.getProdutosConsumidos.includes(item.item) || cliente.getServicosConsumidos.includes(item.item)) {
                        item.total++
                    }
                }
            }
            itens.sort((a, b) => a.total - b.total)
            for (let item of itens) {
                console.log(`Nome: ` + item.item.nome);
                console.log(`Número de clientes: ` + item.total);
                console.log(`Preço por item: ` + item.preco);
                console.log(`-----------------`);
            }
        case 0:
            execucao = false
            console.log(`Até mais`)
            console.log(empresa);

            break;
        default:
            console.log(`Operação não entendida :(`)
    }
}