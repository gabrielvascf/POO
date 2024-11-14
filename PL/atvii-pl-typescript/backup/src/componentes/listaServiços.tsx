/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";

type props = {
  tema: string
}

type state = {
  showForm: boolean,
  serviceName: string
}

export default class ListaServiços extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      showForm: false,
      serviceName: ''
    };
  }

  closeForm = () => {
    this.setState({ showForm: false });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value
    }));
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ showForm: false, serviceName: '' });
    // DEPOIS EU FAÇO ISSO
    console.log(this.state.serviceName);
  }

  render() {
    let tema = this.props.tema;
    return (
      <div className="container-fluid">
        <div className="list-group">
          <a href="#" className="list-group-item list-group-item-action" onClick={() => this.setState({ showForm: true, serviceName: 'Banho' })}>Banho</a>
          <a href="#" className="list-group-item list-group-item-action" onClick={() => this.setState({ showForm: true, serviceName: 'Tosa' })}>Tosa</a>
          <a href="#" className="list-group-item list-group-item-action" style={{ backgroundColor: tema }} onClick={() => this.setState({ showForm: true, serviceName: 'Consulta' })}>Consulta</a>
        </div>
        {this.state.showForm && (
          <div className="modal show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Formulário de Serviço</h5>
                  <button type="button" className="btn-close" onClick={this.closeForm} aria-label="Close">
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="serviceName">Serviço:</label>
                      <input type="text" className="form-control" id="serviceName" value={this.state.serviceName} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Salvar</button>
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
