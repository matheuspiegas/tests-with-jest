import prisma from "../db";

export const getPostById = async (id: number) => {
	const post = await prisma.todos.findUnique({
		where: { id },
	});
	return post;
};
