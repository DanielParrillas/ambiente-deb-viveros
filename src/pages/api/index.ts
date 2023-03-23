import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "@/src/server/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json({ api: "vivero", version: "v.0.1", autor: "Daniel Parrillas" });
}
