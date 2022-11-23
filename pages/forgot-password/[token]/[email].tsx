import { Alert, Snackbar } from "@mui/material"
import { useRouter } from "next/router"
import { SyntheticEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import styles1 from "../../../components/client/InputUpdate.module.css"


const ForgotPasswordPage = () => {

	const [passwordVisibility, setPasswordVisibility] = useState(true)
	const [open, setOpen] = useState(false)
	const [error, setError] = useState("")

	const { register, handleSubmit, reset, formState: { errors } } = useForm()

	const router = useRouter()

	const { token, email } = router.query

	const handleClose = (e: SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway")
			return
		setOpen(false)
	}

	const changeOpen = () => {
		setOpen(true)
	}

	const onSubmit = handleSubmit(async (data) => {
		setError("")
		const body = { token, email, new_password: data.new_pwd, confirm: data.confirm }

		const res = await fetch("/api/forgot/reset", {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...body })
		})
		const error = await res.json()

		reset()
		changeOpen()

		if (error !== "") {
			setError(error)
			return
		}

		router.push("/")
	})

	return (
		<>
			<div className="h-[100vh] flex justify-center items-center py-10 lg:bg-bg_laptop lg:bg-cover">
				<div className="w-4/5 h-[80vh] bg-white rounded-3xl shadow-2xl shadow-black flex flex-col justify-center items-center gap-8 lg:w-1/3 xl:w-1/4">
					<div className="w-full h-2/6 flex justify-center items-center rounded-t-3xl bg-yellow-500">
						<span className="text-4xl text-center font-medium">Entrez votre nouveau mot de passe</span>
					</div>
					<form onSubmit={onSubmit} className="h-full w-full flex flex-col justify-center items-center">

						<div className="w-5/6 h-1/4 flex justify-between items-center">
							<div className={styles1.group}>
								<input required {...register("new_pwd")} type={passwordVisibility ? "password" : "text"} className={styles1.input} />
								<span className={styles1.highlight}></span>
								<span className={styles1.bar}></span>
								<label className={styles1.label}>Nouveau mot de passe</label>
							</div>
							<button type="button" onClick={() => setPasswordVisibility(!passwordVisibility)}>{!passwordVisibility ? <FaEye /> : <FaEyeSlash />}</button>
						</div>

						<div className="w-5/6 h-1/4 flex justify-between items-center">
							<div className={styles1.group}>
								<input required {...register("confirm")} type={passwordVisibility ? "password" : "text"} className={styles1.input} />
								<span className={styles1.highlight}></span>
								<span className={styles1.bar}></span>
								<label className={styles1.label}>Confirmez mot de passe</label>
							</div>
							<button type="button" className=""></button>
						</div>

						<div className="w-full h-1/4 flex border-0 rounded-3xl">
							<div className="w-full h-full flex justify-center items-center">
								<button type="submit" className="w-3/5 h-2/5 flex justify-center items-center relative m-auto transition-all border-0 rounded-full bg-yellow-500 active:scale-95">
									<span>Validez</span>
								</button>
							</div>
						</div>
						{(open && error !== "") &&
							<Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
								<Alert className="w-4/5" severity="error" variant="filled" onClose={handleClose}>
									{error} Veuillez réessayer.
								</Alert>
							</Snackbar>
						}
					</form>
				</div>
			</div>
		</>
	)
}

export default ForgotPasswordPage