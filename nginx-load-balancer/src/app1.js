import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Welcome to Instance ${process.env.INSTANCE_ID1}`);
});

const PORT1 = process.env.PORT1 || 3000;
app.listen(PORT1, () => {
  console.log(`Server is running on port ${PORT1}`);
});
