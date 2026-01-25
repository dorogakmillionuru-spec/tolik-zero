export default async function handler(req, res) {
  const text = req.body?.text || "ничего не сказали";

  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": Bearer ${process.env.OPENAI_API_KEY},
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "Ты Толик. Говоришь дерзко, тепло, по делу." },
        { role: "user", content: text }
      ]
    })
  });

  const data = await r.json();
  const reply = data?.choices?.[0]?.message?.content || "что-то пошло не так";

  res.status(200).json({ reply });
}
