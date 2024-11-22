/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import Cliente from "../tipos/cliente";
import { log } from "console";

type props = {
    tema: string
}


type state = {
    showForm: boolean,
    clients: Cliente[],
    currentClient?: Cliente,
}

export default class ListaCliente extends Component<props, state>{
    constructor(props: props) {
        super(props);
        this.state = {
            showForm: false,
            clients: [],
            currentClient: undefined
        };
        this.getClients();
    }
    closeForm = () => {
        this.setState({ showForm: false });
    }
    
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (this.state.currentClient) {
            const updatedClient = { ...this.state.currentClient, [event.target.id]: event.target.value };
            this.setState({ currentClient: updatedClient });
        }
    }

    handleDelete = async () => {
        if (this.state.currentClient) {
            await fetch(`http://localhost:32831/cliente/excluir`, {
                method: 'DELETE',
                body: JSON.stringify(this.state.currentClient),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => console.log(response)).then(this.getClients);
            this.setState({ showForm: false, currentClient: undefined });
        }
    }
    
    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.setState({ showForm: false });
        await fetch('http://localhost:32831/cliente/atualizar', {
            method: 'PUT',
            body: JSON.stringify(this.state.currentClient),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => console.log(response)).then(this.getClients);
        
        // DEPOIS EU FAÇO ISSO
    }

    getClients = async () => {
        const clients = await fetch('http://localhost:32831/cliente/clientes')
            .then(response => response.json())
            .then(data => data);
        this.setState({ clients });
        console.log(clients);
    }

    render() {
        let tema = this.props.tema
        return (
            <div className="container-fluid">
                <div className="list-group">
                    {this.state.clients.map((client) => (
                        <a href="#" className="list-group-item list-group-item-action" onClick={() => this.setState({ showForm: true, currentClient: client })}>{client.nome}</a>
                    ))}
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
                                            <label htmlFor="nome">Nome:</label>
                                            <input type="text" className="form-control" id="nome" value={this.state.currentClient?.nome} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="nomeSocial">Nome Social:</label>
                                            <input type="text" className="form-control" id="nomeSocial" value={this.state.currentClient?.nomeSocial} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email:</label>
                                            <input type="email" className="form-control" id="email" value={this.state.currentClient?.email} onChange={this.handleChange} />
                                        </div>
                                        <div className="d-flex justify-content-between mt-3">
                                            <button type="submit" className="btn btn-primary">Salvar</button>
                                            <button type="button" className="btn btn-danger" onClick={this.handleDelete}>Excluir</button>
                                        </div>
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