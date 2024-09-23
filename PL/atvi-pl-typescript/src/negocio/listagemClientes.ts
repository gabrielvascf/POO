import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Listagem from "./listagem";
import ListagemPets from "./listagemPet";
import ListagemServiço from "./listagemServico";
export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    private editar(): void {
        console.log(`\nEdição de clientes:`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente que deseja editar: `)
        let cliente = this.clientes.find(cliente => cliente.nome === nome)
        if (cliente) {
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            console.log(`Pets: ` + cliente.getPets);
            console.log(`Serviços consumidos: ` + cliente.getServicosConsumidos);
            console.log(`--------------------------------------`);
            console.log(`O que deseja editar?`);
            console.log(`(1) - Nome`);
            console.log(`(2) - Nome social`);
            console.log(`(3) - CPF`);
            console.log(`(4) - Pets`);
            console.log(`(5) - Serviços consumidos`);
            
            console.log(`(6) - Excluir`);
            
            let entrada = this.entrada.receberNumero(`Digite a opção desejada: `);
            switch (entrada) {
                case 1:
                    let novoNome = this.entrada.receberTexto(`Digite o novo nome: `)
                    cliente.nome = novoNome
                    break;
                case 2:
                    let novoNomeSocial = this.entrada.receberTexto(`Digite o novo nome social: `)
                    cliente.nomeSocial = novoNomeSocial
                    break;
                case 3:
                    let valor = this.entrada.receberTexto(`Digite o novo número do cpf: `);
                    let data = this.entrada.receberTexto(`Digite a nova data de emissão do cpf, no padrão dd/mm/yyyy: `);
                    let partesData = data.split('/')
                    let ano = new Number(partesData[2].valueOf()).valueOf()
                    let mes = new Number(partesData[1].valueOf()).valueOf()
                    let dia = new Number(partesData[0].valueOf()).valueOf()
                    let dataEmissao = new Date(ano, mes, dia)
                    cliente.getCpf.setValor = valor
                    cliente.getCpf.setDataEmissao = dataEmissao
                    break;
                case 4:
                    let listagemPets = new ListagemPets(cliente.getPets)
                    listagemPets.listar()
                    break;
                case 5:
                    let listagemServicos = cliente.getServicosConsumidos
                    for (let servico of listagemServicos) {
                        console.log(`Nome: ` + servico.nome)
                        console.log(`--------------------------------------`);
                    }
                    console.log(`\n`);
                    console.log(`Deseja adicionar ou remover algum serviço?`);
                    console.log(`(1) - Sim`);
                    console.log(`(2) - Não`);
                    let entrada = this.entrada.receberNumero(`Digite a opção desejada: `);
                    if (entrada === 1) {
                        for (let servico of listagemServicos) {
                            console.log(`Nome: ` + servico.nome)
                            console.log(`--------------------------------------`);
                        }
                        console.log(`\n`);
                        let servico = this.entrada.receberTexto(`Digite o nome do serviço que deseja adicionar ou remover: `)
                        let servicoEncontrado = listagemServicos.find(s => s.nome === servico)
                        if (servicoEncontrado) {
                            console.log(`Serviço encontrado!`);
                            console.log(`Nome: ` + servicoEncontrado.nome)
                            console.log(`--------------------------------------`);
                            console.log(`\n`);
                            console.log(`Deseja adicionar ou remover o serviço?`);
                            console.log(`(1) - Adicionar`);
                            console.log(`(2) - Remover`);
                            let entrada = this.entrada.receberNumero(`Digite a opção desejada: `);
                            if (entrada === 1) {
                                cliente.adicionarServico(servicoEncontrado)
                            } else if (entrada === 2) {
                                cliente.removerServico(servicoEncontrado)
                            }
                        } else {
                            console.log(`Serviço não encontrado :(`);
                        }
                    }
                case 6:
                    let index = this.clientes.indexOf(cliente)
                    this.clientes.splice(index, 1)
                    break;
                default:
                    console.log(`Operação não entendida :(`)
            }
            console.log(`\nEdição concluída :)\n`);
        } else {
            console.log(`Cliente não encontrado :(`);
        }
    }
    public listar(readonly: boolean = false): void {
        console.log(`\nLista de todos os clientes:`);
        this.clientes.forEach(cliente => {
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            console.log(`Pets: ` + cliente.getPets);
            console.log(`Serviços consumidos: ` + cliente.getServicosConsumidos);
            console.log(`Produtos consumidos: ` + cliente.getProdutosConsumidos);
            
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
        if (readonly) {
            return
        }
        console.log("Deseja realizar alguma edição?");
        console.log("(1) - Sim");
        console.log("(2) - Não");
        let entrada = this.entrada.receberNumero("Digite a opção desejada: ");
        while (entrada === 1) {
            this.editar();
            console.log("Deseja realizar outra edição?");
            console.log("(1) - Sim");
            console.log("(2) - Não");
            entrada = this.entrada.receberNumero("Digite a opção desejada: ");
        }
    }
}