import { Router, Request, Response } from "express";
import {snippets,Snippet} from "../data/snippets"
import {getAllSnippets,addSnippet,getById,deleteById} from "../controllers/snippetController"

const router=Router();

type SnippetInput={
    title:string;
    code:string;
};

router.get('/',getAllSnippets);
router.post('/',addSnippet);
router.get('/:id',getById);
router.delete('/:id',deleteById);

export default router;