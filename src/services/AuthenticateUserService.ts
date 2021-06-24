import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs";
import { UsersRepositories } from "../repositories/UserRepositories"
import { sign } from "jsonwebtoken"


interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({
            email
        });

        if(!user){
            throw new Error("Email/Password incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Email/Password incorrect")
        }

        const token = sign(
            {
            email: user.email},
            "555cfa256d890ca448e2bc6e170dce1e",
            {
            subject: user.id,
            expiresIn: "1d"
            }
        );
        return token
    }
}

export { AuthenticateUserService }