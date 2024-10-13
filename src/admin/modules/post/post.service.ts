import { bot } from "../../../bot/bot";
import { UserService } from "../../../bot/services/user";
import { TCreatePost } from "./types";

class PostService {
    async createPost(newPost: TCreatePost) {
        // get all users
        const users = await UserService.getAll();

        // send to every user
        for (const user of users) {
            if (newPost.image !== undefined) {
                bot.api.sendPhoto(user.chat_id, newPost.image)
                .then(() => {
                    bot.api.sendMessage(user.chat_id, newPost.text, { parse_mode: 'HTML' });
                });
            } else {
                bot.api.sendMessage(user.chat_id, newPost.text, { parse_mode: 'HTML' });
            }

        }

    }
}

export default new PostService();