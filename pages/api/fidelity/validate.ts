import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		if (req.body.claim) {
			const fidelity = await prisma.fidelity.findFirst({
				where: {
					id_user: req.body.id_user,
					id_company: req.body.id_company
				}
			})
			if (!fidelity) {
				res.json("Fidelity Error")
				return
			}
			const update = await prisma.fidelity.update({
				where: {
					id: fidelity.id
				},
				data: {
					claim: false,
					count: 0
				}
			})
		}
	} else {
		res.json("POST ERROR")
		return
	}
	res.json("")
}