import express from "express";
import cors from "cors";
import productsRoutes from "./routes/productsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(productsRoutes);
app.use(usersRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`app running at: port ${port}`));
