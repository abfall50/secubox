import { GetServerSideProps, NextPage } from "next";
import NavBar from "../../components/pro/NavBar";
import Image from "next/image";
import Logo from "../../public/sx.png"
import InputUpdate from "../../components/client/InputUpdate";
import prisma from "../../libs/prisma"
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { getToken } from "next-auth/jwt";

const ProfilPagePRO: NextPage = (data: any) => {

	const { user, company } = data

	const [open, setOpen] = useState(true)
	const [success, setSuccess] = useState("")

	const handleClose = (e: SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway")
			return
		setOpen(false)
	}

	const changeOpen = () => {
		setOpen(true)
	}

	return (
		<>
			<NavBar user_id={user.id} />
			<div className="flex flex-col justify-center items-center gap-8 py-10 lg:bg-bg_laptop lg:bg-cover">
				<div className="h-[15vh] flex justify-center items-center pt-5">
					<Image src={company.image} alt="Secu Logo" width={150} height={100} />
				</div>
				<div className="w-4/5 h-[70vh] bg-white rounded-3xl shadow-2xl shadow-black flex flex-col lg:w-1/3 xl:w-1/4">
					<span className="w-full h-1/6 flex justify-center items-center text-5xl bg-yellow-500 border-0 rounded-t-3xl">Profil</span>
					{(open && success !== "") &&
						<Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
							<Alert className="w-4/5" severity="success" variant="filled" onClose={handleClose}>
								Votre {success} a été modifié avec succès
							</Alert>
						</Snackbar>
					}
					<div className="w-full h-5/6 px-5 pt-5 flex flex-col justify-center items-center">
						<InputUpdate value={user.name} title="Nom" type="text" userId={user.id} open={open} setOpen={setOpen} changeOpen={changeOpen} status={user.status} setSuccess={setSuccess} />
						<InputUpdate value={user.email} title="Email" type="text" userId={user.id} open={open} setOpen={setOpen} changeOpen={changeOpen} status={user.status} setSuccess={setSuccess} />
						<InputUpdate value={user.phoneNumber} title="Numéro de téléphone" type="tel" userId={user.id} open={open} setOpen={setOpen} changeOpen={changeOpen} status={user.status} setSuccess={setSuccess} />
						<InputUpdate value="falsevalue" title="Mot de passe" type="password" userId={user.id} open={open} setOpen={setOpen} changeOpen={changeOpen} status={user.status} setSuccess={setSuccess} />
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
			},
			select: {
				email: true,
				name: true,
				phoneNumber: true,
				id: true,
				id_secu: true
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

export default ProfilPagePRO