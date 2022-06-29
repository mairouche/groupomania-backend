import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../environments/environment";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers.authorization?.split(" ")[1];
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, JWT_SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send();
    return;
  }

  const { username } = jwtPayload;
  const newToken = jwt.sign({ username }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.setHeader("token", newToken);

  next();
};
