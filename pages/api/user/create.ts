
import { cond } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../libs/prisma"
import { hashPass } from '../lib/function'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const error = await validateBody(req)
		if (error !== "") {
			res.json(error)
			return
		} else {
			const user = await prisma.user.create({
				data: {
					name: req.body.name,
					email: req.body.email,
					phoneNumber: req.body.phone_number,
					password: hashPass(req.body.password),
					status: req.body.status
				}
			})
			res.json("")
		}
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`,
		);
	}

}

async function validateBody(req: NextApiRequest) {
	const checkEmail = await prisma.user.findUnique({
		where: {
			email: req.body.email
		}
	})

	if (checkEmail)
		return "Cet email est déjà associé à un compte!"

	const checkPhone = await prisma.user.findFirst({
		where: {
			phoneNumber: req.body.phone_number
		}
	})

	if (checkPhone)
		return "Ce numéro de téléphone est déjà associé à un compte!"

	return ""
}