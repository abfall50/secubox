import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		if (req.body.menu) {
			const update = await prisma.company.update({
				where: {
					id: req.body.companyId
				},
				data: {
					menu: req.body.menu
				}
			})
		}
		if (req.body.avis) {
			const update = await prisma.company.update({
				where: {
					id: req.body.companyId
				},
				data: {
					reviews: req.body.avis
				}
			})
		}
		if (req.body.image) {
			const update = await prisma.company.update({
				where: {
					id: req.body.companyId
				},
				data: {
					image: req.body.image
				}
			})
		}
		if (req.body.remove) {
			if (req.body.remove === "menu") {
				const update = await prisma.company.update({
					where: {
						id: req.body.companyId
					},
					data: {
						menu: null
					}
				})
			}
			if (req.body.remove === "avis") {
				const update = await prisma.company.update({
					where: {
						id: req.body.companyId
					},
					data: {
						reviews: null
					}
				})
			}
			if (req.body.remove === "image") {
				const update = await prisma.company.update({
					where: {
						id: req.body.companyId
					},
					data: {
						image: null
					}
				})
			}
		}
	} else {
		res.json("POST ERROR")
	}
	res.json("")
}