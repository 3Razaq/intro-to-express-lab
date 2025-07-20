const express = require('express');
const app = express();

// Step 1
app.get('/greetings/:username', (req, res) => {
  const user = req.params.username;
  const greetings = {
    Christy: "Hello there, Christy!",
    Mathilda: "What a delight it is to see you once more, Mathilda."
  };
  res.send(greetings[user] || `Hello there, ${user}!`);
});

// Step 2
app.get('/roll/:number', (req, res) => {
  const max = parseInt(req.params.number, 10);
  if (isNaN(max)) {
    res.send("You must specify a number.");
    return;
  }
  const roll = Math.floor(Math.random() * (max + 1));
  res.send(`You rolled a ${roll}.`);
});

// Step 3
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
  const idx = parseInt(req.params.index, 10);
  if (isNaN(idx) || idx < 0 || idx >= collectibles.length) {
    res.send("This item is not yet in stock. Check back soon!");
    return;
  }
  const item = collectibles[idx];
  res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
});

// Step 4
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
  let filteredShoes = shoes;

  const minPrice = parseFloat(req.query['min-price']);
  const maxPrice = parseFloat(req.query['max-price']);
  const type = req.query.type;

  if (!isNaN(minPrice)) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
  }
  if (!isNaN(maxPrice)) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
  }
  if (type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase());
  }

  res.send(filteredShoes);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

