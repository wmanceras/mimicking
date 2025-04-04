import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

app.get("/proxy", async (req, res) => {
  const url =
    "http://co-ailct-01.veritran.net:8080/mimicking/ce01211c-f0ac-4f9b-a95b-edca4b1851de";
  const response = await fetch(url);
  const data = await response.text();
  res.send(data);
});

app.listen(4000, () => console.log("Proxy corriendo en http://localhost:4000"));
