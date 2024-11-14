/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";

type props = {
  tema: string;
};

type state = {
  showForm: boolean;
  petName: string;
  petType: string;
  petAge: string;
};

export default class ListaPets extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      showForm: false,
      petName: '',
      petType: '',
      petAge: ''
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
    this.setState({ showForm: false, petName: '', petType: '', petAge: '' });
    // Handle form submission logic here
    console.log(this.state.petName);
  };

  render() {
    let tema = this.props.tema;
    return (
      <div className="container-fluid">
        <div className="list-group">
          <a href="#" className="list-group-item list-group-item-action" onClick={() => this.setState({ showForm: true })}>Pet 1</a>
          <a href="#" className="list-group-item list-group-item-action" onClick={() => this.setState({ showForm: true })}>Pet 2</a>
          <a href="#" className="list-group-item list-group-item-action" style={{ backgroundColor: tema }} onClick={() => this.setState({ showForm: true })}>Pet 3</a>
        </div>
        {this.state.showForm && (
          <div className="modal show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Editar pet</h5>
                  <button type="button" className="btn-close" onClick={this.closeForm} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="petName">Nome:</label>
                      <input type="text" className="form-control" id="petName" value={this.state.petName} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="petType">Tipo:</label>
                      <input type="text" className="form-control" id="petType" value={this.state.petType} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="petAge">Idade:</label>
                      <input type="text" className="form-control" id="petAge" value={this.state.petAge} onChange={this.handleChange} />
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
