import { Router } from "express";
import Cliente from "../types/cliente";
import banco from "../classes/banco";
const router = Router();

router.get("", (req, res) => {
  res.json(banco.Clientes);
  console.log(banco.Clientes);
});

router.post("", (req, res) => {
  const cliente: Cliente = req.body;
  banco.addCliente(cliente);
  res.json(cliente);
});

router.put("", (req, res) => {
  const cliente: Cliente = req.body;
  let clientInstance = banco.Clientes.at(cliente.id - 1);
  if (clientInstance) {
    banco.Clientes[cliente.id - 1] = cliente;
  }
  res.json(cliente);
});

router.delete("", (req, res) => {
  const cliente: Cliente = req.body;
  if (cliente.id) banco.removeCliente(cliente.id);
  res.json(cliente);
});

export default router;
