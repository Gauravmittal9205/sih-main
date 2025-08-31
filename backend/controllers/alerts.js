import Alert from '../models/Alert.js';
export const createAlert=async(req,res)=>{try{const a=await Alert.create(req.body);res.status(201).json(a);}catch(err){res.status(500).json({error:err.message});}};
export const getAlerts=async(req,res)=>{try{const items=await Alert.find();res.json(items);}catch(err){res.status(500).json({error:err.message});}};
export const deleteAlert=async(req,res)=>{try{await Alert.findByIdAndDelete(req.params.id);res.json({success:true});}catch(err){res.status(500).json({error:err.message});}};
