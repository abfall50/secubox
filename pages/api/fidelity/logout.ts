import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	const user = await prisma.user.findUnique({
		where: {
			id: req.body.user_id
		}
	})

	const company = await prisma.company.findUnique({
		where: {
			id_secubox: user?.connectedTo
		}
	})

	const fidelity = await prisma.fidelity.findFirst({
		where: {
			id_company: company?.id,
			id_user: user?.id
		}
	})

	if (fidelity) {
		const update = await prisma.fidelity.update({
			where: {
				id: fidelity.id
			},
			data: {
				connected: false
			}
		})
		const update_user = await prisma.user.update({
			where: {
				id: user?.id
			},
			data: {
				connectedTo: ""
			}
		})
	} else {
		res.json("Error")
		return
	}
	res.json("")
}