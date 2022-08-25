import * as mongoose from 'mongoose';

export const LogSchema = new mongoose.Schema({
	string: String,
	isCorrectSequence: Boolean,
	date: Date,
});