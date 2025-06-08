import database from "../../Configuration/DB.js";
const { Schema } = database;
const bidSchema = new Schema({
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    bidderName: { type: String, required: true },
    bidAmount: { type: Number, required: true },
    message: { type: String, required: true },
},{timestamps: true});
const BidModel = database.model('Bid', bidSchema);
export default BidModel;