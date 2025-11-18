import express from "express";
import fetch from "node-fetch";

const app = express();

async function proxy(req, res, targetBase) {
    const q = req.query.q || "";
    const url = targetBase + encodeURIComponent(q);

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });
        const html = await response.text();
        res.send(html);
    } catch (err) {
        res.status(500).send("Proxy error: " + err.toString());
    }
}

app.get("/google", (req, res) => {
    proxy(req, res, "https://www.google.com/search?q=");
});

app.get("/bing", (req, res) => {
    proxy(req, res, "https://www.bing.com/search?q=");
});

app.get("/yandex", (req, res) => {
    proxy(req, res, "https://yandex.com/search/?text=");
});

app.listen(10000, () => console.log("Proxy running on 10000"));
