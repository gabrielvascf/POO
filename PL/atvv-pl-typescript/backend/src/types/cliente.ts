import Produto from "./produto";
import Servico from "./servico";
import Pet from "../types/pet";
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
  produtos: Produto[];
  servicos: Servico[];
  pets: Pet[];
};

export default Cliente;
