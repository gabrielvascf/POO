import Listagem from "./listagem";
import Entrada from "../io/entrada";
import Pet from "../modelo/pet";

export default class ListagemPets extends Listagem {
    private entrada: Entrada
    private pets: Array<Pet>
    constructor(pets: Array<Pet>) {
        super()
        this.entrada = new Entrada()
        this.pets = []
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro do pet`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do pet: `)
        let tipo = this.entrada.receberTexto(`Por favor informe o tipo do pet: `)
        let raca = this.entrada.receberTexto(`Por favor informe a raça do pet: `)
        let genero = this.entrada.receberTexto(`Por favor informe o gênero do pet: `)
        let pet = new Pet(nome, raca, genero, tipo);
        this.pets.push(pet)
        console.log(`\nCadastro concluído :)\n`);
    }

    private editar(): void {
        console.log(`\nEdição de pets:`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do pet que deseja editar: `)
        let pet = this.pets.find(pet => pet.getNome === nome)
        if (pet) {
            console.log(`Nome: ` + pet.getNome);
            console.log(`Tipo: ` + pet.getTipo);
            console.log(`Raça: ` + pet.getRaca);
            console.log(`Gênero: ` + pet.getGenero);
            console.log(`--------------------------------------`);
            console.log(`O que deseja editar?`);
            console.log(`(1) - Nome`);
            console.log(`(2) - Tipo`);
            console.log(`(3) - Raça`);
            console.log(`(4) - Gênero`);
            console.log(`(5) - Excluir`);
            let entrada = this.entrada.receberNumero(`Digite a opção desejada: `);
            switch (entrada) {
                case 1:
                    let novoNome = this.entrada.receberTexto(`Digite o novo nome: `)
                    pet.setNome = novoNome
                    break;
                case 2:
                    let novoTipo = this.entrada.receberTexto(`Digite o novo tipo: `)
                    pet.setTipo = novoTipo
                    break;
                case 3:
                    let novaRaca = this.entrada.receberTexto(`Digite a nova raça: `)
                    pet.setRaca = novaRaca
                    break;
                case 4:
                    let novoGenero = this.entrada.receberTexto(`Digite o novo gênero: `)
                    pet.setGenero = novoGenero
                    break;
                case 5:
                    let index = this.pets.indexOf(pet)
                    this.pets.splice(index, 1)
                    break;
                default:
                    console.log(`Operação não entendida :(`)
            }
            console.log(`\nEdição concluída :)\n`);
        } else {
            console.log(`Pet não encontrado :(`);
        }
    }

    public listar(): void {
        console.log("Lista de todos os pets do cliente:");
        console.log("--------------------------------------");
        this.pets.forEach(pet => {
            console.log(`Nome: ` + pet.getNome);
            console.log(`Tipo: ` + pet.getTipo);
            console.log(`Raça: ` + pet.getRaca);
            console.log(`Gênero: ` + pet.getGenero);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
        console.log(`Deseja realizar alguma edição?`);
        console.log(`(1) - Sim`);
        console.log(`(2) - Não`);
        console.log(`(3) - Cadastrar novo pet`);
        let entrada = this.entrada.receberNumero(`Digite a opção desejada: `);
        switch (entrada) {
            case 1:
                this.editar()
                break;
            case 2:
                break;
            case 3:
                this.cadastrar()
                break;
            default:
                console.log(`Operação não entendida :(`)
        }

    }

}