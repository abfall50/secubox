import Anchor from "../../components/Anchor"
import Image from "next/image"
import Logo from "../../public/secu.png"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { signIn, useSession } from "next-auth/react"
import { SyntheticEvent, useState } from "react"
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa"
import { Alert, Snackbar } from "@mui/material"

const Signin = () => {

	const [error, setError] = useState("")
	const [passwordVisibility, setPasswordVisibility] = useState(true)
	const [open, setOpen] = useState(false)

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
	}

	const onSubmit = handleSubmit(async (data) => {
		resetAlert()
		let body = { ...data }
		body = { ...body, status: "admin" }

		let res = await signIn("credentials", {
			...body,
			redirect: false
		})

		if (res && !res.ok) {
			reset()
			changeOpen()
			setError("L'email/mot de passe est incorrect! Veuillez réessayer.")
			return
		}

		router.push("/admin/home")
	});

	return (
		<div className="w-[100vw] h-[100vh] flex justify-center items-center lg:bg-bg_laptop lg:bg-cover">
			<div className="w-4/5 h-[700px] bg-white rounded-3xl shadow-2xl shadow-black flex flex-col lg:w-1/3 xl:w-1/4">

				{ /* Logo */}
				<div className='w-full h-1/6 flex flex-col justify-center items-center'>
					<Anchor href="/">
						<Image src={Logo} alt="Secubox Logo" width={"180px"} height={"70px"} />
					</Anchor>
				</div>

				{ /* <ConnexionBar /> */}
				<div className="w-full h-1/6 flex justify-center items-center">
					<div className="w-1/2 h-full">
						<span className="w-full h-full flex justify-center items-center text-3xl font-bold">Administration</span>
					</div>
				</div>

				{ /* Signin Form */}
				<div className="w-full h-3/6">
					<form className="w-full h-full flex flex-col justify-center items-center" onSubmit={onSubmit}>
						{/*<div className="h-1/6"></div>*/}
						<div className="w-full h-2/6">
							<div className="w-full h-4/5 flex justify-center items-center relative">
								<input required type="text" {...register("email")} className="w-10/12 h-3/5 border-solid border-[1.5px] border-black rounded-2xl p-4 text-black transition focus:outline-none focus:border-yellow-500 valid:outline-none valid:border-yellow-500 peer" />
								<label className="absolute left-[65px] top-[18px] text-black pointer-events-none translate-y-4 transition focus:outline-none focus:border-yellow-500 peer-focus:-translate-y-1/2 peer-focus:scale-[0.8] peer-focus:py-0 peer-focus:px-[0.2em] peer-focus:text-yellow-500 peer-focus:bg-white peer-valid:-translate-y-1/2 peer-valid:scale-[0.8] peer-valid:py-0 peer-valid:px-[0.2em] peer-valid:text-yellow-500 peer-valid:bg-white ">
									Email
								</label>
							</div>
						</div>
						<div className="w-full h-2/6">
							<div className="w-full h-4/5 flex justify-center items-center relative">
								<input required type={passwordVisibility ? "password" : "text"} {...register("password")} className="w-10/12 h-3/5 border-solid border-[1.5px] border-black rounded-2xl p-4 text-black transition focus:outline-none focus:border-yellow-500 valid:outline-none valid:border-yellow-500 peer" />
								<label className="absolute left-[65px] top-[18px] text-black pointer-events-none translate-y-4 transition focus:outline-none focus:border-yellow-500 peer-focus:-translate-y-1/2 peer-focus:scale-[0.8] peer-focus:py-0 peer-focus:px-[0.2em] peer-focus:text-yellow-500 peer-focus:bg-white peer-valid:-translate-y-1/2 peer-valid:scale-[0.8] peer-valid:py-0 peer-valid:px-[0.2em] peer-valid:text-yellow-500 peer-valid:bg-white ">
									Mot de passe
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
						<button type="submit" className="w-4/5 h-1/6 border-0 rounded-3xl bg-yellow-500 text-white">Connectez-vous</button>
					</form>
				</div>

				{ /* Mot de passe oublié */}
				<div className="w-full flex justify-center">
					<Anchor href="/" className="underline font-medium">Mot de passe oublié?</Anchor>
				</div>
			</div>
		</div>
	)
}

export default Signin