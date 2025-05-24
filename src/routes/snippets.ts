import express,{ Router, Request, Response } from "express";
import {getAllSnippets,addSnippet,getById,deleteById,updateById} from "../controllers/snippetController"
import {validateSnippet} from "../middleware/validation";
import { authMiddleware } from "../middleware/authMiddleware"

const router=Router();
// isPublic: true -> remember

// //public routes
// router.get('/',getAllSnippets);
// router.get('/:id',getById);

// //prtotected routes
// router.post('/',authMiddleware,validateSnippet,addSnippet);
// router.delete('/:id',authMiddleware,deleteById);
// router.put('/:id',authMiddleware,validateSnippet,updateById);

router.use(authMiddleware);

router.get("/", getAllSnippets);
router.get("/:id", getById);
router.post("/", validateSnippet, addSnippet);
router.put("/:id", validateSnippet, updateById);
router.delete("/:id", deleteById);


export default router;