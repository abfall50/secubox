import { GetServerSideProps, NextPage } from "next";
import NavBar from "../../components/pro/NavBar";
import Image from "next/image";
import Logo from "../../public/sx.png"
import { FaPen, FaTrash } from "react-icons/fa";
import InputUpdate from "../../components/client/InputUpdate";
import { SyntheticEvent, useEffect, useState } from "react";
import prisma from "../../libs/prisma"
import LinkUpdate from "../../components/pro/LinkUpdate";
import { useRouter } from "next/router";
import { Alert, Snackbar } from "@mui/material";
import { getToken } from "next-auth/jwt";

const GestionPagePRO: NextPage = (data: any) => {

	const { user, company } = data

	const [open, setOpen] = useState(false)
	const [textValue, setTextValue] = useState(company.welcome_msg)
	const [success, setSuccess] = useState("")

	const handleClose = (e: SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway")
			return
		setOpen(false)
	}

	const changeOpen = () => {
		setOpen(true)
	}

	const handleClick = async () => {
		const body = { message: textValue, companyId: company.id }

		const res = await fetch("/api/company/updateWelcome", {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...body })
		})

		const data = await res.json()

		if (data !== "")
			return

		changeOpen()
		setSuccess("Le message d'accueil a été modifié avec succès!")
	}

	return (
		<div className="h-[100%]">
			<NavBar user_id={user.id} />
			<div className="flex flex-col justify-center items-center py-10 lg:bg-bg_laptop lg:bg-cover">
				<div className="h-[15vh] flex justify-center items-center">
					<Image src={company.image} alt="Secu Logo" width={150} height={100} />
				</div>
				{(open && success !== "") &&
					<Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
						<Alert className="w-4/5" severity="success" variant="filled" onClose={handleClose}>
							{success}
						</Alert>
					</Snackbar>}
				<div className="w-full flex flex-col justify-center items-center gap-8 lg:flex-row">
					<div className="w-4/5 h-[60vh] bg-white rounded-3xl shadow-2xl shadow-black flex flex-col justify-center items-center my-10 lg:w-1/3 xl:w-1/4">
						<div className="w-4/5 h-1/4 flex flex-col justify-center items-center">
							<InputUpdate value={company.name} title="Nom du restaurant" type="text" userId={user.id} companyId={company.id} open={open} setOpen={setOpen} changeOpen={changeOpen} setSuccess={setSuccess} />
						</div>
						<div className="w-4/5 h-3/4 flex flex-col justify-evenly items-center">
							<span className="text-lg text-yellow-500">Modifier le message d&apos;accueil: </span>
							<textarea name="welcome-update" id="welcome-update" cols={25} rows={7} className="border border-black outline-0 px-2" value={textValue} onChange={(e) => setTextValue(e.target.value)} ></textarea>
							<button className="w-4/5 h-[5vh] border-0 bg-yellow-500 text-white" onClick={handleClick}>Validez</button>
						</div>
					</div>


					<div className="w-4/5 h-[60vh] bg-white rounded-3xl shadow-2xl shadow-black flex flex-col justify-evenly my-10 lg:w-1/3 xl:w-1/4">
						<LinkUpdate title="Menu:" placeholder="Entrez un lien pour le menu" link={company.menu} companyId={company.id} changeOpen={changeOpen} setSuccess={setSuccess} />
						<LinkUpdate title="Avis:" placeholder="Entrez un lien pour les avis" link={company.reviews} companyId={company.id} changeOpen={changeOpen} setSuccess={setSuccess} />
						<LinkUpdate title="Image:" placeholder="Entrez un lien pour le logo" link={company.image} companyId={company.id} changeOpen={changeOpen} setSuccess={setSuccess} />
					</div>
				</div>

			</div>

		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const token = await getToken({ req: context.req })

	let user
	let company
	if (token?.sub) {
		user = await prisma.user.findUnique({
			where: {
				id: token.sub
			}
		})
		if (user?.id_secu) {
			company = await prisma.company.findUnique({
				where: {
					id_secubox: user.id_secu
				}
			})
		}
	}


	return {
		props: {
			user,
			company
		}
	}
}

export default GestionPagePRO