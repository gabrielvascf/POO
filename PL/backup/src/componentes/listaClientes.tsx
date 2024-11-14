/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";

type props = {
    tema: string
}

type state = {
    showForm: boolean,
    clientName: string,
    clientSocialName: string,
    clientEmail: string
}

export default class ListaCliente extends Component<props, state>{
    constructor(props: props) {
        super(props);
        this.state = {
            showForm: false,
            clientName: '',
            clientSocialName: '',
            clientEmail: ''
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
        this.setState({ showForm: false, clientName: '', clientSocialName: '', clientEmail: '' });
        // DEPOIS EU FAÇO ISSO
        console.log(this.state.clientName);
    }

    render() {
        let tema = this.props.tema
        return (
            <div className="container-fluid">
                <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action" onClick={() => this.setState({ showForm: true, clientName: 'Cliente 1' })}>Cliente 1</a>
                    <a href="#" className="list-group-item list-group-item-action" onClick={() => this.setState({ showForm: true, clientName: 'Cliente 2' })}>Cliente 2</a>
                    <a href="#" className="list-group-item list-group-item-action" onClick={() => this.setState({ showForm: true, clientName: 'Cliente 3' })}>Cliente 3</a>
                    <a href="#" className="list-group-item list-group-item-action" style={{ backgroundColor: tema }} onClick={() => this.setState({ showForm: true, clientName: 'Cliente 4' })}>Cliente 4</a>
                    <a href="#" className="list-group-item list-group-item-action" onClick={() => this.setState({ showForm: true, clientName: 'Cliente 5' })}>Cliente 5</a>
                    <a href="#" className="list-group-item list-group-item-action" onClick={() => this.setState({ showForm: true, clientName: 'Cliente 6' })}>Cliente 6</a>
                {this.state.showForm && (
                    <div className="modal show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Editar cliente</h5>
                                    <button type="button" className="btn-close" onClick={this.closeForm} aria-label="Close">
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="clientName">Nome:</label>
                                            <input type="text" className="form-control" id="clientName" value={this.state.clientName} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="clientSocialName">Nome Social:</label>
                                            <input type="text" className="form-control" id="clientSocialName" value={this.state.clientSocialName} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="clientEmail">Email:</label>
                                            <input type="email" className="form-control" id="clientEmail" value={this.state.clientEmail} onChange={this.handleChange} />
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
        )
    }
}