const express = require("express");
const cors = require("cors");
const fetch = require("cross-fetch");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get("/api/suggest", async (req, res) => {
  const { searchText } = req.query;

  const url = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchText}`;

  await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred");
    });
});

app.get("/", (req, res) => {
  res.send("Welcome to Video-Hive");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
