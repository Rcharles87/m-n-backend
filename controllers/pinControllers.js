const express = require("express");
const pins = express.Router();
const { getAllPins, getPin, createPin, deletePin, updatePin } = require("../queries/pins.js");
const reviewsControllers = require("./reviewsControllers.js");
pins.use("/:pinId/reviews", reviewsControllers);

pins.get("/", async (req,res) => {
    try {
        const allPins = await getAllPins();
        if(allPins[0]){
            res.status(200).json(allPins);
        } else {
            res.status(404).json({Error: "Not Found"});
        }
    } catch (err) {
        console.log(err)
    }
});

pins.get("/:id", async (req,res) => {
    const { id } = req.params
    try {
        const pin = await getPin(id);
        if(pin.id){
            res.status(200).json(pin);
        } else {
            res.status(404).json({Error: "Not Found"});
        }
    } catch (err) {
        console.log(err);
    }
});

pins.post("/", async (req,res) => {
    const { body } = req;
    try {
        const createdPin = await createPin(body);
        if(createdPin.id){
            res.status(200).json(createdPin);
        } else {
            res.status(500).json({Error: "Pin Creation Error"});
        }
    } catch (err) {
        console.log(err)
    }
});

pins.delete("/:id", async (req,res) => {
    const { id } = req.params;
    try {
        const deletedPin = await deletePin(id);
        if(deletedPin.id){
            res.status(200).json(deletedPin);
        } else {
            res.status(422).json({Error: "Could Not Delete/Does Not Exist"});
        }
    } catch (err) {
        console.log(err);
    }
});

pins.put("/:id", async (req,res) => {
    const { id } = req.params ;
    const { body } = req;
    try{
        const updatedPin = await updatePin(id, body);
        if(updatedPin.id){
            res.status(200).json(updatedPin);
        } else {
            res.status(422).json({Error: "Not Found/ Unable To Update"});
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = pins

