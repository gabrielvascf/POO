import { Component } from "react";
import Cliente from "../tipos/cliente";
type props = {
  tema: string;
};
export default class FormularioCadastroCliente extends Component<props> {
  constructor(props: props) {
    super(props);
  }
  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget
    const newClient: Cliente = {
      id: 0,
      nome: (event.currentTarget[0] as HTMLInputElement).value,
      nomeSocial: (event.currentTarget[1] as HTMLInputElement).value,
      email: (event.currentTarget[2] as HTMLInputElement).value,
      endereco: {
        estado: (event.currentTarget[3] as HTMLInputElement).value,
        cidade: (event.currentTarget[4] as HTMLInputElement).value,
        bairro: (event.currentTarget[5] as HTMLInputElement).value,
        rua: (event.currentTarget[6] as HTMLInputElement).value,
        numero: parseInt((event.currentTarget[7] as HTMLInputElement).value),
        codigoPostal: (event.currentTarget[8] as HTMLInputElement).value,
        informacoesAdicionais: (event.currentTarget[9] as HTMLInputElement)
          .value,
      },
      telefone: Number((event.currentTarget[10] as HTMLInputElement).value),
      produtos: [],
      servicos: []
    };
    console.log(newClient);
    await fetch("http://localhost:3001/cliente", {
      method: "POST",
      body: JSON.stringify(newClient),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => console.log(response)).then(() =>{
      alert("Cliente cadastrado com sucesso!");
      form.reset();
    });
  };
  render() {
    let tema = this.props.tema;
    return (
      <div className="container-fluid">
        <form onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome"
              aria-label="Nome"
              aria-describedby="basic-addon1"
              required
            />
            <input
              type="text"
              className="form-control"
              placeholder="Nome social"
              aria-label="Nome social"
              aria-describedby="basic-addon1"
              required
            />
          </div>
          <div className="input-group mb-3">
            <span
              className="input-group-text"
              id="basic-addon1"
              style={{ background: tema }}
            >
              @
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="E-mail"
              aria-label="E-mail"
              aria-describedby="basic-addon1"
              required
            />
          </div>
          <label className="input-group-text mb-3" htmlFor="endereco">
            Endereço
          </label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Estado"
              aria-label="Estado"
              aria-describedby="basic-addon1"
              required
            />
            <input
              type="text"
              className="form-control"
              placeholder="Cidade"
              aria-label="Cidade"
              aria-describedby="basic-addon1"
              required
            />
            <input
              type="text"
              className="form-control"
              placeholder="Bairro"
              aria-label="Bairro"
              aria-describedby="basic-addon1"
              required
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Rua"
              aria-label="Rua"
              aria-describedby="basic-addon1"
              required
            />
            <input
              type="number"
              className="form-control"
              placeholder="Número"
              aria-label="Número"
              aria-describedby="basic-addon1"
              min="1"
              required
            />
            <input
              type="text"
              className="form-control"
              placeholder="Código Postal"
              aria-label="Código Postal"
              aria-describedby="basic-addon1"
              required
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Informações Adicionais"
              aria-label="Informações Adicionais"
              aria-describedby="basic-addon1"
              required
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Telefone"
              aria-label="Telefone"
              aria-describedby="basic-addon1"
              min="1"
              required
            />
          </div>
          <div className="input-group mb-3">
            <button
              className="btn btn-outline-secondary"
              type="submit"
              style={{ background: tema }}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}
