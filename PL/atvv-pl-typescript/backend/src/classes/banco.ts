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
    this.Clientes.push(cliente);
  }
  removeCliente(cliente: Cliente) {
    const index = this.Clientes.indexOf(cliente);
    this.Clientes.splice(index, 1);
  }
  addPet(pet: Pet) {
    this.Pets.push(pet);
  }
  removePet(pet: Pet) {
    const index = this.Pets.indexOf(pet);
    this.Pets.splice(index, 1);
  }
  addServico(servico: Servico) {
    this.Servicos.push(servico);
  }
  removeServico(servico: Servico) {
    const index = this.Servicos.indexOf(servico);
    this.Servicos.splice(index, 1);
  }
  addProduto(produto: Produto) {
    this.Produtos.push(produto);
  }
  removeProduto(produto: Produto) {
    const index = this.Produtos.indexOf(produto);
    this.Produtos.splice(index, 1);
  }
}
// TODO: pegar apenas clientes por página
// pegar maiores consumidores por página
// update cliente
// update pet
// update servico
// update produto
export default Banco;
