module.exports = function handler(req, res) {
  const { message } = req.body || {}

  let reply = "Я молчу и смотрю в стену."

  if (message) {
    reply = "Толик: я слышу → " + message
  }

  res.status(200).json({ reply })
}
