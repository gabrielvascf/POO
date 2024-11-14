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

export default class ListaProdutos extends Component<props, state> {
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
    return (
      <div className="container-fluid">
        <div className="list-group">
          <a href="#" className="list-group-item list-group-item-action" onClick={() => this.setState({ showForm: true, productName: 'Xampu' })}>Xampu</a>
          <a href="#" className="list-group-item list-group-item-action" onClick={() => this.setState({ showForm: true, productName: 'Coleira' })}>Coleira</a>
          <a href="#" className="list-group-item list-group-item-action" onClick={() => this.setState({ showForm: true, productName: 'Brinquedo' })}>Brinquedo</a>
          {this.state.showForm && (
            <div className="modal show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Editar produto</h5>
                    <button type="button" className="btn-close" onClick={this.closeForm} aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="productName">Nome:</label>
                        <input type="text" className="form-control" id="productName" value={this.state.productName} onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="productDescription">Descrição:</label>
                        <input type="text" className="form-control" id="productDescription" value={this.state.productDescription} onChange={this.handleChange} />
                      </div>
                      <button type="submit" className="btn btn-primary">Salvar</button>
                    </form>
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
