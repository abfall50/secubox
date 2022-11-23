import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const secu = await prisma.secubox.findUnique({
			where: {
				id: req.body.secu_id
			}
		})

		if (secu) {
			res.json("L'identifiant a déjà été attribué à une sécubox.")
			return
		}

		const create = await prisma.secubox.create({
			data: {
				id: req.body.secu_id,
				code: req.body.code
			}
		})
		res.json("")
	} else {
		res.json("ERROR POST")
	}
}