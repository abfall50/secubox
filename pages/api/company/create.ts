import { compact } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma"
import { hashPass } from "../lib/function";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log(req.body)
	if (req.method === "POST") {
		const verify = await prisma.company.findUnique({
			where: {
				name: req.body.name
			}
		})

		if (verify) {
			res.json("Ce nom est déjà utilisé! Veuillez réessayer.")
			return
		}

		const company = await prisma.company.create({
			data: {
				id_user: req.body.user_id,
				id_secubox: req.body.secubox_id,
				name: req.body.name,
				welcome_msg: `Bienvenue chez ${req.body.name}. Profitez du wifi gratuit et des bons plans actuellement disponibles!`,
				ssid_company: req.body.ssid1,
				ssid_client: req.body.ssid2,
				password_ssid1: hashPass(req.body.password1),
				password_ssid2: hashPass(req.body.password2)
			}
		})
		
		if (!company) {
			res.json("Une erreur s'est produite! Veuillez réessayer.")
			return
		}
	} else {
		res.json("POST ERROR")
	}
	res.json("")
}