import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Welcome to Instance ${process.env.INSTANCE_ID3}`);
});

const PORT3 = process.env.PORT3 || 3002;
app.listen(PORT3, () => {
  console.log(`Server is running on port ${PORT3}`);
});
