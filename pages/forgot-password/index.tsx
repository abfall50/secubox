import { FaArrowLeft } from "react-icons/fa"
import Anchor from "../../components/Anchor"
import Image from "next/image"
import Logo from "../../public/secu.png"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import { SyntheticEvent, useState } from "react"
import { Alert, Snackbar } from "@mui/material"


const ResetPassword = () => {

	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const [success, setSuccess] = useState("")
	const [error, setError] = useState("")

	const router = useRouter()
	const { register, handleSubmit, reset } = useForm()

	const handleClose = (e: SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway")
			return
		setOpen(false)
	}

	const changeOpen = () => {
		setOpen(true)
	}

	const resetAlert = () => {
		setError("")
		setSuccess("")
	}

	const onSubmit = handleSubmit(async (data) => {
		resetAlert()
		let body = { ...data }
		setLoading(true)

		const res = await fetch("/api/forgot/recover", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...body })
		})

		const error = await res.json()

		reset()
		changeOpen()
		setLoading(false)

		if (error !== "") {
			setError(error)
			return
		}

		if (res.status === 500) {
			setError("Erreur: L'envoie a échoué! Veuillez réessayer.")
			return
		}

		setSuccess("L'e-mail a été envoyé avec succès!")
	});

	return (
		<div className="w-[100vw] h-[100vh] flex justify-center items-center lg:bg-bg_laptop lg:bg-cover">
			<div className="w-4/5 h-[450px] bg-white rounded-3xl shadow-2xl shadow-black flex flex-col justify-evenly lg:w-1/3 xl:w-1/4">

				{(open && success !== "") &&
					<Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
						<Alert className="w-4/5" severity="success" variant="filled" onClose={handleClose}>
							{success}
						</Alert>
					</Snackbar>
				}
				{(open && error !== "") &&
					<Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
						<Alert className="w-4/5" severity="error" variant="filled" onClose={handleClose}>
							{error}
						</Alert>
					</Snackbar>
				}

				{ /* Retour */}
				<div className="w-2/5 h-[10%] flex justify-start items-center pl-10">
					<Anchor href={`/auth/${router.query.back}/signin`} className="w-full flex justify-center items-center">
						<FaArrowLeft color="#EAB308" />
						<span className="text-xl text-yellow-500 flex pl-2 underline lg:no-underline hover:underline lg:hover:text-2xl">Retour</span>
					</Anchor>
				</div>

				{ /* Logo */}
				<div className='w-full h-1/6 flex flex-col justify-center items-center'>
					<Anchor href="/">
						<Image src={Logo} alt="Secubox Logo" width={"180px"} height={"70px"} />
					</Anchor>
				</div>

				{ /* Signin Form */}
				<div className="w-full h-4/6">
					<form className="w-full h-full flex flex-col justify-center items-center gap-8" onSubmit={onSubmit}>
						{/*<div className="h-1/6"></div>*/}
						<div className="w-full h-2/6">
							<div className="w-full h-4/5 flex justify-center items-center relative">
								<input required type="text" {...register("email")} className="w-10/12 h-3/5 border-solid border-[1.5px] border-black rounded-2xl p-4 text-black transition focus:outline-none focus:border-yellow-500 valid:outline-none valid:border-yellow-500 peer" />
								<label className="absolute left-[65px] top-[12px] text-black pointer-events-none translate-y-4 transition focus:outline-none focus:border-yellow-500 peer-focus:-translate-y-1/2 peer-focus:scale-[0.8] peer-focus:py-0 peer-focus:px-[0.2em] peer-focus:text-yellow-500 peer-focus:bg-white peer-valid:-translate-y-1/2 peer-valid:scale-[0.8] peer-valid:py-0 peer-valid:px-[0.2em] peer-valid:text-yellow-500 peer-valid:bg-white ">
									Email
								</label>
							</div>
						</div>
						<button type="submit" className="w-4/5 h-1/6 border-0 rounded-3xl bg-yellow-500 text-white">{!loading ? "Envoyer l'e-mail" : "Envoie..."}</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default ResetPassword