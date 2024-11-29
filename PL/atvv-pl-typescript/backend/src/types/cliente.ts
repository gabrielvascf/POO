import Produto from "./produto"
import Servico from "./servico"

type Cliente = {
    id: number,
    nome: string,
    nomeSocial: string,
    email?: string,
    endereco: {
        id: number,
        estado: string,
        cidade: string,
        bairro: string,
        rua: string,
        numero: number,
        codigoPostal: string,
        informacoesAdicionais?: string
    },
    telefones: {
        id: number,
        numero: number,
        ddd: number
    }[],
    produtos: Produto[],
    servicos: Servico[]
}

export default Cliente;
