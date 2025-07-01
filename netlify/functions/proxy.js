const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async function (event, context) {
  try {
    const { message, history } = JSON.parse(event.body);

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: history,
    });

    const reply = chatCompletion.choices?.[0]?.message?.content?.trim();

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: reply || "⚠️ Detektiv mlčí..." }),
    };
  } catch (error) {
    console.error("Chyba v proxy funkci:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "⚠️ Došlo k chybě na straně serveru." }),
    };
  }
};
