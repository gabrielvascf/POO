import { useState } from "react";
export default function ListaCliente(props) {
    let tema = props.tema
    const [showForm, setShowForm] = useState(false);
    const [clientName, setClientName] = useState('');
    const [clientSocialName, setClientSocialName] = useState('');
    const [clientEmail, setClientEmail] = useState('');

    const closeForm = () => {
        setShowForm(false);
    }

    const handleChange = (event) => {
        switch (event.target.id) {
            case 'clientName':
                setClientName(event.target.value);
                break;
            case 'clientSocialName':
                setClientSocialName(event.target.value);
                break;
            case 'clientEmail':
                setClientEmail(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowForm(false);
        console.log(clientName);
    }

    return (
        <div className="container-fluid">
            <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action" onClick={() => {
                    setShowForm(true);
                    setClientName('Cliente 1');
                }}>Cliente 1</a>
                <a href="#" className="list-group-item list-group-item-action" onClick={() => {
                    setShowForm(true);
                    setClientName('Cliente 2');
                }}>Cliente 2</a>
                <a href="#" className="list-group-item list-group-item-action" onClick={() => {
                    setShowForm(true);
                    setClientName('Cliente 3');
                }}>Cliente 3</a>
                <a href="#" className="list-group-item list-group-item-action" onClick={() => {
                    setShowForm(true);
                    setClientName('Cliente 4');
                }}>Cliente 4</a>
                <a href="#" className="list-group-item list-group-item-action" style={{ backgroundColor: tema }} onClick={() => {
                    setShowForm(true);
                    setClientName('Cliente 5');
                }}>Cliente 5</a>
                {showForm && (
                    <div className="modal show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Editar cliente</h5>
                                    <button type="button" className="btn-close" onClick={closeForm} aria-label="Close">
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="clientName">Nome:</label>
                                            <input type="text" className="form-control" id="clientName" value={clientName} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="clientSocialName">Nome Social:</label>
                                            <input type="text" className="form-control" id="clientSocialName" value={clientSocialName} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="clientEmail">Email:</label>
                                            <input type="email" className="form-control" id="clientEmail" value={clientEmail} onChange={handleChange} />
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