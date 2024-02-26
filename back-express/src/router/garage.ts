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
});
