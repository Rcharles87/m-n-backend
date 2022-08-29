const db = require("../db/dbConfig.js");

const getAllReviews = async (pins_id) => {
    try {
        const allReviews = await db.any(
            "SELECT * FROM reviews WHERE pin_id=$1  ",
            pins_id
        );
        return allReviews;
    }catch (err) {
        return err;
    }
};

const getReview = async (id) => {
    try{
        const oneReview = await db.one(
            "SELECT * FROM reviews WHERE id=$1",
            id
        );
        return oneReview;
    } catch (err) {
        return err;
    }
};

const newReview = async (review) => {
    try{
        const newReview = await db.one(
            "INSERT INTO reviews (reviewer, title, content, rating, pin_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [
                review.reviewer,
                review.title,
                review.content,
                review.rating,
                review.pins_id,
            ]
        );
        return newReview;
    } catch(err){
        return err;
    }
};

const deleteReview = async (id) => {
    try {
        const deletedReview = await db.one(
            "DELETE FROM reviews WHERE id = $1 RETURNING *",
            id
        );
        return deletedReview
    } catch (err) {
        return err;
    }
};

const updateReview = async (id, review) => {
    try {
        const updatedReview = await db.one(
           "UPDATE reviews SET reviewer=$1, title=$2, content=$3, rating=$4, pin_id=$5 WHERE id=$6 RETURNING *",
           [
               review.reviewer,
               review.title,
               review.content,
               review.rating,
               review.pin_id,
               id,
           ] 
        );
        return updatedReview;
    } catch (err) {
        return err;
    }
};

module.exports = {
    getAllReviews,
    getReview,
    newReview,
    deleteReview,
    updateReview
}