/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import Cliente from "../tipos/cliente";
import EditarProdutosCliente from "./editarProdutosCliente";
import EditarServicosCliente from "./editarServicosCliente";

type props = {
  tema: string;
};

type state = {
  showForm: boolean;
  showProductEditor: boolean;
  showServiceEditor: boolean;
  clients: Cliente[];
  currentClient?: Cliente;
};

export default class ListaCliente extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      showForm: false,
      showProductEditor: false,
      showServiceEditor: false,
      clients: [],
      currentClient: undefined,
    };
    this.getClients();
  }

  closeForm = () => {
    this.setState({ showForm: false, showProductEditor: false });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.state.currentClient) {
      const updatedClient = {
        ...this.state.currentClient,
        [event.target.id]: event.target.value,
      };
      this.setState({ currentClient: updatedClient });
    }
  };

  handleDelete = async () => {
    if (this.state.currentClient) {
      await fetch(`http://localhost:3001/cliente`, {
        method: "DELETE",
        body: JSON.stringify(this.state.currentClient),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => console.log(response))
        .then(this.getClients);
      this.setState({ showForm: false, currentClient: undefined });
    }
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ showForm: false });
    await fetch("http://localhost:3001/cliente", {
      method: "PUT",
      body: JSON.stringify(this.state.currentClient),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => console.log(response))
      .then(this.getClients);
  };

  getClients = async () => {
    const clients = await fetch("http://localhost:3001/cliente")
      .then((response) => response.json())
      .then((data) => data);
    this.setState({ clients });
    console.log(clients);
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="list-group">
          {this.state.clients.map((client) => (
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={() =>
                this.setState({ showForm: true, currentClient: client })
              }
            >
              {client.nome}
            </a>
          ))}
          {this.state.showForm && (
            <div
              className="modal show"
              tabIndex={-1}
              role="dialog"
              style={{ display: "block" }}
            >
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Editar cliente</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={this.closeForm}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={this.handleSubmit}>
                      Informações principais
                      <div className="form-group">
                        <label htmlFor="nome">Nome:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nome"
                          value={this.state.currentClient?.nome}
                          onChange={this.handleChange}
                        />
                        <label htmlFor="nomeSocial">Nome Social:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nomeSocial"
                          value={this.state.currentClient?.nomeSocial}
                          onChange={this.handleChange}
                        />
                        <label htmlFor="email">Email:</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={this.state.currentClient?.email}
                          onChange={this.handleChange}
                        />
                      </div>
                      Endereço
                      <div className="form-group">
                        <label htmlFor="estado">Estado:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="estado"
                          value={this.state.currentClient?.endereco.estado}
                          onChange={this.handleChange}
                        />
                        <label htmlFor="cidade">Cidade:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cidade"
                          value={this.state.currentClient?.endereco.cidade}
                          onChange={this.handleChange}
                        />
                        <label htmlFor="bairro">Bairro:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="bairro"
                          value={this.state.currentClient?.endereco.bairro}
                          onChange={this.handleChange}
                        />
                        <label htmlFor="rua">Rua:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="rua"
                          value={this.state.currentClient?.endereco.rua}
                          onChange={this.handleChange}
                        />
                        <label htmlFor="numero">Número:</label>
                        <input
                          type="number"
                          className="form-control"
                          id="numero"
                          value={this.state.currentClient?.endereco.numero}
                          onChange={this.handleChange}
                        />
                        <label htmlFor="codigoPostal">Código Postal:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="codigoPostal"
                          value={
                            this.state.currentClient?.endereco.codigoPostal
                          }
                          onChange={this.handleChange}
                        />
                        <label htmlFor="informacoesAdicionais">
                          Informações Adicionais:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="informacoesAdicionais"
                          value={
                            this.state.currentClient?.endereco
                              .informacoesAdicionais
                          }
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="telefone">Telefone:</label>
                        <input
                          type="number"
                          className="form-control"
                          id="telefone"
                          value={this.state.currentClient?.telefone}
                          onChange={this.handleChange}
                          min="1"
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            this.setState({ showProductEditor: true });
                          }}
                        >
                          Gerenciar Produtos
                        </button>
                        <span className="mx-2"></span>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            this.setState({ showServiceEditor: true });
                          }}
                        >
                          Gerenciar Serviços
                        </button>
                        {/* <span className="mx-2"></span>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            this.setState({ showPetsEditor: true });
                          }}
                        >
                          Gerenciar Pets
                        </button> */}
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
                    {this.state.showProductEditor && this.state.currentClient && <EditarProdutosCliente cliente={this.state.currentClient} onClose={() => {
                      this.setState({ showProductEditor: false });
                    }} onSave={(cliente: Cliente) => {
                      this.setState({ currentClient: cliente });
                    }} />}
                    {this.state.showServiceEditor && this.state.currentClient && <EditarServicosCliente cliente={this.state.currentClient} onClose={() => {
                      this.setState({ showServiceEditor: false });
                    }}
                      onSave={(cliente: Cliente) => {
                        this.setState({ currentClient: cliente });
                      }}
                    />
                    }
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
