import { GetServerSideProps, NextPage } from "next";
import NavBar from "../../components/pro/NavBar";
import Image from "next/image";
import Logo from "../../public/sx.png"
import prisma from "../../libs/prisma"
import ToggleSwitch from "../../components/ToggleSwitch";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Anchor from "../../components/Anchor";
import { getToken } from "next-auth/jwt";
import { Alert, Snackbar } from "@mui/material";

const FidelityPagePRO: NextPage = (data: any) => {

	const { user, company } = data

	const router = useRouter()

	const [inputImage, setInputImage] = useState("")
	const [textValue, setTextValue] = useState(company.fidelity_msg)
	const [trash, setTrash] = useState(company.fidelity_img)
	const [switcher, setSwitcher] = useState(company.fidelity_company)
	const [success, setSuccess] = useState("")
	const [open, setOpen] = useState(false)

	const handleClose = (e: SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway")
			return
		setOpen(false)
	}

	const changeOpen = () => {
		setOpen(true)
	}

	const handleClickMessage = async () => {
		const body = { message: textValue, id: company.id }

		const res = await fetch("/api/fidelity/update", {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...body })
		})

		const json = await res.json()

		if (json !== "")
			return
		changeOpen()
		setSuccess("Le message promotionnel a été modifié avec succès!")
	}

	const handleClickImage = async () => {
		const body = { image: inputImage, id: company.id }

		const res = await fetch("/api/fidelity/update", {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...body })
		})

		const json = await res.json()

		if (json !== "")
			return
		setTrash(inputImage)
		setInputImage("")
		changeOpen()
		setSuccess("Le lien a été modifié avec succès!")
	}


	const handleRemove = async () => {
		const body = { remove: "image", id: company.id }

		const res = await fetch("/api/fidelity/update", {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...body })
		})

		const json = await res.json()

		if (json !== "")
			return
		setTrash(null)
		changeOpen()
		setSuccess("Le lien a été supprimé avec succès!")
	}

	const changeSwitch = () => {
		if (!switcher) {
			setSuccess("L'option fidélité a été activé avec succès pour ce restaurant!")
		} else {
			setSuccess("L'option fidélité a été désactivé avec succès pour ce restaurant!")
		}
		setSwitcher(!switcher)
	}

	const handleSwitch = async () => {
		const res = await fetch("/api/company/fidelity", {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ switch: !switcher, company_id: company.id })
		})

		const error = await res.json()

		if (error !== "")
			return

		changeSwitch()
		changeOpen()
	}

	return (
		<>
			<NavBar user_id={user.id} />
			<div className="flex flex-col justify-center items-center lg:bg-bg_laptop lg:bg-cover">
				<div className="h-[15vh] flex justify-center items-center py-10">
					<Image src={company.image} alt="Secu Logo" width={150} height={100} />
				</div>
				<span className="text-4xl font-bold">Fidélité</span>
				{(open && success !== "") &&
					<Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
						<Alert className="w-4/5" severity="success" variant="filled" onClose={handleClose}>
							{success}
						</Alert>
					</Snackbar>
				}
				<div className="w-4/5 h-[70vh] bg-white rounded-3xl shadow-2xl shadow-black flex flex-col justify-start my-10 lg:w-1/3 xl:w-1/4">
					<div className="w-full h-1/5 flex justify-between items-center">
						<span className="w-4/5 flex justify-start items-center text-2xl pl-10">Activer:</span>
						<div className="w-1/5 flex justify-center items-center pr-10"><ToggleSwitch checked={switcher} onClick={handleSwitch} /></div>
					</div>
					<div className="w-full h-1/5 flex justify-between items-center">
						<span className="w-4/5 flex justify-start items-center text-2xl pl-10">Réclamation:</span>
						<div className="w-2/6 h-1/3 flex justify-center items-center border-0 rounded-full bg-yellow-500 mr-10">
							<Anchor href="/pro/reclamation" className="text-xl text-center flex justify-center items-center gap-4">Allez <FaArrowRight /> </Anchor>
						</div>
					</div>
					<div className="w-full h-1/4 flex flex-col justify-center items-center">
						<div className="w-4/5 h-1/4 flex justify-between items-center">
							<span className="w-4/5 text-lg text-yellow-500">Image:</span>
							{trash && <button className="" onClick={handleRemove}><FaTrash color="red" /></button>}
						</div>
						<input type={"text"} className="w-4/5 h-1/4 border border-black outline-0 px-2" placeholder="Entrez une image promotionnelle" value={inputImage} onChange={(e) => setInputImage(e.target.value)} ></input>
						<button className="w-3/5 h-1/4 border-0 bg-yellow-500 text-white mt-2 outline-0" onClick={handleClickImage}>Validez</button>
					</div>
					<div className="w-full h-2/5 flex flex-col justify-center items-center gap-2">
						<span className="text-lg text-yellow-500">Modifier le message promotionnel: </span>
						<textarea name="welcome-update" id="welcome-update" cols={30} rows={5} placeholder="Entrez une description pour votre offre de fidélité" className="border border-black outline-0 px-2 fle" value={textValue} onChange={(e) => setTextValue(e.target.value)} ></textarea>
						<button className="w-3/5 h-[17%] border-0 bg-yellow-500 text-white" onClick={handleClickMessage}>Validez</button>
					</div>
				</div>
			</div>
		</>
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


export default FidelityPagePRO