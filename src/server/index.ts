import express, { Application, Request, Response } from "express";
import next from "next";

import { config } from "dotenv";
config();

const dev: boolean = process.env.NODE_ENV !== "production";
const port: string | number = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
  try {
    await app.prepare();
    const server: Application = express();

    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(port, (err?: never) => {
      if (err) throw err;
      console.log(`> Ready on localhost: ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
