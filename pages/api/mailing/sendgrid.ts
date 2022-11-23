import { NextApiRequest, NextApiResponse } from "next";
import sendgrid from "@sendgrid/mail"

if (process.env.SENDGRID_API_KEY)
	sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		await sendgrid.send({
			to: req.body.email,
			from: "abdouf50@gmail.com",
			subject: "Mailing",
			html: `<h2>Voici les adresses mails des clients ayant visité votre page ces 30 derniers jours: </h2>${req.body.message}`
		})
	} catch (error) {
		res.status(500).json({ error: error })
		return
	}
	res.json("")
}