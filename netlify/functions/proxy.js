const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async function (event) {
  try {
    const { history } = JSON.parse(event.body);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: history,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: reply || "⚠️ Detektiv mlčí..." }),
    };
  } catch (error) {
    console.error("CHYBA:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "⚠️ Došlo k chybě na straně serveru." }),
    };
  }
  document.getElementById("exportBtn").addEventListener("click", () => {
  const lines = messages.map(m => {
    if (m.role === "user") return "Vy: " + m.content;
    if (m.role === "assistant") return "Detektiv: " + m.content;
    return "";
  });
  const text = lines.join("\n\n");
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "vyslech.txt";
  a.click();
  URL.revokeObjectURL(url);
});

};
