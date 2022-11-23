import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		if (req.body.email) {
			const user = await prisma.user.findUnique({
				where: {
					email: req.body.email
				}
			})
			if (!user) {
				res.json("L'email ne correspond a aucun compte!")
				return
			}
			const fidelity = await prisma.fidelity.findFirst({
				where: {
					id_user: user.id,
					id_company: req.body.id
				}
			})
			if (fidelity) {
				if (fidelity.count === 10) {
					res.json("Le client a déjà 10 points de fidélité!")
					return
				}
				const update = await prisma.fidelity.update({
					where: {
						id: fidelity.id
					},
					data: {
						count: {
							increment: 1
						}
					}
				})
			}
		}
	} else {
		res.json("POST ERROR")
	}
	res.json("")
}