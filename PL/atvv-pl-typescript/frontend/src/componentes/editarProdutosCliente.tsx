import React, { Component } from "react";
import Cliente from "../tipos/cliente";
import Produto from "../tipos/produto";

type Props = {
    cliente: Cliente;
    onClose: () => void;
    onSave: (cliente: Cliente) => void;
};

type State = {
    produtos: Produto[];
    availableProducts: Produto[];
    newProduct: string;
};

export default class EditarProdutosCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            produtos: props.cliente.produtos || [],
            availableProducts: [],
            newProduct: "",
        };
        this.getProducts();
    }

    handleAddProduct = () => {
        if (!this.state.newProduct) {
            return;
        }
        this.setState((prevState) => ({
            produtos: [...prevState.produtos, { id: 0, nome: prevState.newProduct, preco: 0 }],
            newProduct: "",
        }));
    };

    handleRemoveProduct = (index: number) => {
        this.setState((prevState) => {
            const produtos = [...prevState.produtos];
            produtos.splice(index, 1);
            return { produtos };
        });
    };

    handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ newProduct: event.target.value });
    };

    handleSave = () => {
        const updatedCliente = { ...this.props.cliente, produtos: this.state.produtos };
        this.props.onSave(updatedCliente);
        this.props.onClose();
        console.log(updatedCliente);
    };

    getProducts = () => {
        fetch("http://localhost:3001/produto")
            .then((response) => response.json())
            .then((data) => this.setState({ availableProducts: data })).then(console.log);
    }

    render() {
        console.log(this.state.produtos);
        return (
            <div className="modal show" tabIndex={-1} role="dialog" style={{ display: "block" }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editar Produtos</h5>
                            <button type="button" className="close btn-close" onClick={this.props.onClose}>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="selectProduct">Selecionar Produto:</label>
                                <select
                                    className="form-control"
                                    id="selectProduct"
                                    value={this.state.newProduct}
                                    onChange={this.handleChange}
                                >
                                    <option value="">Selecione um produto</option>
                                    {this.state.availableProducts.map((produto) => (
                                        <option key={produto.id} value={produto.nome}>
                                            {produto.nome}
                                        </option>
                                    ))}
                                </select>
                                <button className="btn btn-primary mt-2" onClick={this.handleAddProduct}>
                                    Adicionar Produto
                                </button>
                            </div>
                            <ul className="list-group mt-3">
                                {this.state.produtos.map((produto, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        {produto.nome}
                                        <button className="btn btn-danger btn-sm" onClick={() => this.handleRemoveProduct(index)}>
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