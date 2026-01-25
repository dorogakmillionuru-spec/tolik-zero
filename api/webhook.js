export default async function handler(req, res) {
  try {
    const text = req.body?.text || req.body?.reply || req.body?.message || "";

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: text || "Скажи: Толик жив 😈" }],
      }),
    });

    const data = await r.json();
    const answer = data?.choices?.[0]?.message?.content || "Пусто. Но я жив 😈";

    return res.status(200).json({ reply: answer });
  } catch (e) {
    return res.status(200).json({ reply: "Ошибка в мозге, но я жив 😈" });
  }
}
