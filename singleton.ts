import type { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, type DeepMockProxy } from "jest-mock-extended";

import prisma from "./src/db";

jest.mock("./src/db.ts", () => ({
	__esModule: true,
	default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
	mockReset(prisma);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
