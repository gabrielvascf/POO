/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import Produto from "../tipos/produto";
type props = {
  tema: string;
};

type state = {
  showForm: boolean;
  products: Produto[];
  currentProduct?: Produto;
  creatingNewProduct: boolean;
};

export default class ListaProdutos extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      showForm: false,
      products: [],
      currentProduct: undefined,
      creatingNewProduct: false,
    };
    this.getProducts();
  }

  closeForm = () => {
    this.setState({ showForm: false, currentProduct: undefined });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.state.currentProduct) {
      const updatedProduct = {
        ...this.state.currentProduct,
        [event.target.id]: event.target.id === "preco" ? parseFloat(event.target.value) : event.target.value,
      };
      this.setState({ currentProduct: updatedProduct });
    }
  };

  handleDelete = async () => {
    if (this.state.currentProduct) {
      await fetch(`http://localhost:3001/produto`, {
        method: "DELETE",
        body: JSON.stringify(this.state.currentProduct),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => console.log(response))
        .then(this.getProducts);
      this.setState({ showForm: false, currentProduct: undefined });
    }
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.currentProduct) {
      console.log(this.state.creatingNewProduct);
      console.log(this.state.currentProduct);

      await fetch(`http://localhost:3001/produto`, {
        method: this.state.creatingNewProduct ? "POST" : "PUT",
        body: JSON.stringify(this.state.currentProduct),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => console.log(response))
        .then(this.getProducts);
      this.setState({ showForm: false, currentProduct: undefined });
    }
  };

  getProducts = async () => {
    const products = await fetch("http://localhost:3001/produto")
      .then((response) => response.json())
      .then((data) => data);
    this.setState({ products });
    console.log(products);
  };

  render() {
    let tema = this.props.tema;
    return (
      <div className="container-fluid">
        <div className="list-group">
          {this.state.products.map((product) => (
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={() =>
                this.setState({
                  showForm: true,
                  currentProduct: product,
                  creatingNewProduct: false,
                })
              }
            >
              {product.nome}
            </a>
          ))}
          {this.state.showForm && (
            <div
              className="modal show"
              tabIndex={-1}
              role="dialog"
              style={{ display: "block" }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Editar produto</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={this.closeForm}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="nome">Nome:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nome"
                          value={this.state.currentProduct?.nome}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="preco">Preço:</label>
                        <input
                          type="number"
                          className="form-control"
                          id="preco"
                          value={this.state.currentProduct?.preco}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <button type="submit" className="btn btn-primary">
                          Salvar
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={this.handleDelete}
                        >
                          Excluir
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          className="btn btn-success mt-3"
          onClick={() =>
            this.setState({
              showForm: true,
              currentProduct: { id: 0, nome: "", preco: 0 },
              creatingNewProduct: true,
            })
          }
        >
          Adicionar Produto
        </button>

        {this.state.showForm && this.state.currentProduct?.id === 0 && (
          <div
            className="modal show"
            tabIndex={-1}
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Adicionar produto</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={this.closeForm}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="nome">Nome:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nome"
                        value={this.state.currentProduct?.nome}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="preco">Preço:</label>
                      <input
                        type="number"
                        className="form-control"
                        id="preco"
                        value={this.state.currentProduct?.preco}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <button type="submit" className="btn btn-primary">
                        Salvar
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={this.closeForm}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
