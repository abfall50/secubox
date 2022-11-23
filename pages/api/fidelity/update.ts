import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		if (req.body.message) {
			const update = await prisma.company.update({
				where: {
					id: req.body.id
				},
				data: {
					fidelity_msg: req.body.message
				}
			})
			if (!update) {
				res.json("Error update")
				return
			}
		}
		if (req.body.image) {
			const update = await prisma.company.update({
				where: {
					id: req.body.id
				},
				data: {
					fidelity_img: req.body.image
				}
			})
			if (!update) {
				res.json("Error update")
				return
			}
		}
		if (req.body.remove) {
			if (req.body.remove === "image") {
				const update = await prisma.company.update({
					where: {
						id: req.body.id
					},
					data: {
						fidelity_img: null
					}
				})
				if (!update) {
					res.json("Error update")
					return
				}
			}
		}
	} else {
		res.json("POST ERROR")
		return
	}
	res.json("")
}