import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log(req.body)
	const update = await prisma.user.update({
		where: {
			email: req.body.email
		},
		data: {
			connectedTo: req.body.secubox_id
		}
	})
	res.json("")
}