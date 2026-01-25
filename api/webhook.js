module.exports = function handler(req, res) {
  const { message } = req.body || {}
  res.status(200).json({
    reply: "Толик слышу: " + (message || "ничего не сказали")
  })
}
