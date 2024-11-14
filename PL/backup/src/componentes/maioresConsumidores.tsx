/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";

type props = {
  tema: string;
};

type state = {
  showForm: boolean;
  productName: string;
  productDescription: string;
};

export default class MaioresConsumidores extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      showForm: false,
      productName: '',
      productDescription: ''
    };
  }

  closeForm = () => {
    this.setState({ showForm: false });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value
    }));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ showForm: false, productName: '', productDescription: '' });
    // Handle form submission logic here
    console.log(this.state.productName);
  };

  render() {
    let tema = this.props.tema;
    const consumers = [
      { name: "John Doe", moneySpentOnProducts: 200, moneySpentOnServices: 150, totalMoneySpent: 350 },
      { name: "Jane Smith", moneySpentOnProducts: 300, moneySpentOnServices: 100, totalMoneySpent: 400 },
      { name: "Alice Johnson", moneySpentOnProducts: 250, moneySpentOnServices: 200, totalMoneySpent: 450 },
    ];

    type Consumer = typeof consumers[0];
    type SortConfig = { key: keyof Consumer; direction: "ascending" | "descending" } | null;

    class MaioresConsumidoresTable extends Component<{}, { sortedConsumers: Consumer[]; sortConfig: SortConfig }> {
      constructor(props: {}) {
        super(props);
        this.state = {
          sortedConsumers: consumers,
          sortConfig: null,
        };
      }

      sortBy = (key: keyof Consumer) => {
        let direction: "ascending" | "descending" = "ascending";
        if (this.state.sortConfig && this.state.sortConfig.key === key && this.state.sortConfig.direction === "ascending") {
          direction = "descending";
        }

        const sortedArray = [...this.state.sortedConsumers].sort((a, b) => {
          if (a[key] < b[key]) {
            return direction === "ascending" ? -1 : 1;
          }
          if (a[key] > b[key]) {
            return direction === "ascending" ? 1 : -1;
          }
          return 0;
        });

        this.setState({ sortedConsumers: sortedArray, sortConfig: { key, direction } });
      };

      render() {
        const getArrow = (key: keyof Consumer) => {
          if (!this.state.sortConfig || this.state.sortConfig.key !== key) {
            return null;
          }
          return this.state.sortConfig.direction === "ascending" ? "↑" : "↓";
        };

        return (
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => this.sortBy("name")}>Nome {getArrow("name")}</th>
                <th onClick={() => this.sortBy("moneySpentOnProducts")}>Dinheiro gasto em produtos {getArrow("moneySpentOnProducts")}</th>
                <th onClick={() => this.sortBy("moneySpentOnServices")}>Dinheiro gasto em serviços {getArrow("moneySpentOnServices")}</th>
                <th onClick={() => this.sortBy("totalMoneySpent")}>Total gasto {getArrow("totalMoneySpent")}</th>
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
        );
      }
    }

    return (
      <div className="container-fluid">
        <MaioresConsumidoresTable />
      </div>
    );
  }
}
