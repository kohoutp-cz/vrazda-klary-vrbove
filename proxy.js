
const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function(event) {
  const body = JSON.parse(event.body);
  const message = body.message;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: "Jsi zkušený detektiv. Máš za úkol vyslechnout osobu podezřelou z vraždy. Tvoje otázky by měly být klidné, důsledné a odhalovat nesrovnalosti." },
      { role: "user", content: message }
    ]
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ reply: completion.data.choices[0].message.content })
  };
};
