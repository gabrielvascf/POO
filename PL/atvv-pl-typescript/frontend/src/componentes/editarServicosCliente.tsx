import React, { Component } from "react";
import Cliente from "../tipos/cliente";
import Servico from "../tipos/servico";
type Props = {
    cliente: Cliente;
    onClose: () => void;
    onSave: (cliente: Cliente) => void;
};

type State = {
    servicos: Servico[];
    availableServices: Servico[];
    newService: string;
};

export default class EditarServicosCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            servicos: props.cliente.servicos || [],
            availableServices: [],
            newService: "",
        };
        this.getServices();
    }

    handleAddService = () => {
        if (!this.state.newService) {
            return;
        }
        this.setState((prevState) => ({
            servicos: [...prevState.servicos, { id: 0, nome: prevState.newService, preco: 0 }],
            newService: "",
        }));
    };

    handleRemoveService = (index: number) => {
        this.setState((prevState) => {
            const servicos = [...prevState.servicos];
            servicos.splice(index, 1);
            return { servicos: servicos };
        });
    };

    handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ newService: event.target.value });
    };

    handleSave = () => {
        const updatedCliente = { ...this.props.cliente, servicos: this.state.servicos };
        this.props.onSave(updatedCliente);
        this.props.onClose();
        console.log(updatedCliente);
    };

    getServices = () => {
        fetch("http://localhost:3001/servico")
            .then((response) => response.json())
            .then((data) => this.setState({ availableServices: data })).then(console.log);
    }

    render() {
        console.log(this.state.servicos);
        return (
            <div className="modal show" tabIndex={-1} role="dialog" style={{ display: "block" }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editar Serviços</h5>
                            <button type="button" className="close btn-close" onClick={this.props.onClose}>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="selectService">Selecionar serviço:</label>
                                <select
                                    className="form-control"
                                    id="selectService"
                                    value={this.state.newService}
                                    onChange={this.handleChange}
                                >
                                    <option value="">Selecione um serviço</option>
                                    {this.state.availableServices.map((servico) => (
                                        <option key={servico.id} value={servico.nome}>
                                            {servico.nome}
                                        </option>
                                    ))}
                                </select>
                                <button className="btn btn-primary mt-2" onClick={this.handleAddService}>
                                    Adicionar serviço
                                </button>
                            </div>
                            <ul className="list-group mt-3">
                                {this.state.servicos.map((servico, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        {servico.nome}
                                        <button className="btn btn-danger btn-sm" onClick={() => this.handleRemoveService(index)}>
                                            Remover
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>
                                Fechar
                            </button>
                            <button type="button" className="btn btn-primary" onClick={this.handleSave}>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}