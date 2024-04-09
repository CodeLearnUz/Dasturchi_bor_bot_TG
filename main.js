const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv").config();
const TOKEN = process.env.TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

let userData = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `👋 Assalomu alaykum, ${msg.from.first_name}! Siz o'zingizga kerakli bo'limni  tanlang. 👇👇👇`,
    {
      reply_markup: {
        keyboard: [
          [
            { text: "Menga ish kerak", size: "large" },
            { text: "Menga ishchi kerak", size: "large" },
          ],
        ],
        resize_keyboard: true,
      },
    }
  );
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Menga ish kerak tugmasi bosilganida
  if (msg.text === "Menga ish kerak") {
    // Foydalanuvchi suhlar uchun ma'lumotlarni saqlash
    userData[userId] = {};
    bot.sendMessage(
      chatId,
      "😊 Ism, familiyangizni kiriting? Masalan: Doston Baxriddinov"
    );
  } else if (userData[userId]) {
    // Foydalanuvchi suhlar uchun ma'lumotlarni to'plash
    if (!userData[userId].fullName) {
      userData[userId].fullName = msg.text;
      bot.sendMessage(chatId, "🕑 Yosh: Yoshingizni kiriting? Masalan: 18");
    } else if (!userData[userId].age) {
      userData[userId].age = msg.text;
      bot.sendMessage(
        chatId,
        "📚 Texnologiya: O'zinigz biladigan texnologiyalarni kiriting? Texnologiya nomlarini vergul bilan ajrating. Masalan, Javascript, Pyhton, C++"
      );
    } else if (!userData[userId].technologies) {
      userData[userId].technologies = msg.text;
      bot.sendMessage(
        chatId,
        "📞 Aloqa: Bog`lanish uchun raqamingizni kiriting? Masalan, +998 77 053 38 08"
      );
    } else if (!userData[userId].contact) {
      userData[userId].contact = msg.text;
      bot.sendMessage(
        chatId,
        "🌐 Hudud: Qaysi hududdansiz? Viloyat nomi, Samarqand shahar yoki Respublikani kiriting."
      );
    } else if (!userData[userId].region) {
      userData[userId].region = msg.text;
      bot.sendMessage(
        chatId,
        "💵 Oyligingiz qancha bo'lishi kerak? masalan 1.000.000sum dan 3.000.000sum gacha"
      );
    } else if (!userData[userId].price) {
      userData[userId].price = msg.text;
      bot.sendMessage(
        chatId,
        "👨🏻‍💻 Kasbi: Ishlaysizmi yoki o`qiysizmi? Masalan, O'qiyman"
      );
    } else if (!userData[userId].profession) {
      userData[userId].profession = msg.text;
      bot.sendMessage(
        chatId,
        "🕰 Murojaat qilish vaqti: Qaysi vaqtda murojaat qilish mumkin? Masalan, 10:00 - 20:00"
      );
    } else if (!userData[userId].contactTime) {
      userData[userId].contactTime = msg.text;
      bot.sendMessage(
        chatId,
        "🔎 Maqsad: Maqsadingizni qisqacha yozib bering."
      );
    } else if (!userData[userId].purpose) {
      userData[userId].purpose = msg.text;

      // Barcha ma'lumotlar to'g'ri emasmi?
      bot.sendMessage(
        chatId,
        `Xodim: ${userData[userId].fullName}\n🕑 Yosh: ${userData[userId].age}\n📚 Texnologiya: ${userData[userId].technologies}\n📞 Aloqa: ${userData[userId].contact}\n🌐 Hudud: ${userData[userId].region}\n💰 Narxi: ${userData[userId].price}\n👨🏻‍💻 Kasbi: ${userData[userId].profession}\n🕰 Murojaat qilish vaqti: ${userData[userId].contactTime}\n🔎 Maqsad: ${userData[userId].purpose}\n\nBarcha ma'lumotlar to'g'ri mi?`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "✅HA", callback_data: "confirm" },
                { text: "❌YO`Q", callback_data: "cancel" },
              ],
            ],
          },
        }
      );
    }
  }
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Menga ishchi kerak tugmasi bosilganida
  if (msg.text === "Menga ishchi kerak") {
    bot.sendMessage(
      chatId,
      `Assalomu alaykum hurmatli mijoz sizga Dasturch kerak bo'lsa shu kanalga o'tishingiz mumkin 🔗===> https://t.me/boost/Dastuchi_bor_uz`
    );
  }
});

// Funksiyalar
function getChatIdFromUsername(username) {
  return new Promise((resolve, reject) => {
    bot
      .getChat(username)
      .then((chat) => resolve(chat.id))
      .catch((error) => reject(error));
  });
}

bot.on("callback_query", (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const userId = callbackQuery.from.id;
  const data = callbackQuery.data;

  if (data === "confirm") {
    bot.sendMessage(
      chatId,
      "Ariza muvaffaqiyatli yuborildi. Administratorlar tez orada siz bilan bog'lanishadi."
    );
    // Ariza adminstratorlarga yuborish
    const adminChatId = "6146267794";
    bot.sendMessage(
      adminChatId,
      `Yangi ariza:\n\nXodim: ${userData[userId].fullName}\n🕑 Yosh: ${userData[userId].age}\n📚 Texnologiya: ${userData[userId].technologies}\n📞 Aloqa: ${userData[userId].contact}\n🌐 Hudud: ${userData[userId].region}\n💰 Narxi: ${userData[userId].price}\n👨🏻‍💻 Kasbi: ${userData[userId].profession}\n🕰 Murojaat qilish vaqti: ${userData[userId].contactTime}\n🔎 Maqsad: ${userData[userId].purpose}`
    );
    // Foydalanuvchi ma'lumotlarini tozalash
    delete userData[userId];
  } else if (data === "cancel") {
    bot.sendMessage(
      chatId,
      "Ariza bekor qilindi. Iltimos, qayta ma'lumotlarni to'ldiring. /star"
    );
    // Foydalanuvchi ma'lumotlarini tozalash
    delete userData[userId];
  }
});
