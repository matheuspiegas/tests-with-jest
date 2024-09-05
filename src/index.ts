import fastify from "fastify";
import { userRoutes } from "./routes/userRoutes";

export const server = fastify({});

server.register(userRoutes, { prefix: "/api/user" });

server.listen({ port: 3000 });
