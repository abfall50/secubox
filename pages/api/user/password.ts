import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma"
import { comparePass, hashPass } from "../lib/function";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const error = await validate(req)
		if (error !== "") {
			res.json(error)
		} else {
			const update = await prisma.user.update({
				where: {
					email: req.body.email
				},
				data: {
					password: hashPass(req.body.new_pwd)
				}
			})
			if (update)
				res.json("")
		}
	} else {
		res.json("ERROR METHOD")
	}
}

export function checkPassword(password: string): string {
	const isWhitespace = /^(?!.*\s)/
	if (!isWhitespace.test(password))
		return "Le mot de passe ne doit pas contenir d'espace!"
	const isUppercase = /^(?=.*[A-Z])/
	if (!isUppercase.test(password))
		return "Le mot de passe doit contenir une majuscule!"
	const isLowercase = /^(?=.*[a-z])/
	if (!isLowercase.test(password))
		return "Le mot de passe doit contenir une minuscule!"
	const isDigit = /^(?=.*[0-9])/
	if (!isDigit.test(password))
		return "Le mot de passe doit contenir un chiffre!"
	const isValidLength = /^.{8,}$/
	if (!isValidLength.test(password))
		return "Le mot de passe doit contenir minimum 8 caractères!"
	return ""
}

async function validate(req: NextApiRequest) {
	const user = await prisma.user.findUnique({
		where: {
			email: req.body.email
		}
	})
	if (user) {
		if (!comparePass(user.password, hashPass(req.body.old_pwd)))
			return "Mot de passe incorrect!"
		if (req.body.new_pwd !== req.body.confirm)
			return "Les mots de passe ne correspondent pas!"
		const error = checkPassword(req.body.new_pwd)
		if (error !== "")
			return error
		return ""
	} else {
		return "ERROR EMAIL"
	}
}