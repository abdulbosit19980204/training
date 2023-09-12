import { Schema, model } from "mongoose";

const PartSchema = new Schema({
    lessonsTypeName: { type: String, required: true },
    lessonsTypeImg: { type: String, required: true },
})

const Part = model("Part", PartSchema)
export default Part