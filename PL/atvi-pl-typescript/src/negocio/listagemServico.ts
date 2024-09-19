import Listagem from "./listagem";
import Servico from "../modelo/servico";
import Entrada from "../io/entrada";

export default class ListagemServiço extends Listagem {
    servicos: Array<Servico>
    entrada: Entrada
    constructor(servicos: Array<Servico>) {
        super()
        this.entrada = new Entrada()
        this.servicos = servicos
    }

    editar() {
        let nome = this.entrada.receberTexto(`Digite o nome do serviço que deseja editar: `)
        let servico = this.servicos.find(servico => servico.nome === nome)
        if (servico) {
            console.log(`Serviço encontrado!`);
            console.log(`Nome: ` + servico.nome)
            console.log(`--------------------------------------`);
            console.log(`\n`);
            console.log(`Deseja editar o serviço?`);
            console.log(`(1) - Sim`);
            console.log(`(2) - Não`);
            let entrada = this.entrada.receberNumero(`Digite a opção desejada: `);
            if (entrada === 1) {
                let novoNome = this.entrada.receberTexto(`Digite o novo nome do serviço: `)
                servico.nome = novoNome
                console.log(`Serviço editado com sucesso!`);
            }
        } else {
            console.log(`Serviço não encontrado :(`);
        }
    }

    listar(readonly: boolean = false) {
        console.log(`\Lista de todos os serviços:`)
        for (let servico of this.servicos) {
            console.log(`Nome: ` + servico.nome)
            console.log(`--------------------------------------`);
        }
        if (readonly) {
            return
        }
        console.log(`\n`);
        console.log(`Deseja editar algum serviço?`);
        console.log(`(1) - Sim`);
        console.log(`(2) - Não`);
        let entrada = this.entrada.receberNumero(`Digite a opção desejada: `);
        if (entrada === 1) {
            this.editar()
        }

    }
}