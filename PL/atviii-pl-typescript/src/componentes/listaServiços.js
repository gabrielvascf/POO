import React, { useState } from "react";

const ListaServiços = ({ tema }) => {
    const [showForm, setShowForm] = useState(false);
    const [serviceName, setServiceName] = useState('');

    const closeForm = () => {
        setShowForm(false);
    };

    const handleChange = (event) => {
        setServiceName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowForm(false);
        setServiceName('');
        // DEPOIS EU FAÇO ISSO
        console.log(serviceName);
    };

    return (
        <div className="container-fluid">
            <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action" onClick={() => { setShowForm(true); setServiceName('Banho'); }}>Banho</a>
                <a href="#" className="list-group-item list-group-item-action" onClick={() => { setShowForm(true); setServiceName('Tosa'); }}>Tosa</a>
                <a href="#" className="list-group-item list-group-item-action" style={{ backgroundColor: tema }} onClick={() => { setShowForm(true); setServiceName('Consulta'); }}>Consulta</a>
            </div>
            {showForm && (
                <div className="modal show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Formulário de Serviço</h5>
                                <button type="button" className="btn-close" onClick={closeForm} aria-label="Close">
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="serviceName">Serviço:</label>
                                        <input type="text" className="form-control" id="serviceName" value={serviceName} onChange={handleChange} />
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
};

export default ListaServiços;
