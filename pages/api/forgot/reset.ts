import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "../../../libs/prisma"
import { hashPass } from "../lib/function";
import { checkPassword } from "../user/password";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	if (req.body.new_password !== req.body.confirm) {
		res.json("Les mots de passe ne correspondent pas!")
		return
	}

	const error = checkPassword(req.body.new_password)
	if (error !== "") {
		res.json(error)
		return
	}

	let secret = ""
	if (process.env.JWT_RECOVER_SECRET)
		secret = process.env.JWT_RECOVER_SECRET

	try {
		const token = jwt.verify(req.body.token, secret)

		if (token) {
			const update = await prisma.user.update({
				where: {
					email: req.body.email
				},
				data: {
					password: hashPass(req.body.new_password)
				}
			})
		}
	} catch (e) {
		res.json(e)
		return
	}
	res.json("")
}