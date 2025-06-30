export async function handler(event) {
  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: event.body
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
