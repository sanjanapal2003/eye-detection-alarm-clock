const alarm=require("../models/Alarm")
async function createalarm(req,res){
      try {

        const { time } = req.body;

        const Alarm = new alarm({
            time
        });

        await Alarm.save();

        res.json({
            message: "Alarm Saved",
            Alarm
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
}

async function getalarm(req,res){
     try {

        const Alarms = await alarm.find({
            completed: false
        });

        res.json(Alarms);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
}
async function completealarm(req, res) {

    try {

        await alarm.findByIdAndUpdate(
            req.params.id,
            {
                completed: true
            }
        );

        res.json({
            message: "Alarm Completed"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

}


module.exports={createalarm,getalarm,completealarm}