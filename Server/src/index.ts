import "dotenv/config";

import chalk from "chalk";
import app from "./app";
import { PORT } from "./config/env";

app.listen(PORT, () => {
  console.log(`${chalk.blue("[SERVER]")} Running on Port ${PORT}`);
});
