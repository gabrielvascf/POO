import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import ListaPets from "./listaPets";
import ListaServiços from "./listaServiços";
import ListaProdutos from "./listaProdutos";
import MaioresConsumidores from "./maioresConsumidores";

type state = {
    tela: string
}

const telas = [
    {
        name: 'Clientes', 
        component: <ListaCliente tema="#e3f2fd" />
    },
    {
        name: 'Cadastros',
        component: <FormularioCadastroCliente tema="#e3f2fd" />
    },
    {
        name:'Serviços',
        component: <ListaServiços tema="#e3f2fd" />
    },
    {
        name: 'Pets',
        component: <ListaPets tema="#e3f2fd" />
    },
    {
        name: 'Produtos',
        component: <ListaProdutos tema="#e3f2fd" />
    },
    {
        name: 'Maiores consumidores',
        component: <MaioresConsumidores tema="#e3f2fd"/>
    }
]

export default class Roteador extends Component<{}, state>{
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Clientes'
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        console.log(novaTela);
        this.setState({
            tela: novaTela
        })
    }

    render() {
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} tema="#e3f2fd" botoes={telas.map(tela => tela.name)} />
        return (
            <>
                {barraNavegacao}
                {telas.find(tela => tela.name === this.state.tela)?.component}
            </>
        )
    }
}