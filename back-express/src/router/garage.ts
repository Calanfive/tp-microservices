import { Router } from "express";
import { garage } from "..";

export const garageRouter = Router();

garageRouter.get('/', (_, res) => {
    console.log('cars cars cars');
    res.send('okok')
})

garageRouter.post("/add", async (req, res) => {
    const {marque, modele, annee, couleur} = req.body;
    const newCar = await garage.create({marque, modele, annee, couleur});
    console.log(newCar);
    res.json(newCar)
})

garageRouter.put("/:id", async (req, res) => {
    const SelectById = req.params.id
    const modifById = await garage.findByPk(SelectById);
    const modified = await modifById?.update({
        marque: req.body.marque,
        modele: req.body.modele,
        annee: req.body.annee,
        couleur: req.body.couleur
    })
    res.json(modified)
    res.send('information modifiée')
})

garageRouter.delete("/:id", async (req, res) => {
    const SelectById = req.params.id
    const deleteById = await garage.findByPk(SelectById);
    deleteById?.destroy()
    res.send('supression voiture')
})
