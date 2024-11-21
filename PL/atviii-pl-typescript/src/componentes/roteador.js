/* eslint-disable no-unused-vars */
import { useState } from "react";
import BarraNavegacao from "./barraNavegacao"
import ListaCliente from "./listaCliente";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import MaioresConsumidores from "./MaioresConsumidores";
import ListaPets from "./listaPets";
import ListaProdutos from "./listaProdutos";
import ListaServiços from "./listaServiços";
const Telas = [
    {
        nome: 'Clientes',
        componente: <ListaCliente tema="#e3f2fd" />
    },
    {
        nome: 'Cadastros',
        componente: <FormularioCadastroCliente tema="#e3f2fd" />
    },
    {
        nome: 'Pets',
        componente: <ListaPets tema="#e3f2fd" />
    },
    {
        nome: 'Produtos',
        componente: <ListaProdutos tema="#e3f2fd" />
    },
    {
        nome: 'Serviços',
        componente: <ListaServiços tema="#e3f2fd" />
    },
    {
        nome: 'Maiores Consumidores',
        componente: <MaioresConsumidores tema="#e3f2fd" />
    }
]

export default function Roteador() {
    const [tela, setTela] = useState('Clientes')
    const selecionarView = (valor, e) => {
        e.preventDefault()
        setTela(valor)
    }

    const construirView = () => {
        return (
            <>
                <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={Telas.map((tela) => tela.nome)} />
                {Telas.map((template) => {
                    if (tela === template.nome) {
                        const Componente = template.componente
                        return Componente
                    }
                })}
            </>
        )
    }

    return (
        construirView()
    )
}