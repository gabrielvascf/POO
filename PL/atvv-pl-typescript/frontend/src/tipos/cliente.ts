import Produto from "./produto";
import Servico from "./servico";

type Cliente = {
  id: number;
  nome: string;
  nomeSocial: string;
  email?: string;
  endereco: {
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: number;
    codigoPostal: string;
    informacoesAdicionais?: string;
  };
  telefone: number;
  servicos: Servico[];
  produtos: Produto[];
};

export default Cliente;
