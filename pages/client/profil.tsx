import { GetServerSideProps, NextPage } from "next";
import NavBar from "../../components/client/NavBar";
import Image from "next/image";
import Logo from "../../public/sx.png"
import InputUpdate from "../../components/client/InputUpdate";
import { useSession } from "next-auth/react";
import prisma from "../../libs/prisma"
import { Alert, Snackbar } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken } from "next-auth/jwt";

const ProfilPageCLI: NextPage = (data: any) => {

	const { user } = data

	const [open, setOpen] = useState(false)
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
			<div className="h-[95vh] flex justify-center items-center py-10 lg:bg-bg_laptop lg:bg-cover">
				<div className="w-4/5 h-[80vh] bg-white rounded-3xl shadow-2xl shadow-black flex flex-col justify-center items-center gap-4 lg:w-1/3 xl:w-1/4">
					<span className="w-full h-1/6 flex justify-center items-center text-5xl bg-yellow-500 border-0 rounded-t-3xl">Profil</span>
					{(open && success !== "") &&
						<Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
							<Alert className="w-4/5" severity="success" variant="filled" onClose={handleClose}>
								Votre {success} a été modifié avec succès
							</Alert>
						</Snackbar>
					}
					<div className="w-full h-5/6 px-5 pt-5 flex flex-col justify-center items-center">
						<InputUpdate value={user?.name || "Error"} title="Nom" type="text" userId={user.id} open={open} setOpen={setOpen} changeOpen={changeOpen} status={user.status} setSuccess={setSuccess} />
						<InputUpdate value={user?.email || "Error"} title="Email" type="text" userId={user.id} open={open} setOpen={setOpen} changeOpen={changeOpen} status={user.status} setSuccess={setSuccess} />
						<InputUpdate value={user?.phoneNumber || "Error"} title="Numéro de téléphone" type="tel" userId={user.id} open={open} setOpen={setOpen} changeOpen={changeOpen} status={user.status} setSuccess={setSuccess} />
						<InputUpdate value="falsevalue" title="Mot de passe" type="password" userId={user.id} open={open} changeOpen={changeOpen} setOpen={setOpen} status={user.status} setSuccess={setSuccess} />
					</div>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const token = await getToken({ req: context.req })

	let user
	if (token?.sub) {
		user = await prisma.user.findUnique({
			where: {
				id: token?.sub
			},
			select: {
				email: true,
				name: true,
				phoneNumber: true,
				id: true,
				status: true
			}
		})
	}

	return {
		props: {
			user
		}
	}
}

export default ProfilPageCLI