const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const headers = {
  "User-Agent": "Mozilla/5.0",
  "Accept": "*/*",
  "Referer": "https://www.nseindia.com/option-chain",
  "Accept-Language": "en-US,en;q=0.9",
  "Connection": "keep-alive"
};

app.get("/nse/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const url = `https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`;

  try {
    // 1. Get session cookies from homepage
    const session = await axios.get("https://www.nseindia.com", { headers });

    // 2. Use same headers and cookies
    const response = await axios.get(url, {
      headers: {
        ...headers,
        Cookie: session.headers["set-cookie"].join("; ") // send back session cookies
      }
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      error: "NSE Fetch Failed",
      details: err.toString()
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ NSE Proxy running on port ${PORT}`);
});
