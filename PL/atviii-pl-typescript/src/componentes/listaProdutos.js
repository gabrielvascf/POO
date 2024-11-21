import React, { useState } from "react";

const ListaProdutos = ({ tema }) => {
    const [showForm, setShowForm] = useState(false);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');

    const closeForm = () => {
        setShowForm(false);
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        if (id === 'productName') {
            setProductName(value);
        } else if (id === 'productDescription') {
            setProductDescription(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowForm(false);
        setProductName('');
        setProductDescription('');
        console.log(productName);
    };

    return (
        <div className="container-fluid">
            <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action" onClick={() => { setShowForm(true); setProductName('Xampu'); }}>Xampu</a>
                <a href="#" className="list-group-item list-group-item-action" onClick={() => { setShowForm(true); setProductName('Coleira'); }}>Coleira</a>
                <a href="#" className="list-group-item list-group-item-action" onClick={() => { setShowForm(true); setProductName('Brinquedo'); }}>Brinquedo</a>
                {showForm && (
                    <div className="modal show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Editar produto</h5>
                                    <button type="button" className="btn-close" onClick={closeForm} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="productName">Nome:</label>
                                            <input type="text" className="form-control" id="productName" value={productName} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="productDescription">Descrição:</label>
                                            <input type="text" className="form-control" id="productDescription" value={productDescription} onChange={handleChange} />
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
};

export default ListaProdutos;
