import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const update = await prisma.company.update({
		where: {
			id: req.body.company_id
		},
		data: {
			fidelity_admin: req.body.switch
		}
	})
	res.json("")
}