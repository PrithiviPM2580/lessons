import { Router } from "express";
console.log(process.env.INSTANCE_ID);

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to the Nginx Load Balancer Service");
});

export default router;
