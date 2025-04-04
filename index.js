import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;
const API_URL = `https://superheroapi.com/api/${apiKey}/`;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/generate-superhero", async (req, res) => {
  try {
    const random = 1 + Math.floor(Math.random() * 731);
    const result = await axios.get(API_URL + random);
    res.render("index.ejs", { 
      name: result.data.name, 
      fullname: result.data.biography["full-name"],
      intelligence: result.data.powerstats.intelligence,
      strength: result.data.powerstats.strength,
      speed: result.data.powerstats.speed,
      durability: result.data.powerstats.durability,
      power: result.data.powerstats.power,
      combat: result.data.powerstats.combat,
      race: result.data.appearance.race,
      publisher: result.data.biography.publisher,
      img: result.data.image.url
    });
  } catch (error) {
    console.error("Error fetching superhero:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
