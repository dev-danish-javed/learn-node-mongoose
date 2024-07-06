const { default: mongoose } = require('mongoose');
const Standup = require('./../../models/standup');

module.exports = function(router) {
    router.get('/standup', async function(req, res) {
        // Add your logic here
        let query = Standup.find().sort({'createdOn':1});
        try{
            let result = await query.exec();
            return  res.status(200).json(result);
        }
        catch(err){
            return res.status(500).json(err);
        }
    });

    router.post('/standup/find', async function(req, res) {
        // Add your logic here
        let query = Standup.find(req.body);
        try{
            let result = await query.exec();
            return  res.status(200).json(result);
        }
        catch(err){
            return res.status(500).json(err);
        }
    });

    router.post('/standup/findOne', async function(req, res) {
        // Add your logic here
        let query = Standup.findOne(req.body);
        try{
            let result = await query.exec();
            return  res.status(200).json(result);
        }
        catch(err){
            return res.status(500).json(err);
        }
    });

    router.get('/standup/:id', async function(req, res) {
        // Add your logic here
        let query = Standup.findById(req.params.id);
        try{
            let result = await query.exec();
            return  res.status(200).json(result);
        }
        catch(err){
            return res.status(500).json(err);
        }
    });

    router.post('/standup', async function(req, res){
        let note = new Standup(req.body);
        try{
            let savedNote = await note.save();
            console.log('savedNote', savedNote);
            return res.status(200).json(savedNote);
        }catch(err){
            console.log('error saving the note', err);
            return res.status(400).json(err);
        }
        
    });
    router.patch('/standup', async function(req, res){
        let prev = req.body.prev;
        let updates = req.body.update;
        try{
            let updated = await Standup.updateOne(prev, updates);
            return res.status(200).json(updated);
        }catch(err){
            return res.status(500).json(err);
        }        
    });
    router.patch('/standup/:id', async function(req, res){
        let updateId = req.params.id;
        let updates = req.body.update;
        try{
            let updated = await Standup.findByIdAndUpdate(updateId, updates);
            return res.status(200).json(updated);
        }catch(err){
            return res.status(500).json(err);
        }        
    });
    router.patch('/standup/updateAll', async function(req, res){
        let prev = req.body.prev;
        let updates = req.body.update;
        try{
            let updated = await Standup.updateMany(prev, updates);
            return res.status(200).json(updated);
        }catch(err){
            return res.status(500).json(err);
        }        
    });
    router.get('/standup/teamMember/:teamMemberId', async function(req, res){
        let teamMemberId = req.params.teamMemberId;
        teamMemberId = mongoose.Types.ObjectId.createFromHexString(teamMemberId);
        try{
            let notes = await Standup.find({_teamMemberId:teamMemberId});
            return res.status(200).json(notes);
        }catch(err){
            return res.status(500).json(err);
        }        
    });
};
