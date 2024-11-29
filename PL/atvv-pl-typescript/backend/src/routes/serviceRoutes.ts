import { Router } from "express";
import Servico from "../types/servico";
import banco from "../classes/banco";

const router = Router();

router.get("", (req, res) => {
  res.json(banco.Servicos);
  console.log(banco.Servicos);
});

router.post("", (req, res) => {
  const servico: Servico = req.body;
  banco.addServico(servico);
  res.json(servico);
});

router.put("", (req, res) => {
  const servico: Servico = req.body;
  let serviceInstance = banco.Servicos.at(servico.id - 1);
  console.log(servico, serviceInstance);

  if (serviceInstance) {
    banco.Servicos[servico.id - 1] = servico;
  }
  res.json(servico);
});

router.delete("", (req, res) => {
  const servico: Servico = req.body;
  if (servico.id) banco.removeServico(servico.id);
  res.json(servico);
});

export default router;

