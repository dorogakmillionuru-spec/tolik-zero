export default function handler(req, res) {
  const text = req.body?.text || "ничего не сказали";

  res.status(200).json({
    reply: `Толик слышит: ${text}`
  });
}
