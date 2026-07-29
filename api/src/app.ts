import express from "express";
import cors from "cors";
// import router from "./modules/incidents/incident.routes";
// import { errorHandler } from "./middleware/error.middleware";
// import { notFoundHandler } from "./middleware/not-found.middleware";
export function createApp() {
  const app = express();

  app.use(cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 
  }))
 
  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use('/', (req, res) => {
    console.log('running on port 8000')
    return res.send('Running on port 8000');
  });

  // app.use("/api/incidents", router);
  // app.use(notFoundHandler);

  // app.use(errorHandler);
  return app;
}
