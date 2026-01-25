export default async function handler(req, res) {
  const { message } = req.body || {}

  res.status(200).json({
    reply: "Толик слышит: " + (message || "ничего не сказали")
  })
}
