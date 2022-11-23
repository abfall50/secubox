import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		if (req.body.message) {
			const update = await prisma.company.update({
				where: {
					id: req.body.companyId
				},
				data: {
					welcome_msg: req.body.message
				}
			})
		}
	} else {
		res.json("POST ERROR")
	}
	res.json("")
}