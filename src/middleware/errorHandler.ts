import {Request,Response,NextFunction} from "express";

export function errorHandler(
    err:any,
    req:Request,
    res:Response,
    next:NextFunction
) {
    console.error("Error:" , err.message || err);

    res.status(err.status || 500).json({
        success:false,
        message:err.message || "Something went wrong",
    });
}