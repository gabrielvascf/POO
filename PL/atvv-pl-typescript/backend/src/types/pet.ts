import Cliente from "./cliente";

type Pet = {
  id: number;
  nome: string;
  raca: string;
  tipo: string;
  dono?: Cliente;
};

export default Pet;
