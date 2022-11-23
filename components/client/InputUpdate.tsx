import { Alert, Snackbar } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { FaAngleRight, FaArrowRight, FaPen } from "react-icons/fa";
import Anchor from "../Anchor";
import styles from "./InputUpdate.module.css"

interface ChangeOpen {
	(): void
}


interface UpdateProps {
	title: string
	value: string
	type: string
	userId: string
	companyId?: string
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	changeOpen: ChangeOpen
	status?: string
	setSuccess: Dispatch<SetStateAction<string>>
}

const InputUpdate: NextPage<UpdateProps> = (props) => {
	const { value, title, type, userId, open, setOpen, changeOpen, status, companyId, setSuccess } = props
	const [inputValue, setInputValue] = useState(value)
	const [error, setError] = useState("")

	const router = useRouter()

	const handleClose = (e: SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway")
			return
		setOpen(false)
	}

	const selectBodyType = (property: string) => {
		if (title === "Nom") {
			return ({ name: property, id: userId })
		}
		if (title === "Email") {
			return ({ email: property, id: userId })
		}
		if (title === "Numéro de téléphone") {
			return ({ phoneNumber: property, id: userId })
		}
		if (title === "Nom du restaurant") {
			return ({ companyName: property, id: userId, companyId: companyId })
		}
		return {}
	}

	const successMessage = () => {
		if (title === "Nom") {
			setSuccess("nom")
		}
		if (title === "Email") {
			setSuccess("email")
		}
		if (title === "Numéro de téléphone") {
			setSuccess("numéro de téléphone")
		}
		if (title === "Nom du restaurant") {
			setSuccess("Le nom a été modifié avec succès!")
		}
	}

	const onClick = async (property: string) => {
		setError("")
		const body = selectBodyType(property)

		const res = await fetch("/api/user/update", {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ body })
		})

		changeOpen()

		const data = await res.json()

		if (data !== "") {
			setInputValue(value)
			setError(data)
		} else {
			successMessage()
		}
	}

	return (
		<>
			<div className="w-5/6 h-1/4 flex justify-between items-center">
				<div className={styles.group}>
					{type !== "password" ?
						<input required type={type} className={styles.input} value={inputValue} onChange={(e) => setInputValue(e.target.value)} /> :
						<input required type={type} className={styles.input} defaultValue="falsepasswordforinput" disabled />}
					<span className={styles.highlight}></span>
					<span className={styles.bar}></span>
					<label className={styles.label}>{title}</label>
				</div>
				{type !== "password" ? <button className="w-full h-full flex justify-center items-center" onClick={() => onClick(inputValue)}>
					<FaPen />
				</button> :
					<Anchor href={router.pathname === "/client/profil" ? "/client/password" : "/pro/password"} className="w-full h-full flex justify-center items-center">
						<FaArrowRight />
					</Anchor>}
			</div>
			{(open && error !== "") &&
				<Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
					<Alert className="w-4/5" severity="error" variant="filled" onClose={handleClose}>
						{error}
					</Alert>
				</Snackbar>
			}
		</>
	)
}

export default InputUpdate