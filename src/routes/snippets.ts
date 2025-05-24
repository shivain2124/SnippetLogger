import express,{ Router, Request, Response } from "express";
import {getAllSnippets,addSnippet,getById,deleteById,updateById} from "../controllers/snippetController"
import {validateSnippet} from "../middleware/validation";

const router=Router();

type SnippetInput={
    title:string;
    code:string;
};

router.get('/',getAllSnippets);
router.post('/',validateSnippet,addSnippet);
router.get('/:id',getById);
router.delete('/:id',deleteById);
router.put('/:id',validateSnippet,updateById);

export default router;