import { anyObject } from "jest-mock-extended";
import { prismaMock } from "../../singleton";
import { userController } from "../../src/controllers/userController";
import { getPostById } from "../../src/lib/getPostById";

jest.mock("../../src/lib/getPostById");

describe("userController", () => {
	let controller: userController;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	let mockRequest: any;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	let mockReply: any;

	beforeEach(() => {
		controller = new userController();
		mockReply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		};
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("createTodo", () => {
		it("should return a message if title is empty", async () => {
			mockRequest = {
				body: {
					title: "",
				},
			};
			await controller.createTodo(mockRequest, mockReply);
			expect(prismaMock.todos.create).toHaveBeenCalledWith({
				data: { title: "" },
			});
			expect(mockReply.code).toHaveBeenCalledWith(400);
			expect(mockReply.send).toHaveBeenCalledWith({
				message: "Title is required",
			});
		});
		it("should return a message if todo is created", async () => {
			mockRequest = {
				body: {
					title: "Test",
				},
			};
			prismaMock.todos.create.mockResolvedValue({
				id: 1,
				title: "Test",
				createdAt: new Date(),
			});
			await controller.createTodo(mockRequest, mockReply);
			expect(prismaMock.todos.create).toHaveBeenCalledWith({
				data: { title: "Test" },
			});
			expect(mockReply.code).toHaveBeenCalledWith(201);
		});
	});

	describe("readTodos", () => {
		it("should return a message if have no todos", async () => {
			prismaMock.todos.findMany.mockResolvedValue([]);
			await controller.readTodos(mockRequest, mockReply);
			expect(mockReply.code).toHaveBeenCalledWith(200);
			expect(mockReply.send).toHaveBeenCalledWith({
				message: "No todos found!",
			});
			expect(prismaMock.todos.findMany).toHaveBeenCalled();
			expect(prismaMock.todos.findMany).toHaveLength(0);
		});
		it("should return todos", async () => {
			const todos = [{ id: 1, title: "Test", createdAt: new Date() }];
			prismaMock.todos.findMany.mockResolvedValue(todos);
			await controller.readTodos(mockRequest, mockReply);
			expect(prismaMock.todos.findMany).toHaveBeenCalled();
			expect(mockReply.code).toHaveBeenCalledWith(200);
			expect(mockReply.send).toHaveBeenCalledWith(todos);
		});
	});

	describe("updateTodo", () => {
		const todo = {
			id: 1,
			title: "Test",
			createdAt: new Date(),
		};

		it("should return a message and 400 status code if missing id or title", async () => {
			mockRequest = {
				params: {
					id: undefined,
				},
				body: {
					title: "",
				},
			};
			await controller.updateTodo(mockRequest, mockReply);
			expect(mockReply.send).toHaveBeenCalledWith({
				message: "ID and title are required",
			});
			expect(mockReply.code).toHaveBeenCalledWith(400);
		});

		it("should return 404 status code and a message if todo not found", async () => {
			mockRequest = {
				params: {
					id: 1,
				},
				body: {
					title: "Test",
				},
			};
			(getPostById as jest.Mock).mockResolvedValue(null);
			await controller.updateTodo(mockRequest, mockReply);
			expect(mockReply.code).toHaveBeenCalledWith(404);
			expect(mockReply.send).toHaveBeenCalledWith({
				message: "Todo not found",
			});
		});
		it("should return 200 status code and a message if todo was updated", async () => {
			const existingTodo = {
				id: 1,
				title: "Old Title",
				createdAt: new Date(),
			};
			const updatedTodo = {
				id: 1,
				title: "Test",
				createdAt: new Date(),
			};
			mockRequest = {
				params: {
					id: 1,
				},
				body: {
					title: "Test",
				},
			};
			(getPostById as jest.Mock).mockResolvedValue(existingTodo);
			prismaMock.todos.update.mockResolvedValue(updatedTodo);
			await controller.updateTodo(mockRequest, mockReply);
			expect(prismaMock.todos.update).toHaveBeenCalledWith({
				where: { id: 1 },
				data: { title: "Test" },
			});
			expect(mockReply.code).toHaveBeenCalledWith(200);
			expect(mockReply.send).toHaveBeenCalledWith(updatedTodo);
		});
	});

	describe("deleteTodo", () => {
		it("should return a 400 status code and a message if missing id in request params", async () => {
			mockRequest = {
				params: {
					id: undefined,
				},
			};
			await controller.deleteTodo(mockRequest, mockReply);
			expect(mockReply.send).toHaveBeenCalledWith({
				message: "ID is required",
			});
			expect(mockReply.code).toHaveBeenCalledWith(400);
		});
		it("should return a 404 status code and a message if todo not exist", async () => {
			mockRequest = {
				params: {
					id: 1,
				},
			};
			(getPostById as jest.Mock).mockResolvedValue(null);
			await controller.deleteTodo(mockRequest, mockReply);
			expect(getPostById).toHaveBeenCalledWith(1);
			expect(mockReply.code).toHaveBeenCalledWith(404);
			expect(mockReply.send).toHaveBeenCalledWith({
				message: "Todo not found",
			});
		});
		it("should return a 200 status code and a todo if deleted todo", async () => {
			mockRequest = {
				params: {
					id: 1,
				},
			};
			(getPostById as jest.Mock).mockResolvedValue({});
			prismaMock.todos.delete.mockResolvedValue({
				id: mockRequest.params.id,
				title: "Test",
				createdAt: new Date(),
			});
			await controller.deleteTodo(mockRequest, mockReply);
			expect(prismaMock.todos.delete).toHaveBeenCalledWith({
				where: { id: 1 },
			});
			expect(mockReply.code).toHaveBeenCalledWith(200);
			expect(mockReply.send).toHaveBeenCalledWith({
				id: 1,
				title: "Test",
				createdAt: expect.any(Date),
			});
		});
	});
});
