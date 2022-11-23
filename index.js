const express = require("express");

const app = express();

app.use(express.json());

app.post("/updateProduct", (req, res) => {
  console.log("\ni have recieved a product update");
  console.log(req.body);
  res
    .status(200)
    .send("thanks, ill send that product update to this discord channel");
});

app.listen(8081, () => {
  console.log("listening for product updates...");
});
