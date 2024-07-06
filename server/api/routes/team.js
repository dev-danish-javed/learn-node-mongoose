const TeamMember = require("../../models/teamMember");

module.exports = function(router) {
    router.get('/team', function(req, res) {
        // Add your logic here
    });

    router.post('/team', function(req, res){
        let team = new TeamMember(req.body);
        team.save((err, member)=>{
            if(err){
                return res.status(400).json(err);
            }

            return res.status(200).json(member);
        });
    });
};
