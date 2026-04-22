import App from "./app";
import { envs } from "./envs";
import {
  AuthRoutes,
  TasksRoutes,
  UsersRoutes
} from "./routes";

const app = new App(
  [
    // Add more routes here
    AuthRoutes.bind(),
    UsersRoutes.bind(),
    TasksRoutes.bind(),
  ],
  envs.PORT,
);

app.listen();
