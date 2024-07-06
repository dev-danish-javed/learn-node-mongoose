const Project = require('./../../models/project');

module.exports = function(router) {
    router.get('/project', async function(req, res) {
        // Add your logic here
        let query = Project.find().sort({'name':1});
        try{
            let result = await query.exec();
            res.status(200).json(result);
        } catch(err){
            res.status(500).json(err);
        }
    });

    router.post('/project', async function(req, res){
        let project = new Project(req.body);
        let result = await project.save();
        console.log('saved result ', result);
        return res.status(200).json(result);
    });
};
