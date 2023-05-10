import {createClient} from 'redis';
import UserRepository from "../repository/UserRepository.js";

export const redisClient = createClient({
    url: 'redis://default:redispw@localhost:32768'
})
redisClient.on('error', err => console.log('Redis Client Error', err));

class RedisUserService {

     static async getUserById(userId) {
        const cacheUser = await redisClient.get(userId);

        if(cacheUser){
            return JSON.parse(cacheUser);
        }


        const user = (await UserRepository.findBy({ids: [userId]}))[0];

        if(!user){
            return user;
        }

        await redisClient.set(userId,JSON.stringify(user))

        return user;
    }
}

export default RedisUserService