import Anchor from "../Anchor"
import Logo from "../../public/secu.png"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { SyntheticEvent, useState } from "react"
import { useRouter } from "next/router"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { NextPage } from "next"
import { Alert, Snackbar } from "@mui/material"

interface SecuboxFormProps {
	user_id: string
}

const SecuboxFormPage: NextPage<SecuboxFormProps> = (props) => {

	const { user_id } = props

	const [error, setError] = useState("")
	const [passwordVisibility, setPasswordVisibility] = useState(true)
	const [open, setOpen] = useState(false)

	const router = useRouter()

	const { register, handleSubmit, reset } = useForm()

	const resetAlert = () => {
		setError("")
	}

	const handleClose = (e: SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway")
			return
		setOpen(false)
	}

	const changeOpen = () => {
		setOpen(true)
	}

	const onSubmit = handleSubmit(async (data) => {
		resetAlert()
		const body = { ...data, id: user_id }

		const res = await fetch("/api/company/secubox", {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		})

		reset()
		changeOpen()

		const json = await res.json()
		if (json !== "") {
			setError(`${json} Veuillez réessayez.`)
			return
		}

		router.reload()
	})

	return (
		<div className="w-[100vw] h-[100vh] flex justify-center items-center lg:bg-bg_laptop lg:bg-cover">
			<div className="w-4/5 h-[700px] bg-white rounded-3xl shadow-2xl shadow-black flex flex-col justify-start gap-8 lg:w-1/3 xl:w-1/4">

				{ /* Logo */}
				<div className='w-full h-1/6 flex flex-col items-center pt-6'>
					<Anchor href="/">
						<Image src={Logo} alt="Secubox Logo" width={"250px"} height={"100px"} />
					</Anchor>
				</div>


				{ /* <ConnexionBar /> */}
				<div className="w-full h-1/6 flex justify-center items-center pt-10">
					<span className="text-4xl font-medium text-center">Connexion de votre sécubox:</span>
				</div>

				{ /* Signin Form */}
				<div className="w-full h-3/6">
					<form className="w-full h-full flex flex-col justify-center items-center" onSubmit={onSubmit}>
						{/*<div className="h-1/6"></div>*/}
						<div className="w-full h-2/6">
							<div className="w-full h-4/5 flex justify-center items-center relative">
								<input required type="text" {...register("secu_id")} className="w-10/12 h-3/5 border-solid border-[1.5px] border-black rounded-2xl p-4 text-black transition focus:outline-none focus:border-yellow-500 valid:outline-none valid:border-yellow-500 peer" />
								<label className="absolute left-[65px] top-[18px] text-black pointer-events-none translate-y-4 transition focus:outline-none focus:border-yellow-500 peer-focus:-translate-y-1/2 peer-focus:scale-[0.8] peer-focus:py-0 peer-focus:px-[0.2em] peer-focus:text-yellow-500 peer-focus:bg-white peer-valid:-translate-y-1/2 peer-valid:scale-[0.8] peer-valid:py-0 peer-valid:px-[0.2em] peer-valid:text-yellow-500 peer-valid:bg-white ">
									Identifiant
								</label>
							</div>
						</div>
						<div className="w-full h-2/6">
							<div className="w-full h-4/5 flex justify-center items-center relative">
								<input required type={passwordVisibility ? "password" : "text"} {...register("code")} className="w-10/12 h-3/5 border-solid border-[1.5px] border-black rounded-2xl p-4 text-black transition focus:outline-none focus:border-yellow-500 valid:outline-none valid:border-yellow-500 peer" />
								<label className="absolute left-[65px] top-[18px] text-black pointer-events-none translate-y-4 transition focus:outline-none focus:border-yellow-500 peer-focus:-translate-y-1/2 peer-focus:scale-[0.8] peer-focus:py-0 peer-focus:px-[0.2em] peer-focus:text-yellow-500 peer-focus:bg-white peer-valid:-translate-y-1/2 peer-valid:scale-[0.8] peer-valid:py-0 peer-valid:px-[0.2em] peer-valid:text-yellow-500 peer-valid:bg-white ">
									Code de sécurité
								</label>
								<button type="button" className="absolute right-[50px]" onClick={() => setPasswordVisibility(!passwordVisibility)}>{!passwordVisibility ? <FaEye /> : <FaEyeSlash />}</button>
							</div>
						</div>
						{(open && error !== "") &&
							<Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
								<Alert className="w-4/5" severity="error" variant="filled" onClose={handleClose}>
									{error}
								</Alert>
							</Snackbar>
						}
						<button type="submit" className="w-4/5 h-1/6 border-0 rounded-3xl bg-yellow-500 text-white">Validez</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default SecuboxFormPage