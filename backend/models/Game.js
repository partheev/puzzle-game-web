import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  userId :{
    type: mongoose.Types.ObjectId,
    ref:'User'
  },
  pass: Boolean,
  gameDetails:{

  }

})

const GameModel = mongoose.model('Game',gameSchema)
