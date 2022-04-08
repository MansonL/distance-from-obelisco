import { createServer, Server } from "http";
import { app } from "./services/app";

const server: Server = createServer(app);

server.listen(8080, () => console.log(`Server hosted at PORT 8080`));
