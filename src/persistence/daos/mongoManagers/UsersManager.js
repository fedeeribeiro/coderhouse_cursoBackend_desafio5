import { usersModel } from '../../models/users.model.js';

export default class UsersManager {
    async createUser(user) {
        const { email, password } = user;
        try {
            const userExists = await usersModel.find({ email });
            if (userExists.length === 0) {
                const newUser = await usersModel.create(user);
                return newUser
            } else {
                return null
            }
        } catch (error) {
            console.log(error);
            throw new Error(error)
        }
    }

    async loginUser(user) {
        const { email, password } = user;
        const foundUser = await usersModel.find({ email, password });
        if (foundUser.length !== 0) {
            return foundUser
        } else {
            return null
        }
    }
}