const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function (event, context) {
  try {
    const { message, history } = JSON.parse(event.body);
    console.log("Získaná historie:", JSON.stringify(history, null, 2));

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: history,
    });

    console.log("Odpověď z OpenAI:", completion.data);

    const reply = completion.data.choices[0]?.message?.content || "⚠️ Detektiv mlčí...";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("Chyba v proxy funkci:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "⚠️ Došlo k chybě na straně serveru." }),
    };
  }
};
