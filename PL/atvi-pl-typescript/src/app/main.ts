import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";
import CadastroCliente from "../negocio/cadastroCliente";
import ListagemClientes from "../negocio/listagemClientes";
import CadastroProduto from "../negocio/cadastroProduto";
import ListagemProduto from "../negocio/listagemProduto";
import CadastroServico from "../negocio/cadastroServico";
import ListagemServico from "../negocio/listagemServico";
import ListagemPets from "../negocio/listagemPet";
import Servico from "../modelo/servico";
import CPF from "../modelo/cpf";
import Cliente from "../modelo/cliente";
import Pet from "../modelo/pet";
import Produto from "../modelo/produto";

const DEBUG = true

console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinarias`)
let empresa = new Empresa()
let execucao = true

if (DEBUG) {
    let clie = new Cliente("João", "João da Silva", new CPF("12345678900", new Date(2020, 1, 1)))
    empresa.getClientes.push(clie)
    clie.getPets.push(new Pet("Rex", "Vira-lata", "Cachorro"))
    clie.getPets.push(new Pet("Mia", "Vira-lata", "Gato"))
    empresa.getServicos.push(new Servico("Banho", 50))
    empresa.getProdutos.push({ nome: "Ração", preco: 100 })
}

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
            let servico = empresa.getServicos.find(servico => servico.nome === entrada.receberTexto(`Digite o nome do serviço: `))
            let cliente = empresa.getClientes.find(cliente => cliente.nome === entrada.receberTexto(`Digite o nome do cliente: `))
            if (cliente && servico) {
                let listagemPets = new ListagemPets(cliente.getPets)
                listagemPets.listar(true)
                console.log("Para qual pet deseja cadastrar o serviço?");
                let pet = cliente.getPets.find(pet => pet.getNome === entrada.receberTexto(`Digite o nome do pet: `))
                if (pet) {
                    cliente.adicionarServico(new Servico(servico.nome, servico.preco, pet))
                } else {
                    console.log(`Pet não encontrado :(`);
                }
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
            let nomeCliente = entrada.receberTexto(`Digite o nome do cliente: `)
            let nomeProduto = entrada.receberTexto(`Digite o nome do produto: `)
            let clienteEncontrado = empresa.getClientes.find(cliente => cliente.nome === nomeCliente)
            let produto = empresa.getProdutos.find(produto => produto.nome === nomeProduto)
            if (clienteEncontrado && produto) {
                console.log(`Para qual pet deseja adicionar o produto?`);
                let listagemPets = new ListagemPets(clienteEncontrado.getPets)
                listagemPets.listar()
                let pet = clienteEncontrado.getPets.find(pet => pet.getNome === entrada.receberTexto(`Digite o nome do pet: `))
                if (pet) {
                    clienteEncontrado.adicionarProduto(new Produto(produto.nome, produto.preco, pet))
                } else {
                    console.log(`Pet não encontrado :(`);
                }
            } else {
                console.log(`Cliente ou produto não encontrado :(`);
            }
            break;
        case 9:
            let clientesOrdenados = empresa.getClientes
            console.log(`Deseja ordenar por: `);
            console.log(`(1) - Quantidade de produtos: `);
            console.log(`(2) - Quantidade de serviços: `);
            console.log(`(3) - Quantidade de serviços e produtos: `);
            opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
            switch (opcao) {
                case 1:
                    clientesOrdenados.sort((a, b) => a.getProdutosConsumidos.length - b.getProdutosConsumidos.length)
                    break;
                case 2:
                    clientesOrdenados.sort((a, b) => a.getServicosConsumidos.length - b.getServicosConsumidos.length)
                    break;
                case 3:
                    clientesOrdenados.sort((a, b) => (a.getProdutosConsumidos.length + a.getServicosConsumidos.length) - (b.getProdutosConsumidos.length + b.getServicosConsumidos.length))
                    break;
            }
            let i = 0
            for (let cliente of clientesOrdenados) {
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
            let clientes = empresa.getClientes
            let itens: { item: any; total: any; preco: any; }[] = []
            console.log(`Deseja ordenar por: `);
            console.log(`(1) - Raças mais consumidoras: `);
            console.log(`(2) - Tipos mais consumidores: `);
            console.log(`(3) - Produtos mais consumidos: `);
            console.log(`(4) - Serviços mais consumidos: `);

            opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

            switch (opcao) {
                case 1:
                    for (let cliente of clientes) {
                        for (let pet of cliente.getPets) {
                            let item = itens.find(item => item.item === pet.getRaca)
                            if (item) {
                                item.total++
                            } else {
                                itens.push({ item: pet.getRaca, total: 1, preco: 0 })
                            }
                        }
                    }
                    break;
                case 2:
                    for (let cliente of clientes) {
                        for (let pet of cliente.getPets) {
                            let item = itens.find(item => item.item === pet.getTipo)
                            if (item) {
                                item.total++
                            } else {
                                itens.push({ item: pet.getTipo, total: 1, preco: 0 })
                            }
                        }
                    }
                    break;
                case 3:
                    itens = empresa.getProdutos.map(produto => {
                        return { item: produto.nome, total: 0, preco: produto.preco }
                    })
                    for (let cliente of clientes) {
                        for (let produto of cliente.getProdutosConsumidos) {
                            let item = itens.find(item => item.item === produto.nome)
                            if (item) {
                                item.total++
                            }
                        }
                    }
                    break;
                case 4:
                    itens = empresa.getServicos.map(servico => {
                        return { item: servico.nome, total: 0, preco: servico.preco }
                    })
                    for (let cliente of clientes) {
                        for (let servico of cliente.getServicosConsumidos) {
                            let item = itens.find(item => item.item === servico.nome)
                            if (item) {
                                item.total++
                            }
                        }
                    }
                    break;
            }
            itens = itens.map(item => {
                return { item: item, total: 0, preco: item.preco }
            })

            for (let cliente of clientes) {
                for (let item of itens) {
                    if (cliente.getProdutosConsumidos.includes(item.item) || cliente.getServicosConsumidos.includes(item.item)) {
                        item.total++
                    }
                }
            }
            itens.sort((a, b) => a.total - b.total)
            for (let item of itens) {
                console.log(`Item: ` + item.item.item);
                console.log(`Total: ` + item.total);
                console.log(`Preço: ` + item.item.preco);
                console.log(`--------------------------------------`);
            }
            break
        case 0:
            execucao = false
            console.log(`Até mais`)
            console.log(empresa);

            break;
        default:
            console.log(`Operação não entendida :(`)
    }
}