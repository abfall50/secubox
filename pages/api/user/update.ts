import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma"

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const body = req.body.body
	if (req.method === "POST") {
		if (body.companyName) {
			const company = await prisma.company.findUnique({
				where: {
					name: body.companyName
				}
			})
			if (company) {
				res.json("Ce nom est déjà utilisé!")
				return
			}
			const update = await prisma.company.update({
				where: {
					id: body.companyId
				},
				data: {
					name: body.companyName
				}
			})
		} else {
			if (body.email) {
				const user = await prisma.user.findUnique({
					where: {
						email: body.email
					}
				})
				if (user) {
					res.json("Cet email est déjà utilisé!")
					return
				}
				const update = await prisma.user.update({
					where: {
						id: body.id
					},
					data: {
						email: body.email
					}
				})
			} else {
				if (body.name) {
					const user = await prisma.user.update({
						where: {
							id: body.id
						},
						data: {
							name: body.name
						}
					})
				}
				if (body.phoneNumber) {
					const error = checkPhoneNumber(body.phoneNumber)
					if (error !== "") {
						res.json(error)
						return
					}
					const user = await prisma.user.update({
						where: {
							id: body.id
						},
						data: {
							phoneNumber: body.phoneNumber
						}
					})
				}
			}
		}
		res.json("")
	}
}

export function checkPhoneNumber(number: string) {
	const regexPhone = new RegExp(/^[0-9\b]+$/);

	if (!regexPhone.test(number)) {
		return ("Le numéro de téléphone est incorrect!")
	} else if (number.length !== 10) {
		return ("Le numéro de téléphone doit contenir 10 chiffres!")
	}
	return ""
}