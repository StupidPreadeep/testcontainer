//create-car.dto.ts
import { Prisma } from "@prisma/client";

export type CreateCarDto = Prisma.CarCreateInput;