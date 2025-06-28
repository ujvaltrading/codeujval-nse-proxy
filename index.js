const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/nse/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const url = `https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "*/*",
        "Referer": "https://www.nseindia.com/",
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive"
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "NSE Fetch Failed", details: err.toString() });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ NSE Proxy live on port ${PORT}`);
});
