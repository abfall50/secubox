import { GetServerSideProps, NextPage } from "next";
import NavBar from "../../../components/admin/NavBar";
import Image from "next/image";
import Logo from "../../../public/sx.png"
import prisma from "../../../libs/prisma";
import ToggleSwitch from "../../../components/ToggleSwitch";
import { FaArrowLeft, FaArrowRight, FaTrash } from "react-icons/fa";
import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Anchor from "../../../components/Anchor";
import { getToken } from "next-auth/jwt";
import { Alert, Snackbar } from "@mui/material";

const ManangeCompanyPage: NextPage = (data: any) => {

	const { company } = data

	const [switcher, setSwitcher] = useState(company.fidelity_admin)
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

	const changeSwitch = () => {
		if (!switcher) {
			setSuccess("L'option fidélité a été activé avec succès!")
		} else {
			setSuccess("L'option fidélité a été désactivé avec succès!")
		}
		setSwitcher(!switcher)
	}

	const handleSwitch = async () => {
		const res = await fetch("/api/admin/fidelity", {
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
			<NavBar user_id={company?.id} />
			<div className="flex flex-col justify-center items-center lg:bg-bg_laptop lg:bg-cover">
				<div className="h-[15vh] flex justify-center items-center py-20">
					<Image src={company.image} alt="Secu Logo" width={150} height={100} />
				</div>
				{(open && success !== "") &&
					<Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
						<Alert className="w-4/5" severity="success" variant="filled" onClose={handleClose}>
							{success}
						</Alert>
					</Snackbar>
				}
				<div className="w-4/5 h-[70vh] bg-white rounded-3xl shadow-2xl shadow-black flex flex-col justify-start my-10 lg:w-1/3 xl:w-1/4">
					<div className="w-2/5 h-[10%] flex justify-start items-center pt-6 pl-10">
						<Anchor href="/admin/gerer" className="w-full flex justify-center items-center">
							<FaArrowLeft color="#EAB308" />
							<span className="text-xl text-yellow-500 flex pl-2 underline lg:no-underline hover:underline lg:hover:text-2xl">Retour</span>
						</Anchor>
					</div>
					<span className="text-center text-4xl font-bold py-10">{company.name}</span>
					<div className="w-full h-1/5 flex justify-between items-center">
						<span className="w-4/5 flex justify-start items-center text-2xl pl-10">Activer:</span>
						<div className="w-1/5 flex justify-center items-center pr-10"><ToggleSwitch checked={switcher} onClick={handleSwitch} /></div>
					</div>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {

	const { id } = context.query

	const new_id = String(id)

	let company = null
	if (id) {
		company = await prisma.company.findUnique({
			where: {
				id: new_id
			}
		})
	}

	return {
		props: {
			company
		}
	}
}


export default ManangeCompanyPage