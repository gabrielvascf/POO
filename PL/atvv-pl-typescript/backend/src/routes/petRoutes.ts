import { Router } from "express";
import Pet from "../types/pet";
import banco from "../classes/banco";

const router = Router();

router.get("", (req, res) => {
  res.json(banco.Pets);
  console.log(banco.Pets);
});

router.post("", (req, res) => {
  const pet: Pet = req.body;
  banco.addPet(pet);
  res.json(pet);
});

router.put("", (req, res) => {
  const pet: Pet = req.body;
  let petInstance = banco.Pets.at(pet.id - 1);
  console.log(pet, petInstance);

  if (petInstance) {
    banco.Pets[pet.id - 1] = pet;
  }
  res.json(pet);
});
router.delete("", (req, res) => {
  const pet: Pet = req.body;
  if (pet.id) banco.removePet(pet.id);
  res.json(pet);
});

export default router;

