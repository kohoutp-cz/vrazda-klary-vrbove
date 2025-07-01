const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async function (event) {
  try {
    const { message, history } = JSON.parse(event.body);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: history,
    });

    const reply = response.choices[0].message.content.trim();

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("Proxy error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "⚠️ Došlo k chybě na serveru." }),
    };
  }
};
