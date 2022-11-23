import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const secubox = await prisma.secubox.findUnique({
			where: {
				id: req.body.secu_id
			}
		})
		if (!secubox) {
			res.json("Sécubox introuvable!")
			return
		}

		const user = await prisma.user.findUnique({
			where: {
				id_secu: req.body.secu_id
			}
		})

		if (user) {
			res.json("Cette sécubox est connecté à un autre compte!")
			return
		}

		if (secubox.code !== req.body.code) {
			res.json("Code de sécurité incorrect!")
			return
		}

		const update = await prisma.user.update({
			where: {
				id: req.body.id
			},
			data: {
				id_secu: req.body.secu_id
			}
		})
	} else {
		res.json("POST ERROR")
		return
	}
	res.json("")
}