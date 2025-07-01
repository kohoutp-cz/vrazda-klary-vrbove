const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function (event, context) {
  try {
    const { message, history } = JSON.parse(event.body);

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: history,
    });

    const reply = completion.data.choices[0]?.message?.content || "⚠️ Detektiv mlčí...";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("Chyba v proxy funkci:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "⚠️ Došlo k chybě na straně serveru." }),
    };
  }
};
