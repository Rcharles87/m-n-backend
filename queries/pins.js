const db = require("../db/dbConfig.js");

const getAllPins = async () => {
    try {
        const allPins = await db.any("SELECT * FROM pins");
        return allPins
    } catch (err) {
        return err;
    }
};

const getPin = async (id) => {
    try {
        const onePin = await db.one(
            "SELECT * FROM pins WHERE id=$1",
            id
        );
        return onePin;
    } catch (err) {
        return err;
    }
};

const createPin = async (pin) => {
    try {
        const newPin = await db.one(
            "INSERT INTO pins (name, description, price, is_featured, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [
                pin.name,
                pin.description,
                pin.price,
                pin.is_featured,
                pin.image
            ]
        );
        return newPin;
    } catch (err) {
        return err;
    }
};

const deletePin = async (id) => {
    try {
        const deletedPin = await db.one(
            "DELETE FROM pins WHERE id=$1 RETURNING *",
            id
        );
        return deletedPin
    } catch (err) {
        return err;
    }
};

const updatePin = async (id, pin) => {
    try {
        const updatedPin = await db.one(
            "UPDATE pins SET name=$1, description=$2, price=$3, is_featured=$4, image=$5 WHERE id=$6 RETURNING *",
            [
                pin.name,
                pin.description,
                pin.price,
                pin.is_featured,
                pin.image,
                id
            ]
        );
        return updatedPin
    } catch (err) {
        return err;
    }
};

module.exports = {
    getAllPins,
    getPin,
    createPin,
    deletePin,
    updatePin
}