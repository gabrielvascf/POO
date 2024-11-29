import Cliente from "../types/cliente";
import Pet from "../types/pet";
import Produto from "../types/produto";
import Servico from "../types/servico";

class Banco {
  Clientes: Cliente[] = [];
  Pets: Pet[] = [];
  Servicos: Servico[] = [];
  Produtos: Produto[] = [];

  addCliente(cliente: Cliente) {
    cliente.id = this.Clientes.length + 1;
    this.Clientes.push(cliente);
  }
  removeCliente(id: number) {
    const index = this.Clientes.findIndex((cliente) => cliente.id === id);
    this.Clientes.splice(index, 1);
  }
  addPet(pet: Pet) {
    pet.id = this.Pets.length + 1;
    this.Pets.push(pet);
  }
  removePet(id: number) {
    const index = this.Pets.findIndex((pet) => pet.id === id);
    this.Pets.splice(index, 1);
  }
  addServico(servico: Servico) {
    servico.id = this.Servicos.length + 1;
    this.Servicos.push(servico);
  }
  removeServico(id: number) {
    const index = this.Servicos.findIndex((servico) => servico.id === id);
    this.Servicos.splice(index, 1);
  }
  addProduto(produto: Produto) {
    produto.id = this.Produtos.length + 1;
    this.Produtos.push(produto);
  }
  removeProduto(id: number) {
    const index = this.Produtos.findIndex((produto) => produto.id === id);
    this.Produtos.splice(index, 1);
  }
}

const Instance = new Banco();

Instance.addCliente({
  id: 1,
  nome: "Luis",
  nomeSocial: "Luis",
  email: "exemplo@email",
  endereco: {
    estado: "RS",
    cidade: "Porto Alegre",
    bairro: "Centro",
    rua: "Rua dos Andradas",
    numero: 123,
    codigoPostal: "90020-022",
    informacoesAdicionais: "Apartamento 302",
  },
  telefone: 51999999999,
  produtos: [],
  servicos: [],
});

Instance.addPet({
  id: 1,
  nome: "Rex",
  raca: "Vira-lata",
  tipo: "Cachorro",
});

Instance.addProduto({
  id: 1,
  nome: "Ração",
  preco: 100,
});

Instance.addServico({
  id: 1,
  nome: "Banho",
  preco: 50,
});

export default Instance;
