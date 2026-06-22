const Stats = require("../models/Stats");
console.log("STATS CONTROLLER LOADED");

exports.getStats = (req, res) => {
    Stats.getStats((err, results) => {
        if (err) return res.status(500).json(err);

        res.json(results[0]);
    });
};

exports.incrementPlayCount = (req,res) => {

    Stats.incrementPlayCount(
        req.user.id,
        (err)=>{

            if(err)
                return res.status(500).json(err);

            res.json({
                message:"play count updated"
            });
        }
    );
};

exports.saveDuration = (req,res)=>{

    const { duration } = req.body;

    Stats.saveDuration(
        req.user.id,
        duration,
        (err)=>{

            if(err)
                return res.status(500).json(err);

            res.json({
                message:"duration updated"
            });
        }
    );
};

exports.saveSettings = (req,res)=>{

    const { solo,p1,p2 } = req.body;

    Stats.saveSettings(
        req.user.id,
        solo,
        p1,
        p2,
        (err)=>{

            if(err)
                return res.status(500).json(err);

            res.json({
                message:"settings saved"
            });
        }
    );
};

exports.getSettings = (req,res)=>{

    Stats.getSettings(
        req.user.id,
        (err,results)=>{

            if(err)
                return res.status(500).json(err);

            if(results.length === 0){

                return res.json({
                    solo:{},
                    p1:{},
                    p2:{}
                });
            }

            const row = results[0];

            res.json({
                solo: row.solo || {},
                p1: row.p1 || {},
                p2: row.p2 || {}
            });
        }
    );
};

exports.incrementPlayCount = (req,res) => {

    console.log("USER ID =", req.user.id);

    Stats.incrementPlayCount(
        req.user.id,
        (err)=>{
            if(err){
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message:"play count updated"
            });
        }
    );
    console.log(req.user);
};