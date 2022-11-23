import { Alert, Snackbar } from "@mui/material";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles1 from "./InputUpdate.module.css"

interface ChangeOpen {
	(): void
}

interface PasswordProps {
	email: string
}
interface FormValues {
	old_pwd: string
	new_pwd: string
	confirm: string
	email?: string | null | undefined
}

const PasswordUpdate: NextPage<PasswordProps> = (props) => {

	const { email } = props

	const [passwordVisibility1, setPasswordVisibility1] = useState(true)
	const [passwordVisibility2, setPasswordVisibility2] = useState(true)
	const [open, setOpen] = useState(false)
	const [success, setSuccess] = useState("")
	const [error, setError] = useState("")

	const { register, handleSubmit, reset, formState: { errors } } = useForm()

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
		const body = { ...data }
		const values: FormValues = { old_pwd: body.old_pwd, new_pwd: body.new_pwd, confirm: body.confirm, email: email }

		const res = await fetch("/api/user/password", {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(values)
		})
		const json = await res.json()

		reset()
		changeOpen()

		if (json !== "")
			setError(json)
		else {
			setSuccess("Votre mot de passe a été modifié avec succès!")
		}
	})

	return (
		<>
			<form onSubmit={onSubmit} className="h-full flex flex-col justify-center items-center">

				<div className="w-5/6 h-1/4 flex justify-between items-center">
					<div className={styles1.group}>
						<input required {...register("old_pwd")} type={passwordVisibility1 ? "password" : "text"} className={styles1.input} />
						<span className={styles1.highlight}></span>
						<span className={styles1.bar}></span>
						<label className={styles1.label}>Ancien mot de passe</label>
					</div>
					<button type="button" onClick={() => setPasswordVisibility1(!passwordVisibility1)}>{!passwordVisibility1 ? <FaEye /> : <FaEyeSlash />}</button>
				</div>

				<div className="w-5/6 h-1/4 flex justify-between items-center">
					<div className={styles1.group}>
						<input required {...register("new_pwd")} type={passwordVisibility2 ? "password" : "text"} className={styles1.input} />
						<span className={styles1.highlight}></span>
						<span className={styles1.bar}></span>
						<label className={styles1.label}>Nouveau mot de passe</label>
					</div>
					<button type="button" onClick={() => setPasswordVisibility2(!passwordVisibility2)}>{!passwordVisibility2 ? <FaEye /> : <FaEyeSlash />}</button>
				</div>

				<div className="w-5/6 h-1/4 flex justify-between items-center">
					<div className={styles1.group}>
						<input required {...register("confirm")} type={passwordVisibility2 ? "password" : "text"} className={styles1.input} />
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
			</form>
		</>
	)
}



export default PasswordUpdate