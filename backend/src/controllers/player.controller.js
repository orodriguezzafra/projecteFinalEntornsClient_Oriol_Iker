const Player = require('../models/player.model');

// GET api/players
const getPlayers = async (req,res,next) => {
    try{
        const players = await Player.find();
        res.json(players);
    } catch (err){
        next(err);
    }
};

// GET /api/players/:id
const getPlayerById = async (req,res,next) => {
    try{
        const player = await Player.findById(req.params.id);
        if(!player){
                  return res.status(404).json({ message: 'Jugador no trobat' });
        }
        res.json(player);
    } catch (err){
        next(err);
    }
};

// POST /api/players

const createPlayer = async (req,res,next) => {
    
    try{
        const player = new Player(req.body);
        const saved = await player.save();
        res.status(201).json(saved);
    } catch(err){
       next(err); 
    }
};

// PUT /api/players/:id

const updatePlayer = async (req,res,next) => {
    try{
        const updated = await Player.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if(!updated){
            return res.status(404).json({ message: 'Jugador no trobat' });
        }
        res.json(updated);
    } catch(err){
        next(err);
    }
};

// DELETE /api/players/:id

const deletePlayer = async (req, res, next) => {
    try{
        const deleted = await Player.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(404).json({ message: 'Jugador no trobat' });
        }
        res.status(204).send(); 
    } catch(err){
        next(err);
    }
};

module.exports = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};


