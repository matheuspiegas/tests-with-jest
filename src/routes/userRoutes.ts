import type { FastifyInstance } from "fastify";
import { userController } from "../controllers/userController";

const controller = new userController();
export const userRoutes = async (fastify: FastifyInstance) => {
	fastify.post("/create", controller.createTodo.bind(controller));
	fastify.get("/read", controller.readTodos.bind(controller));
	fastify.put("/update/:id", controller.updateTodo.bind(controller));
	fastify.delete("/delete/:id", controller.deleteTodo.bind(controller));
};
