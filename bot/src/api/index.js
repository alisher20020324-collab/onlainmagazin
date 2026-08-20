import { Telegraf, Markup } from "telegraf";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// /start komandasi
bot.start((ctx) => {
  ctx.reply(
    "Assalomu alaykum! 👋\nKerakli bo'limni tanlang:",
    Markup.keyboard([["📂 Category", "🛍 Product"]]).resize(),
  );
});

// Category tugmasi
// bot.hears("📂 Category", async (ctx) => {
//   let response = await axios.get("http://localhost:5000/api/v1/category");
//   let categories = response.data.allCategory;

//   categories.map((value, index) => {
//     ctx.reply(`Bizning Categoriyalarimiz: ${value.title} \n
//          Description: ${value.desc}`);
//   });
// });

// Product tugmasi
bot.hears("🛍 Product", (ctx) => {
  ctx.reply("Salom 👋");
});

bot.hears("📂 Category", async (ctx) => {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/category");

    const categories = response.data.allCategory;

    if (!categories.length) {
      return ctx.reply("📂 Category mavjud emas!");
    }

    for (const value of categories) {
      await ctx.reply(
        `📂 Category: ${value.title}\n\n` + `📝 Description: ${value.desc}`,
        Markup.inlineKeyboard([
          [
            Markup.button.callback("✏️ Edit", `edit_category_${value._id}`),
            Markup.button.callback("🗑 Delete", `delete_category_${value._id}`),
          ],
        ]),
      );
    }
  } catch (error) {
    console.log(error);
    ctx.reply("❌ Categorylarni olishda xatolik!");
  }
});

bot.action(/^delete_category_(.+)$/, async (ctx) => {
  try {
     const categoryId = ctx.match[1];
     console.log(categoryId);
     

    await axios.delete(`http://localhost:5000/api/v1/category/${categoryId}`);

    await ctx.answerCbQuery("Category o'chirildi ✅");

    await ctx.editMessageText("🗑 Category muvaffaqiyatli o'chirildi!");
  } catch (error) {
    console.log(error);

    await ctx.answerCbQuery("Xatolik ❌");

    await ctx.reply("❌ Categoryni o'chirishda xatolik yuz berdi!");
  }
});

bot.action(/^delete_category_(.+)$/, async (ctx) => {
  try {
    const categoryId = ctx.match[1];

    await axios.delete(`http://localhost:5000/api/v1/category/${categoryId}`);

    await ctx.answerCbQuery("Category o'chirildi ✅");

    await ctx.editMessageText("🗑 Category muvaffaqiyatli o'chirildi!");
  } catch (error) {
    console.log(error);

    await ctx.answerCbQuery("Xatolik ❌");

    await ctx.reply("❌ Categoryni o'chirishda xatolik yuz berdi!");
  }
});

bot.action(/^edit_category_(.+)$/, async (ctx) => {
  const categoryId = ctx.match[1];

  await ctx.answerCbQuery();

  await ctx.reply(
    `✏️ Categoryni o'zgartirish uchun yangi ma'lumotlarni yuboring.\n\n` +
      `Format:\n` +
      `Yangi title | Yangi description`,
  );

  // Bu yerda categoryId ni vaqtincha saqlash kerak
  ctx.session = ctx.session || {};
  ctx.session.editCategoryId = categoryId;
});

bot.on("text", async (ctx) => {
  if (!ctx.session?.editCategoryId) return;

  try {
    const categoryId = ctx.session.editCategoryId;

    const [title, desc] = ctx.message.text.split("|");

    if (!title || !desc) {
      return ctx.reply(
        "❌ Noto'g'ri format!\n\n" +
          "Masalan:\n" +
          "Telefon | Telefonlar kategoriyasi",
      );
    }

    await axios.put(`http://localhost:5000/api/v1/category/${categoryId}`, {
      title: title.trim(),
      desc: desc.trim(),
    });

    ctx.session.editCategoryId = null;

    await ctx.reply(
      `✅ Category muvaffaqiyatli o'zgartirildi!\n\n` +
        `📂 ${title.trim()}\n` +
        `📝 ${desc.trim()}`,
    );
  } catch (error) {
    console.log(error);

    ctx.reply("❌ Categoryni o'zgartirishda xatolik!");
  }
});

// Botni ishga tushirish
bot.launch();

console.log("🤖 Telegram bot ishga tushdi!");
