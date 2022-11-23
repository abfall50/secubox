import { NextPage } from "next"
import Image from "next/image"
import Anchor from "../../../components/Anchor"
import ConnexionBar from "../../../components/ConnexionBar"
import Logo from "../../../public/secu.png"
import { FieldValue, useForm } from "react-hook-form"
import Router, { useRouter } from "next/router"
import { ButtonHTMLAttributes, SyntheticEvent, useEffect, useState } from "react"
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa"
import { Alert, Snackbar } from "@mui/material"

interface FormValues {
	name: string,
	email: string,
	phone_number: string,
	password: string,
	confirm: string,
}

const Signup: NextPage = () => {

	const [passwordVisibility, setPasswordVisibility] = useState(true)
	const [open, setOpen] = useState(false)
	const [success, setSuccess] = useState("")
	const [error, setError] = useState("")

	const { register, handleSubmit, reset, formState: { errors } } = useForm()
	const router = useRouter()

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

	useEffect(() => {
		if (errors.email)
			setError("Le format d'email est invalide!")
	}, [errors])

	const checkPassword = (password: string): boolean => {
		const isWhitespace = /^(?!.*\s)/
		if (!isWhitespace.test(password)) {
			setError("Le mot de passe ne doit pas contenir d'espace!")
			return false
		}
		const isUppercase = /^(?=.*[A-Z])/
		if (!isUppercase.test(password)) {
			setError("Le mot de passe doit contenir une majuscule!")
			return false
		}
		const isLowercase = /^(?=.*[a-z])/
		if (!isLowercase.test(password)) {
			setError("Le mot de passe doit contenir une minuscule!")
			return false
		}
		const isDigit = /^(?=.*[0-9])/
		if (!isDigit.test(password)) {
			setError("Le mot de passe doit contenir un chiffre!")
			return false
		}
		const isValidLength = /^.{8,}$/
		if (!isValidLength.test(password)) {
			setError("Le mot de passe doit contenir minimum 8 caractères!")
			return false
		}
		return true
	}

	const validateForm = (values: FormValues): boolean => {
		setError("")
		const regexPhone = new RegExp(/^[0-9\b]+$/);


		if (errors.email) {
			setError("Le format d'email est invalide!")
			return false
		}
		/*if (!isValidPhoneNumber(values.phone_number)) {
			setError("Le numéro de téléphone n'est pas valide!")
			return false
		}*/
		if (!regexPhone.test(values.phone_number)) {
			setError("Le numéro de téléphone est incorrect!")
			return false
		} else if (values.phone_number.length != 10) {
			setError("Le numéro de téléphone doit contenir 10 chiffres!")
			return false
		}
		if (values.password !== values.confirm) {
			setError("Les mots de passe ne correspondent pas!")
			return false
		}
		/*if (!regexTest.test(values.password)) {
			setError("Le mot de passe doit contenir au moins 1 minuscule, 1 majuscule, 1 chiffre et minimum 8 caractères!")
			return false
		}*/
		if (!checkPassword(values.password)) {
			return false
		}
		return true
	}

	// Can use getStaticProps... instead
	const onSubmit = handleSubmit(async (data) => {
		resetAlert()
		let body = { ...data }
		body = { ...body, status: "company" }
		const values: FormValues = { name: body.name, email: body.email, phone_number: body.phone_number, password: body.password, confirm: body.confirm }

		if (!validateForm(values)) {
			changeOpen()
			reset()
			return
		}

		const res = await fetch('/api/user/create', {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		})

		changeOpen()
		reset()

		const response = await res.json()
		if (response !== "") {
			setError(response)
			return
		}

		setSuccess("Vous vous êtes inscrit avec succès!")
		//router.push('/auth/pro/signin')
	})

	return (
		<div className="w-[100vw] h-[100vh] flex justify-center items-center lg:bg-bg_laptop lg:bg-cover">
			<div className="w-4/5 h-[700px] bg-white rounded-3xl shadow-2xl shadow-black flex flex-col lg:w-1/3 xl:w-1/4">

				{ /* Retour */}
				<div className="w-2/5 h-[10%] flex justify-start items-center pt-6 pl-10">
					<Anchor href="/" className="w-full flex justify-center items-center">
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

				{ /* <ConnexionBar /> */}
				<div className="w-full h-1/6 flex">
					<div className="w-1/2 h-full">
						<Anchor href="/auth/pro/signin" className="w-full h-full flex justify-center items-center text-xl hover:text-2xl hover:underline">Se connecter</Anchor>
					</div>
					<div className="w-1/2 h-full">
						<Anchor href="/auth/pro/signup" className="w-full h-full flex justify-center items-center text-2xl underline text-yellow-500 font-bold">S&apos;inscrire</Anchor>
					</div>
				</div>

				{ /* Signup Form */}
				<div className="w-full h-5/6">
					<form className="w-full h-full flex flex-col justify-center items-center" onSubmit={onSubmit}>
						<div className="w-full h-full">
							<div className="w-full h-full flex justify-center items-center relative">
								<input required type="text" {...register("name")} className="w-10/12 h-3/5 border-solid border-[1.5px] border-black rounded-2xl p-4 text-black transition focus:outline-none focus:border-yellow-500 valid:outline-none valid:border-yellow-500 peer" />
								<label className="absolute left-[50px] top-[10px] text-black pointer-events-none translate-y-4 transition focus:outline-none focus:border-yellow-500 peer-focus:-translate-y-1/2 peer-focus:scale-[0.8] peer-focus:py-0 peer-focus:px-[0.2em] peer-focus:text-yellow-500 peer-focus:bg-white peer-valid:-translate-y-1/2 peer-valid:scale-[0.8] peer-valid:py-0 peer-valid:px-[0.2em] peer-valid:text-yellow-500 peer-valid:bg-white ">
									Prénom
								</label>
							</div>
						</div>
						<div className="w-full h-full">
							<div className="w-full h-full flex justify-center items-center relative">
								<input required type="text" {...register("email", { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} className="w-10/12 h-3/5 border-solid border-[1.5px] border-black rounded-2xl p-4 text-black transition focus:outline-none focus:border-yellow-500 valid:outline-none valid:border-yellow-500 peer" />
								<label className="absolute left-[50px] top-[10px] text-black pointer-events-none translate-y-4 transition focus:outline-none focus:border-yellow-500 peer-focus:-translate-y-1/2 peer-focus:scale-[0.8] peer-focus:py-0 peer-focus:px-[0.2em] peer-focus:text-yellow-500 peer-focus:bg-white peer-valid:-translate-y-1/2 peer-valid:scale-[0.8] peer-valid:py-0 peer-valid:px-[0.2em] peer-valid:text-yellow-500 peer-valid:bg-white ">
									E-mail
								</label>
							</div>
						</div>
						<div className="w-full h-full">
							<div className="w-full h-full flex justify-center items-center relative">
								<input required type="tel" {...register("phone_number")} className="w-10/12 h-3/5 border-solid border-[1.5px] border-black rounded-2xl p-4 text-black transition focus:outline-none focus:border-yellow-500 valid:outline-none valid:border-yellow-500 peer" />
								<label className="absolute left-[50px] top-[10px] text-black pointer-events-none translate-y-4 transition focus:outline-none focus:border-yellow-500 peer-focus:-translate-y-1/2 peer-focus:scale-[0.8] peer-focus:py-0 peer-focus:px-[0.2em] peer-focus:text-yellow-500 peer-focus:bg-white peer-valid:-translate-y-1/2 peer-valid:scale-[0.8] peer-valid:py-0 peer-valid:px-[0.2em] peer-valid:text-yellow-500 peer-valid:bg-white ">
									Téléphone portable
								</label>
							</div>
						</div>
						<div className="w-full h-full">
							<div className="w-full h-full flex justify-center items-center relative">
								<input required type={passwordVisibility ? "password" : "text"} {...register("password")} className="w-10/12 h-3/5 border-solid border-[1.5px] border-black rounded-2xl p-4 text-black transition focus:outline-none focus:border-yellow-500 valid:outline-none valid:border-yellow-500 peer" />
								<label className="absolute left-[50px] top-[10px] text-black pointer-events-none translate-y-4 transition focus:outline-none focus:border-yellow-500 peer-focus:-translate-y-1/2 peer-focus:scale-[0.8] peer-focus:py-0 peer-focus:px-[0.2em] peer-focus:text-yellow-500 peer-focus:bg-white peer-valid:-translate-y-1/2 peer-valid:scale-[0.8] peer-valid:py-0 peer-valid:px-[0.2em] peer-valid:text-yellow-500 peer-valid:bg-white ">
									Mot de passe
								</label>
								<button type="button" className="absolute right-[50px]" onClick={() => setPasswordVisibility(!passwordVisibility)}>{!passwordVisibility ? <FaEye /> : <FaEyeSlash />}</button>
							</div>
						</div>
						<div className="w-full h-full">
							<div className="w-full h-full flex justify-center items-center relative">
								<input required type={passwordVisibility ? "password" : "text"} {...register("confirm")} className="w-10/12 h-3/5 border-solid border-[1.5px] border-black rounded-2xl p-4 text-black transition focus:outline-none focus:border-yellow-500 valid:outline-none valid:border-yellow-500 peer" />
								<label className="absolute left-[50px] top-[10px] text-black pointer-events-none translate-y-4 transition focus:outline-none focus:border-yellow-500 peer-focus:-translate-y-1/2 peer-focus:scale-[0.8] peer-focus:py-0 peer-focus:px-[0.2em] peer-focus:text-yellow-500 peer-focus:bg-white peer-valid:-translate-y-1/2 peer-valid:scale-[0.8] peer-valid:py-0 peer-valid:px-[0.2em] peer-valid:text-yellow-500 peer-valid:bg-white ">
									Confirmez votre mot de passe
								</label>
							</div>
						</div>
						{(open && success !== "") &&
							<Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
								<Alert className="w-4/5" severity="success" variant="filled" onClose={handleClose}>
									{success} <Anchor href="/auth/client/signin" className="underline">Connectez vous ici!</Anchor>
								</Alert>
							</Snackbar>
						}
						{(open && error !== "") &&
							<Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
								<Alert className="w-4/5" severity="error" variant="filled" onClose={handleClose}>
									{error} Veuillez réessayez.
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

export default Signup