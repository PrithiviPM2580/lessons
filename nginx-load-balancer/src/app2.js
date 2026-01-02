import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Welcome to Instance ${process.env.INSTANCE_ID2}`);
});

const PORT2 = process.env.PORT2 || 3001;
app.listen(PORT2, () => {
  console.log(`Server is running on port ${PORT2}`);
});
