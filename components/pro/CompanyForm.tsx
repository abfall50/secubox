import { NextPage } from "next"
import Image from "next/image"
import Anchor from "../Anchor"
import Logo from "../../public/secu.png"
import { FieldValue, useForm } from "react-hook-form"
import Router, { useRouter } from "next/router"
import { ButtonHTMLAttributes, SyntheticEvent, useEffect, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Alert, Snackbar } from "@mui/material"

interface CompanyFormProps {
	user_id: string
	secubox_id: string
}

const CompanyFormPage: NextPage<CompanyFormProps> = (props) => {

	const { user_id, secubox_id } = props

	const [error, setError] = useState("")
	const [passwordVisibility, setPasswordVisibility] = useState(true)
	const [passwordVisibility2, setPasswordVisibility2] = useState(true)
	const [open, setOpen] = useState(false)

	const { register, handleSubmit, reset, formState: { errors } } = useForm()

	const router = useRouter()

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
		const body = { ...data, user_id: user_id, secubox_id: secubox_id }

		const res = await fetch('/api/company/create', {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		})
		const json = await res.json()

		reset()
		changeOpen()

		if (json !== "") {
			setError(json)
			return
		}

		router.reload()
	})
	
	return (
		<div className="w-[100vw] h-[100vh] flex justify-center items-center lg:bg-bg_laptop lg:bg-cover">
			<div className="w-4/5 h-[700px] bg-white rounded-3xl shadow-2xl shadow-black flex flex-col lg:w-1/3 xl:w-1/4">

				{ /* Logo */}
				<div className='w-full h-1/6 flex flex-col items-center gap-8 pt-6'>
					<Anchor href="/">
						<Image src={Logo} alt="Secubox Logo" width={"250px"} height={"100px"} />
					</Anchor>
				</div>

				{ /* <ConnexionBar /> */}
				<div className="w-full h-1/6 flex justify-center items-center pt-10">
					<span className="text-3xl font-medium text-center">Configuration du restaurant:</span>
				</div>

				{ /* Signup Form */}
				<div className="w-full h-4/6">
					<form className="w-full h-full flex flex-col justify-center items-center" onSubmit={onSubmit}>
						<div className="w-full h-full">
							<div className="w-full h-full flex justify-center items-center relative">
								<input required type="text" {...register("name")} className="w-10/12 h-3/5 border-solid border-[1.5px] border-black rounded-2xl p-4 text-black transition focus:outline-none focus:border-yellow-500 valid:outline-none valid:border-yellow-500 peer" />
								<label className="absolute left-[50px] top-[10px] text-black pointer-events-none translate-y-4 transition focus:outline-none focus:border-yellow-500 peer-focus:-translate-y-1/2 peer-focus:scale-[0.8] peer-focus:py-0 peer-focus:px-[0.2em] peer-focus:text-yellow-500 peer-focus:bg-white peer-valid:-translate-y-1/2 peer-valid:scale-[0.8] peer-valid:py-0 peer-valid:px-[0.2em] peer-valid:text-yellow-500 peer-valid:bg-white ">
									Nom du restaurant
								</label>
							</div>
						</div>
						<div className="w-full h-full">
							<div className="w-full h-full flex justify-center items-center relative">
								<input required type="text" {...register("ssid1")} className="w-10/12 h-3/5 border-solid border-[1.5px] border-black rounded-2xl p-4 text-black transition focus:outline-none focus:border-yellow-500 valid:outline-none valid:border-yellow-500 peer" />
								<label className="absolute left-[50px] top-[10px] text-black pointer-events-none translate-y-4 transition focus:outline-none focus:border-yellow-500 peer-focus:-translate-y-1/2 peer-focus:scale-[0.8] peer-focus:py-0 peer-focus:px-[0.2em] peer-focus:text-yellow-500 peer-focus:bg-white peer-valid:-translate-y-1/2 peer-valid:scale-[0.8] peer-valid:py-0 peer-valid:px-[0.2em] peer-valid:text-yellow-500 peer-valid:bg-white ">
									SSID Privé
								</label>
							</div>
						</div>
						<div className="w-full h-full">
							<div className="w-full h-full flex justify-center items-center relative">
								<input required type={passwordVisibility ? "password" : "text"} {...register("password1")} className="w-10/12 h-3/5 border-solid border-[1.5px] border-black rounded-2xl p-4 text-black transition focus:outline-none focus:border-yellow-500 valid:outline-none valid:border-yellow-500 peer" />
								<label className="absolute left-[50px] top-[10px] text-black pointer-events-none translate-y-4 transition focus:outline-none focus:border-yellow-500 peer-focus:-translate-y-1/2 peer-focus:scale-[0.8] peer-focus:py-0 peer-focus:px-[0.2em] peer-focus:text-yellow-500 peer-focus:bg-white peer-valid:-translate-y-1/2 peer-valid:scale-[0.8] peer-valid:py-0 peer-valid:px-[0.2em] peer-valid:text-yellow-500 peer-valid:bg-white ">
									Mot de passe SSID Privé
								</label>
								<button type="button" className="absolute right-[50px]" onClick={() => setPasswordVisibility(!passwordVisibility)}>{!passwordVisibility ? <FaEye /> : <FaEyeSlash />}</button>
							</div>
						</div>
						<div className="w-full h-full">
							<div className="w-full h-full flex justify-center items-center relative">
								<input required type="text" {...register("ssid2")} className="w-10/12 h-3/5 border-solid border-[1.5px] border-black rounded-2xl p-4 text-black transition focus:outline-none focus:border-yellow-500 valid:outline-none valid:border-yellow-500 peer" />
								<label className="absolute left-[50px] top-[10px] text-black pointer-events-none translate-y-4 transition focus:outline-none focus:border-yellow-500 peer-focus:-translate-y-1/2 peer-focus:scale-[0.8] peer-focus:py-0 peer-focus:px-[0.2em] peer-focus:text-yellow-500 peer-focus:bg-white peer-valid:-translate-y-1/2 peer-valid:scale-[0.8] peer-valid:py-0 peer-valid:px-[0.2em] peer-valid:text-yellow-500 peer-valid:bg-white ">
								SSID Client
								</label>
							</div>
						</div>
						<div className="w-full h-full">
							<div className="w-full h-full flex justify-center items-center relative">
								<input required type={passwordVisibility2 ? "password" : "text"} {...register("password2")} className="w-10/12 h-3/5 border-solid border-[1.5px] border-black rounded-2xl p-4 text-black transition focus:outline-none focus:border-yellow-500 valid:outline-none valid:border-yellow-500 peer" />
								<label className="absolute left-[50px] top-[10px] text-black pointer-events-none translate-y-4 transition focus:outline-none focus:border-yellow-500 peer-focus:-translate-y-1/2 peer-focus:scale-[0.8] peer-focus:py-0 peer-focus:px-[0.2em] peer-focus:text-yellow-500 peer-focus:bg-white peer-valid:-translate-y-1/2 peer-valid:scale-[0.8] peer-valid:py-0 peer-valid:px-[0.2em] peer-valid:text-yellow-500 peer-valid:bg-white ">
									Mot de passe SSID Client
								</label>
								<button type="button" className="absolute right-[50px]" onClick={() => setPasswordVisibility2(!passwordVisibility2)}>{!passwordVisibility2 ? <FaEye /> : <FaEyeSlash />}</button>
							</div>
						</div>
						<p className="text-red-400 text-center mb-4">{error} {error ? "Veuillez réessayez." : ""}</p>
						{(open && error !== "") &&
							<Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
								<Alert className="w-4/5" severity="error" variant="filled" onClose={handleClose}>
									{error}
								</Alert>
							</Snackbar>
						}
						<button className="w-4/5 h-2/3 mb-4 bg-yellow-500 border-0 rounded-3xl text-white" type="submit" >Confirmez</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default CompanyFormPage