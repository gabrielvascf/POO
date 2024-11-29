/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import Cliente from "../tipos/cliente";
import Produto from "../tipos/produto";
import Servico from "../tipos/servico";

type props = {
  tema: string;
};

type Consumer = {
  name: string;
  moneySpentOnProducts: number;
  moneySpentOnServices: number;
  totalMoneySpent: number;
};

type state = {
  showForm: boolean;
  productName: string;
  productDescription: string;
  consumers: Consumer[];
  sortedConsumers: Consumer[];
  sortConfig: { key: keyof Consumer; direction: "ascending" | "descending" } | null;
};


export default class MaioresConsumidores extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      showForm: false,
      productName: '',
      productDescription: '',
      consumers: [],
      sortedConsumers: [],
      sortConfig: null
    };
  }

  componentDidMount() {
    this.fetchConsumers();
  }
  // AAAAA PORRA

  fetchConsumers = async () => {
    const clients: Cliente[] = await fetch("http://localhost:3001/cliente")
      .then((response) => response.json())
      console.log(clients);
      
    const consumers = clients.map((client: Cliente) => ({
      name: client.nome,
      moneySpentOnProducts: client.produtos.reduce((sum: number, product: Produto) => sum + product.preco, 0),
      moneySpentOnServices: client.servicos.reduce((sum: number, service: Servico) => sum + service.preco, 0),
      totalMoneySpent: client.produtos.reduce((sum: number, product: Produto) => sum + product.preco, 0) + client.servicos.reduce((sum: number, service: Servico) => sum + service.preco, 0)
    }))
    this.setState({ consumers: consumers, sortedConsumers: consumers }, () => {
      this.sortBy("name");
    });
    console.log(this.state.sortedConsumers);
    
  };

  sortBy = (key: keyof Consumer) => {
    let direction: "ascending" | "descending" = "ascending";
    if (this.state.sortConfig && this.state.sortConfig.key === key && this.state.sortConfig.direction === "ascending") {
      direction = "descending";
    }
    console.log(this.state.consumers, this.state.sortedConsumers);
    
    const sortedArray = [...this.state.sortedConsumers].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      return 0;
    });
    console.log(sortedArray);
    this.setState({ sortedConsumers: sortedArray, sortConfig: { key, direction } });
  };
  getArrow = (key: keyof Consumer) => {
    if (!this.state.sortConfig || this.state.sortConfig.key !== key) {
      return null;
    }
    return this.state.sortConfig.direction === "ascending" ? "↑" : "↓";
  };
  render() {
    return (
      <div className="container-fluid">
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => this.sortBy("name")}>Nome {this.getArrow("name")}</th>
              <th onClick={() => this.sortBy("moneySpentOnProducts")}>Dinheiro gasto em produtos {this.getArrow("moneySpentOnProducts")}</th>
              <th onClick={() => this.sortBy("moneySpentOnServices")}>Dinheiro gasto em serviços {this.getArrow("moneySpentOnServices")}</th>
              <th onClick={() => this.sortBy("totalMoneySpent")}>Total gasto {this.getArrow("totalMoneySpent")}</th>
            </tr>
          </thead>
          <tbody>
            {this.state.sortedConsumers.map((consumer, index) => (
              <tr key={index}>
                <td>{consumer.name}</td>
                <td>{consumer.moneySpentOnProducts}</td>
                <td>{consumer.moneySpentOnServices}</td>
                <td>{consumer.totalMoneySpent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  }
}

