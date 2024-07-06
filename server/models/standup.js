const mongoose = require('mongoose');
const alphabetsOnly = /^[a-z A-Z]+$/;
const allowedImpediments = ['none', 'major', 'minor'];
const blankValidator = [(val)=>val.trim().length, 'invalid {{PATH}}']
const standupSchema = new mongoose.Schema({
	teamMemberId: {
		type: mongoose.Schema.Types.ObjectId,
		ref:'teamMembers'
	},
	teamMember: {type: String},
	project: {type: String, validate:blankValidator},
	workYesterday: {type: String},
	workToday: {type: String, required:[true, 'workToday is required'], match:[alphabetsOnly, 'Only Alphabets allowed']},
	impediment: {type: String, required:[true, 'Impediment is required'], enum:{values: allowedImpediments, message: 'Not a valid option'}},
	createdOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Standup', standupSchema)