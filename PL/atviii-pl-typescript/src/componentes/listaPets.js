import React, { useState } from "react";

const ListaPets = ({ tema }) => {
    const [showForm, setShowForm] = useState(false);
    const [petName, setPetName] = useState('');
    const [petType, setPetType] = useState('');
    const [petAge, setPetAge] = useState('');

    const closeForm = () => {
        setShowForm(false);
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        if (id === 'petName') setPetName(value);
        if (id === 'petType') setPetType(value);
        if (id === 'petAge') setPetAge(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowForm(false);
        setPetName('');
        setPetType('');
        setPetAge('');
        // Handle form submission logic here
        console.log(petName);
    };

    return (
        <div className="container-fluid">
            <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action" onClick={() => setShowForm(true)}>Pet 1</a>
                <a href="#" className="list-group-item list-group-item-action" onClick={() => setShowForm(true)}>Pet 2</a>
                <a href="#" className="list-group-item list-group-item-action" style={{ backgroundColor: tema }} onClick={() => setShowForm(true)}>Pet 3</a>
            </div>
            {showForm && (
                <div className="modal show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar pet</h5>
                                <button type="button" className="btn-close" onClick={closeForm} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="petName">Nome:</label>
                                        <input type="text" className="form-control" id="petName" value={petName} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="petType">Tipo:</label>
                                        <input type="text" className="form-control" id="petType" value={petType} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="petAge">Idade:</label>
                                        <input type="text" className="form-control" id="petAge" value={petAge} onChange={handleChange} />
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

export default ListaPets;
