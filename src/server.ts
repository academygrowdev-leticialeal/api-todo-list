import App from "./app";
import { envs } from "./envs";
import {
  ExampleRoutes
} from "./routes";

const app = new App(
  [
    ExampleRoutes.bind(),
    // Add more routes here
  ],
  envs.PORT,
);

app.listen();
