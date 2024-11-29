/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import Pet from "../tipos/pet";

type props = {
  tema: string;
};

type state = {
  showForm: boolean;
  pets: Pet[];
  currentPet?: Pet;
  creatingNewPet: boolean;
};

export default class ListaPets extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      showForm: false,
      pets: [],
      currentPet: undefined,
      creatingNewPet: false,
    };
    this.getPets();
  }

  closeForm = () => {
    this.setState({ showForm: false, currentPet: undefined });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.state.currentPet) {
      const updatedPet = {
        ...this.state.currentPet,
        [event.target.id]: event.target.value,
      };
      this.setState({ currentPet: updatedPet });
    }
  };

  handleDelete = async () => {
    if (this.state.currentPet) {
      await fetch(`http://localhost:3001/pet`, {
        method: "DELETE",
        body: JSON.stringify(this.state.currentPet),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => console.log(response))
        .then(this.getPets);
      this.setState({ showForm: false, currentPet: undefined });
    }
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.currentPet) {
      await fetch(`http://localhost:3001/pet`, {
        method: this.state.creatingNewPet ? "POST" : "PUT",
        body: JSON.stringify(this.state.currentPet),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => console.log(response))
        .then(this.getPets);
      this.setState({ showForm: false, currentPet: undefined });
    }
  };

  getPets = async () => {
    const pets = await fetch("http://localhost:3001/pet")
      .then((response) => response.json())
      .then((data) => data);
    this.setState({ pets });
    console.log(pets);
  };

  render() {
    let tema = this.props.tema;
    return (
      <div className="container-fluid">
        <div className="list-group">
          {this.state.pets.map((pet) => (
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={() =>
                this.setState({
                  showForm: true,
                  currentPet: pet,
                  creatingNewPet: false,
                })
              }
            >
              {pet.nome}
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
                    <h5 className="modal-title">
                      {this.state.creatingNewPet ? "Adicionar pet" : "Editar pet"}
                    </h5>
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
                          value={this.state.currentPet?.nome}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="raca">Raça:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="raca"
                          value={this.state.currentPet?.raca}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="tipo">Tipo:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="tipo"
                          value={this.state.currentPet?.tipo}
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
              currentPet: { id: 0, nome: "", raca: "", tipo: "" },
              creatingNewPet: true,
            })
          }
        >
          Adicionar Pet
        </button>
      </div>
    );
  }
}