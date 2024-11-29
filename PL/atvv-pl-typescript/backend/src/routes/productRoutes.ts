import { Router } from "express";
import Produto from "../types/produto";
import banco from "../classes/banco";

const router = Router();

router.get("", (req, res) => {
  res.json(banco.Produtos);
  console.log(banco.Produtos);
});

router.post("", (req, res) => {
  const produto: Produto = req.body;
  banco.addProduto(produto);
  res.json(produto);
});

router.put("", (req, res) => {
  const produto: Produto = req.body;
  let productInstance = banco.Produtos.at(produto.id - 1);
  console.log(produto, productInstance);

  if (productInstance) {
    banco.Produtos[produto.id - 1] = produto;
  }
  res.json(produto);
});

router.delete("", (req, res) => {
  const produto: Produto = req.body;
  if (produto.id) banco.removeProduto(produto.id);
  res.json(produto);
});

export default router;
