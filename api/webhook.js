export default async function handler(req, res) {
  const chatId = req.body?.message?.chat?.id;
  const text = req.body?.message?.text || "ничего не сказали";

  const reply = "Толик слышит: " + text;

  await fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: reply
    })
  });

  res.status(200).json({ ok: true });
}
