import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const update = await prisma.fidelity.update({
			where: {
				id: req.body.id
			},
			data: {
				claim: true
			}
		})
		res.json("")
	} else {
		res.json("ERROR")
	}
}