import Compliance from '../models/Compliance.js';
export const createCompliance=async(req,res)=>{try{const c=await Compliance.create(req.body);res.status(201).json(c);}catch(err){res.status(500).json({error:err.message});}};
export const getCompliance=async(req,res)=>{try{const items=await Compliance.find();res.json(items);}catch(err){res.status(500).json({error:err.message});}};
export const updateCompliance=async(req,res)=>{try{const c=await Compliance.findByIdAndUpdate(req.params.id,req.body,{new:true});res.json(c);}catch(err){res.status(500).json({error:err.message});}};
export const deleteCompliance=async(req,res)=>{try{await Compliance.findByIdAndDelete(req.params.id);res.json({success:true});}catch(err){res.status(500).json({error:err.message});}};
