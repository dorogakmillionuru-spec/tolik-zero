export default async function handler(req, res) {
  const chatId = req.body?.message?.chat?.id;
  const userText = req.body?.message?.text || "ничего не сказали";

  if (!chatId) return res.status(200).json({ ok: true });

  const SYSTEM_PROMPT = `ТЫ — Толик. Отвечай дерзко-тёпло, коротко, без воды.`;

  const r = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userText }
      ],
    }),
  });

  const data = await r.json();
  const answer =
    data.output_text ||
    "Я жив, но у меня сейчас 500 внутри. Проверь OPENAI_API_KEY 😈";

  await fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: answer }),
  });

  res.status(200).json({ ok: true });
}
