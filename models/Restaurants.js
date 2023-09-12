import { Schema, model } from "mongoose";

const RestaurantSchema = new Schema({
    restaurantName: { type: String, required: true },
    restaurantImg: { type: String, required: true },
})

const Restaurant = model("Restaurant", RestaurantSchema)
export default Restaurant