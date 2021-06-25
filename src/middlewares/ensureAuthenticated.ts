import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad{
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    
    const authToken = request.headers.authorization
    //console.log(authToken);

    if(!authToken){
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");
    //console.log(token);

    try {
        const { sub } = verify(token, "555cfa256d890ca448e2bc6e170dce1e") as IPayLoad;
        request.user_id = sub;
        return next();
        //console.log(decode);
    } catch(err){
        return response.status(401).end();
    }

}