/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import Servico from "../tipos/servico";

type props = {
  tema: string;
};

type state = {
  showForm: boolean;
  services: Servico[];
  currentService?: Servico;
  creatingNewService: boolean;
};

export default class ListaServiços extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      showForm: false,
      services: [],
      currentService: undefined,
      creatingNewService: false,
    };
    this.getServices();
  }

  closeForm = () => {
    this.setState({ showForm: false, currentService: undefined });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.state.currentService) {
      const updatedService = {
      ...this.state.currentService,
      [event.target.id]: event.target.id === "preco" ? parseFloat(event.target.value) : event.target.value,
      };
      this.setState({ currentService: updatedService });
    }
  };

  handleDelete = async () => {
    if (this.state.currentService) {
      await fetch(`http://localhost:3001/servico`, {
        method: "DELETE",
        body: JSON.stringify(this.state.currentService),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => console.log(response))
        .then(this.getServices);
      this.setState({ showForm: false, currentService: undefined });
    }
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.currentService) {
      await fetch(`http://localhost:3001/servico`, {
        method: this.state.creatingNewService ? "POST" : "PUT",
        body: JSON.stringify(this.state.currentService),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => console.log(response))
        .then(this.getServices);
      this.setState({ showForm: false, currentService: undefined });
    }
  };

  getServices = async () => {
    const services = await fetch("http://localhost:3001/servico")
      .then((response) => response.json())
      .then((data) => data);
    this.setState({ services });
    console.log(services);
  };

  render() {
    let tema = this.props.tema;
    return (
      <div className="container-fluid">
        <div className="list-group">
          {this.state.services.map((service) => (
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={() =>
                this.setState({
                  showForm: true,
                  currentService: service,
                  creatingNewService: false,
                })
              }
            >
              {service.nome}
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
                    <h5 className="modal-title">Editar serviço</h5>
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
                          value={this.state.currentService?.nome}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="preco">Preço:</label>
                        <input
                          type="number"
                          className="form-control"
                          id="preco"
                          value={this.state.currentService?.preco}
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
              currentService: { id: 0, nome: "", preco: 0 },
              creatingNewService: true,
            })
          }
        >
          Adicionar Serviço
        </button>

        {this.state.showForm && this.state.currentService?.id === 0 && (
          <div
            className="modal show"
            tabIndex={-1}
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Adicionar serviço</h5>
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
                        value={this.state.currentService?.nome}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="preco">Preço:</label>
                      <input
                        type="number"
                        className="form-control"
                        id="preco"
                        value={this.state.currentService?.preco}
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