import { dataSource } from "./database/data-source";
import { bot } from "./bot";
import { config } from "dotenv";
import { ProductEntity } from "./database/entity/product.entity";
config();

async function bootstrap() {
    dataSource.initialize()
        .then(() => {
            dataSource.getRepository(ProductEntity)
            .createQueryBuilder()
            .insert()
            .values({ 
                name: 'Лисичка 🟠', 
                description: "Лисичка 🟠 – природний захисник вашого організму\n\nЛисичка – це унікальний гриб, який не тільки є джерелом цінних вітамінів і мікроелементів, а й володіє сильними протипаразитарними властивостями. Її натуральні компоненти сприяють зміцненню імунітету, очищенню організму від шкідників та покращенню роботи органів травлення.\n\n<b>Основні переваги:</b>\n- <b>Протипаразитарний ефект</b>: Лисичка містить природні речовини, що допомагають ефективно боротися з паразитами.\n- <b>Підтримка печінки та шлунково-кишкового тракту</b>: Покращує травлення і сприяє виведенню токсинів.\n- <b>Джерело вітамінів і мікроелементів</b>: Насичує організм необхідними речовинами для підтримки загального здоров'я.\n- <b>Зміцнення імунітету</b>: Сприяє підвищенню опірності організму до інфекцій та захворювань.\n\n<b>Рекомендації щодо застосування:</b>\nПриймати по 1-2 капсули або як харчову добавку до раціону. Для досягнення найкращих результатів рекомендується консультація з лікарем перед початком використання.\n\n<b>Склад:</b>\n100% екстракт гриба лисички, без домішок та хімічних добавок.", 
                price: 150,
                image: 'https://food375.by/upload/iblock/da7/si6ols9mml2k9764tm6ro4ye7gobcphm.jpg' 
            })
            .execute();

            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization: ", err)
        })

    bot.catch((err) => {
        console.error(err)
    });
    bot.start();

    console.log('Strated bot...');
}

bootstrap();