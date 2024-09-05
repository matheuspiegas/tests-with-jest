import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../db";
import { getPostById } from "../lib/getPostById";

type CustomRequest = FastifyRequest<{
	Body: {
		title: string;
	};
	Params: {
		id: string;
	};
}>;

export class userController {
	async createTodo(
		request: FastifyRequest<{ Body: { title: string } }>,
		reply: FastifyReply,
	) {
		const { title } = request.body;
		if (!title) {
			reply.code(400).send({ message: "Title is required" });
		}
		const response = await prisma.todos.create({ data: { title } });
		reply.code(201).send(response);
	}

	async readTodos(request: FastifyRequest, reply: FastifyReply) {
		const todos = await prisma.todos.findMany();
		if (typeof todos === "undefined" || todos.length === 0) {
			reply.code(200).send({ message: "No todos found!" });
		}
		reply.code(200).send(todos);
	}

	async updateTodo(request: CustomRequest, reply: FastifyReply) {
		const { id } = request.params;
		const { title } = request.body;
		if (!id || !title) {
			reply.code(400).send({ message: "ID and title are required" });
		}
		const existingTodo = await getPostById(Number(id));
		if (!existingTodo) {
			reply.code(404).send({ message: "Todo not found" });
			return;
		}
		const response = await prisma.todos.update({
			where: { id: Number(id) },
			data: { title },
		});
		reply.code(200).send(response);
	}

	async deleteTodo(request: CustomRequest, reply: FastifyReply) {
		const { id } = request.params;
		if (!id) {
			reply.code(400).send({ message: "ID is required" });
		}
		const existingTodo = await getPostById(Number(id));
		if (!existingTodo) {
			reply.code(404).send({ message: "Todo not found" });
		}
		const response = await prisma.todos.delete({ where: { id: Number(id) } });
		reply.code(200).send(response);
	}
}
