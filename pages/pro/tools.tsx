import { GetServerSideProps, NextPage } from "next";
import NavBar from "../../components/pro/NavBar";
import Image from "next/image"
import Logo from "../../public/sx.png"
import prisma from "../../libs/prisma"
import { FaArrowRight } from "react-icons/fa";
import { getToken } from "next-auth/jwt";
import { SyntheticEvent, useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const ToolPagePro: NextPage = (data: any) => {

	const { user, company, all_user } = data

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

	const createList = (users: any[]) => {
		const list = users.map(u => {
			return `<div>${u.email}</div><br />`
		}).join('')
		console.log(list)
		return list
	}

	const onClick = async () => {
		const body = { email: user.email, message: createList(all_user) }

		const res = await fetch("/api/mailing/sendgrid", {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...body })
		})

		if (res.status === 500)
			return

		changeOpen()
		setSuccess("L'e-mail a été envoyé avec succès!")
	}

	return (
		<>
			<NavBar user_id={user.id} />
			<div className="w-full h-[95vh] flex flex-col justify-center items-center py-10 lg:bg-bg_laptop lg:bg-cover">
				<div className="w-full h-[80vh] flex flex-col justify-center items-center gap-8 lg:w-3/5">
					<div className="h-[15vh] flex justify-center items-center pt-5">
						<Image src={company.image} alt="Secu Logo" width={150} height={100} />
					</div>
					{(open && success !== "") &&
						<Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
							<Alert className="w-4/5" severity="success" variant="filled" onClose={handleClose}>
								{success}
							</Alert>
						</Snackbar>
					}

					<span className="text-4xl font-bold">Outils promotionnels</span>
					<div className="w-full h-1/3 flex justify-between items-center pt-16 pr-5 lg:pr-0">
						<span className="text-3xl font-medium pl-10 lg:text-2xl">Qrcode:</span>
						<div className="w-2/6 h-1/3 flex justify-center items-center border-0 rounded-full bg-yellow-500 lg:w-1/6 lg:h-1/3">
							<button className="text-xl text-center">Générez</button>
						</div>
					</div>
					{/*<div className="w-full flex justify-between items-center pt-16">
						<span className="text-3xl font-medium pl-10 lg:text-2xl">URL:</span>
						<span className="w-1/2 h-2/3 mr-10 flex justify-end items-center text-xl bg-white rounded-full lg:w-1/3 lg:h-2/3">{process.env.NEXT_PUBLIC_VERCEL_URL}</span>
	</div>*/}
					<div className="w-full h-1/3 flex justify-between items-center pt-16 pr-5 lg:pr-0">
						<span className="text-3xl font-medium pl-10 lg:text-2xl">Mailing:</span>
						<div className="w-2/6 h-1/3 flex justify-center items-center border-0 rounded-full bg-yellow-500 lg:w-1/6 lg:h-1/3">
							<button className="text-xl text-center flex justify-center items-center gap-2" onClick={onClick}>Envoyer <FaArrowRight /> </button>
						</div>
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

	const fidelity = await prisma.fidelity.findMany({
		where: {
			id_company: company?.id
		},
		orderBy: {
			last_connection: "desc"
		}
	})

	const pfidelity = fidelity.map(f => {
		return prisma.user.findUnique({
			where: {
				id: f.id_user
			}
		})
	})

	const all_user = await Promise.all(pfidelity)

	return {
		props: {
			user,
			company,
			all_user
		}
	}
}

export default ToolPagePro