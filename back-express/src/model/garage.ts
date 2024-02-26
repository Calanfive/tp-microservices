import { DataTypes, Sequelize } from "sequelize";

export const garageModel = (sequelize: Sequelize) => {
    return sequelize.define('garage', {
        marque: DataTypes.STRING,
        modele: DataTypes.STRING,
        annee: DataTypes.INTEGER,
        couleur: DataTypes.STRING
    })
}