const Clarifai = require('clarifai');
const router = require("express").Router();
const User = require("../models/User");
const app = new Clarifai.App({
    apiKey:'0b648d14f29343d59c89579d997214d8'
});
router.post('/imageurl',async(req,res)=>{
    try{
        const data= await app.models.predict(Clarifai.FACE_DETECT_MODEL,
            req.body.input)
        res.json(data);
    }catch(err){
        res.status(400).json(err);
    }
})

router.put('/pre',async(req,res)=>{
    try{
        const {_id} =req.body;
            try{
                const update=await User.findByIdAndUpdate(
                    _id,
                    {
                        $inc:{"entries":1},
                    },
                    {new:true}
                );
                res.status(200).json(update);
            }catch(err){
                res.status(500).json(err);
            }
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
 