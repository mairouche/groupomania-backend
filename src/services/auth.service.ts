import { User } from "../models/user.model";
import { JWT_SECRET } from "../../environments/environment";
import * as jwt from "jsonwebtoken";
import { CredentialDTO } from "../dto/credential.dto";
import * as bcrypt from "bcrypt";
import { CurrentUserVO } from "../vo/user.vo";

export class AuthService {
  public async login(credential: CredentialDTO) {
    return User.findOne({ email: credential.email })
      .then((userFound) => {
        if (!userFound) {
          throw new Error("User not found");
        } else {
          if (!bcrypt.compareSync(credential.password, userFound.password)) {
            throw new Error("Incorrect password");
          } else {
            const token = jwt.sign({ username: userFound.name }, JWT_SECRET, {
              expiresIn: "1h",
            });
            return new CurrentUserVO(userFound, token);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
