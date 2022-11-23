import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import sendgrid from "@sendgrid/mail"
import prisma from "../../../libs/prisma"

if (process.env.SENDGRID_API_KEY)
	sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	const user = await prisma.user.findUnique({
		where: {
			email: req.body.email
		}
	})

	if (!user) {
		res.json("Email incorrect! Veuillez réessayer.")
		return 
	}

	let secret = ""
	if (process.env.JWT_RECOVER_SECRET)
		secret = process.env.JWT_RECOVER_SECRET
	const token = jwt.sign({ email: req.body.email }, secret, { expiresIn: 60 * 60 })

	try {
		await sendgrid.send({
			to: req.body.email,
			from: "abdouf50@gmail.com",
			subject: "Récupération de mot de passe",
			html: `<h2>Voici le lien pour réinitialiser votre mot de passe (attention ce lien expirera dans 30 minutes): </h2>
					<p>${process.env.NEXT_PUBLIC_VERCEL_URL}/forgot-password/${token}/${req.body.email}</p>		
					`
		})
	} catch (error) {
		res.status(500).json({ error: error })
		return
	}
	res.json("")
}