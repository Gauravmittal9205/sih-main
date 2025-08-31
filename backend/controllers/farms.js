import Farm from '../models/Farm.js';
export const createFarm = async (req,res)=>{ try{const f=await Farm.create(req.body);res.status(201).json(f);}catch(err){res.status(500).json({error:err.message});}};
export const getFarms = async (req,res)=>{ try{const items=await Farm.find();res.json(items);}catch(err){res.status(500).json({error:err.message});}};
export const getFarmById = async (req,res)=>{ try{const item=await Farm.findById(req.params.id); if(!item) return res.status(404).json({error:'Not found'}); res.json(item);}catch(err){res.status(500).json({error:err.message});}};
export const updateFarm = async (req,res)=>{ try{const item=await Farm.findByIdAndUpdate(req.params.id,req.body,{new:true});res.json(item);}catch(err){res.status(500).json({error:err.message});}};
export const deleteFarm = async (req,res)=>{ try{await Farm.findByIdAndDelete(req.params.id);res.json({success:true});}catch(err){res.status(500).json({error:err.message});}};
