import express from 'express';
import { OnlineModel } from '../models/OnlineStatus';
import { someThingWentWrong } from '../utils';
import { GameModel } from '../models/Game';

const router = express.Router();

router.post('/save-partial-result', async (req, res) => {
    try {
        const { level, score,time } = req.body;
        const partialResult = await OnlineModel.findOne({
            email: req.user.email,
        });
        partialResult.currentLevel = level;
        partialResult.scores.set(String(level)) = {
          score,
          time
        };
        await partialResult.save();

        res.send({
            message: 'Partial result saved',
        });
    } catch (err) {
        someThingWentWrong(res, err);
    }
});


router.post('/save-result',async(req,res)=>{
  try{
    const {levelDetails,isPassed} = req.body
    
    await OnlineModel.findOneAndDelete({user_id:req.user._id})
    
    const game = new GameModel({
      gameScores:levelDetails,
      isPassed,
      user_id: req.user._id
    })

    await game.save()
    
    res.send({
      message: 'Game result saved.'
    })
  }catch(err){
    someThingWentWrong(res,err)
  }
})
export const gameRoutes = router;
