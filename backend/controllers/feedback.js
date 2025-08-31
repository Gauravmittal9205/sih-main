import Feedback from '../models/Feedback.js';
export const submitFeedback=async(req,res)=>{try{const f=await Feedback.create(req.body);res.status(201).json(f);}catch(err){res.status(500).json({error:err.message});}};
export const listFeedback=async(req,res)=>{try{const items=await Feedback.find();res.json(items);}catch(err){res.status(500).json({error:err.message});}};
