import { Component } from "react";
import Cliente from "../tipos/cliente";
type props = {
    tema: string
}
export default class FormularioCadastroCliente extends Component<props> {
    constructor(props: props) {
        super(props);
    }
    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newClient: Partial<Cliente> = {
            nome: (event.currentTarget[0] as HTMLInputElement).value,
            nomeSocial: (event.currentTarget[1] as HTMLInputElement).value,
            email: (event.currentTarget[2] as HTMLInputElement).value
        }
        console.log(newClient);
        await fetch('http://localhost:32831/cliente/cadastrar', {
            method: 'POST',
            body: JSON.stringify(newClient),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => console.log(response));
    }
    render() {
        let tema = this.props.tema
        return (
            <div className="container-fluid">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Nome social" aria-label="Nome social" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1" style={{ background: tema }}>@</span>
                        <input type="text" className="form-control" placeholder="E-mail" aria-label="E-mail" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>Cadastrar</button>
                    </div>
                </form>
            </div>
        )
    }
}