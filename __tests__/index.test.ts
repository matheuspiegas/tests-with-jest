beforeAll(() => {
	jest.deepUnmock("../src/db");
});
import { server } from "../src";

describe("Integration tests", () => {
	describe("GET route", () => {
		it("should return 200", async () => {
			const response = await server.inject({
				method: "GET",
				url: "/api/user/read",
			});
			console.log(response.json());
			expect(response.statusCode).toBe(200);
		});
	});

	// describe("POST route", () => {
	// 	it("should return 201", async () => {
	// 		const response = await server.inject({
	// 			method: "POST",
	// 			url: "/api/user/create",
	// 			payload: { title: "Test todo" },
	// 		});
	// 		console.log(response);
	// 		// expect(response.statusCode).toBe(201);
	// 	});
	// 	it("should return 400 with an empty title property in body", async () => {
	// 		const response = await server.inject({
	// 			method: "POST",
	// 			url: "/api/user/create",
	// 			payload: { title: "" },
	// 		});
	// 		expect(response.statusCode).toBe(400);
	// 	});
	// });

	// describe("PUT route", () => {
	// 	it("should return 400 if missing title", async () => {
	// 		const response = await server.inject({
	// 			method: "PUT",
	// 			body: { title: "" },
	// 			url: "/api/user/update/2",
	// 		});
	// 		expect(response.statusCode).toBe(400);
	// 	});
	// 	it("should return 400 if missing id", async () => {
	// 		const response = await server.inject({
	// 			method: "PUT",
	// 			body: { title: "title" },
	// 			url: "/api/user/update/",
	// 		});
	// 		expect(response.statusCode).toBe(400);
	// 	});
	// 	it("should return 404 if todo id not found", async () => {
	// 		const response = await server.inject({
	// 			method: "PUT",
	// 			payload: { title: "test" },
	// 			url: "/api/user/update/1",
	// 		});
	// 		expect(response.statusCode).toBe(404);
	// 	});
	// 	// it("should return 200 if todo updated", async () => {
	// 	// 	const response = await server.inject({
	// 	// 		method: "PUT",
	// 	// 		payload: { title: "updated title" },
	// 	// 		url: "/api/user/update/5",
	// 	// 	});
	// 	// 	console.log(response.json());
	// 	// 	expect(response.statusCode).toBe(200);
	// 	// });
	// });

	// describe("DELETE route", () => {
	// 	it("should return 400 if missing id", async () => {
	// 		const response = await server.inject({
	// 			method: "DELETE",
	// 			url: "/api/user/delete/",
	// 		});
	// 		expect(response.statusCode).toBe(400);
	// 	});
	// 	it("should return 404 if todo id not found", async () => {
	// 		const response = await server.inject({
	// 			method: "DELETE",
	// 			url: "/api/user/delete/0219",
	// 		});
	// 		expect(response.statusCode).toBe(404);
	// 	});
	// 	it("should return 200 and an object with message property if todo deleted", async () => {
	// 		const response = await server.inject({
	// 			method: "DELETE",
	// 			payload: { title: "updated title" },
	// 			url: "/api/user/delete/3",
	// 		});
	// 		// const parseResponse = JSON.parse(response.body);
	// 		// expect(response.statusCode).toBe(200);
	// 		// expect(parseResponse).toEqual(
	// 		// 	expect.objectContaining({
	// 		// 		message: expect.stringContaining("Todo deleted"),
	// 		// 	}),
	// 		// );
	// 	});
	// });
});
