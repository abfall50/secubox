import { GetServerSideProps } from "next"
import { SyntheticEvent, useState } from "react"
import { FaArrowRight } from "react-icons/fa"
import NavBar from "../../components/pro/NavBar"
import ReclamationComp from "../../components/pro/ReclamtionComp"
import prisma from "../../libs/prisma"
import Image from "next/image"
import { getToken } from "next-auth/jwt"
import { Alert, Snackbar } from "@mui/material"

const ReclamationPage = (data: any) => {

	const { user, company, fidelity } = data

	const [inputClient, setInputClient] = useState("")
	const [error, setError] = useState("")
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

	const handleClickFidelity = async () => {
		const body = { email: inputClient, id: company.id }

		const res = await fetch("/api/fidelity/point", {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...body })
		})

		const json = await res.json()

		setInputClient("")
		if (json !== "") {
			setError(json)
			return
		}
		changeOpen()
		setSuccess("Vous avez validé l'e-mail avec succès!")
	}

	return (
		<>
			<NavBar user_id={user.id} />
			<div className="h-full flex flex-col justify-start items-center py-10 gap-4 lg:bg-bg_laptop lg:bg-cover">
				<div className="h-[15vh] flex justify-center items-center pt-5">
					<Image src={company.image} alt="Secu Logo" width={150} height={100} />
				</div>
				<span className="text-4xl font-bold pt-10">Réclamation</span>
				{(open && success !== "") &&
					<Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
						<Alert className="w-4/5" severity="success" variant="filled" onClose={handleClose}>
							{success}
						</Alert>
					</Snackbar>
				}
				<div className="w-4/5 bg-white rounded-3xl shadow-2xl shadow-black flex flex-col justify-start gap-8 my-20 lg:w-2/5 xl:w-1/3">
					<div className="w-full h-[20vh] flex flex-col justify-center items-center gap-4 pt-4">
						<div className="w-4/5 h-1/4 flex justify-evenly items-center">
							<span className="w-4/5 self-center text-lg text-yellow-500">Fidélité client:</span>
						</div>
						<input type={"text"} className="w-4/5 h-1/4 border border-black outline-0 px-2" placeholder="Entrez l'email du client" value={inputClient} onChange={(e) => setInputClient(e.target.value)} ></input>
						<button className="w-3/5 h-1/4 border-0 bg-yellow-500 text-white outline-0 flex justify-center items-center" onClick={handleClickFidelity}>Validez</button>
					</div>
					<p>{error}</p>
					<div className="flex flex-col justify-start items-center gap-8 pb-10">
						<div className="text-2xl font-medium flex justify-center items-center">
							<span className="text-2xl font-medium">Réclamation actuelle:</span>
						</div>
						{fidelity?.map((u: any) => {
							return (<ReclamationComp key={u.id} name={u.name} id_user={u.id} id_company={company.id} changeOpen={changeOpen} setSuccess={setSuccess} />)
						})}
					</div>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const token = await getToken({ req: context.req })

	let user = null
	let company = null
	let fidelity = null
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
				},
				include: {
					fidelity: true
				}
			})
		}

		if (company?.fidelity) {
			const pfidelity = company.fidelity.map(
				f => {
					if (f.claim) {
						return prisma.user.findUnique({
							where: {
								id: f.id_user
							}

						})
					}
				}
			)
			const raw_fidelity = await Promise.all(pfidelity)
			fidelity = raw_fidelity.filter(f => f !== undefined)
			if (!fidelity[0]) {
				fidelity = null
			}
		}
	}

	return {
		props: {
			user,
			company: JSON.parse(JSON.stringify(company)),
			fidelity
		}
	}
}


export default ReclamationPage