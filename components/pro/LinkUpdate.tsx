import { NextPage } from "next"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useState } from "react"
import { FaTrash } from "react-icons/fa"

interface ChangeOpen {
	(): void
}

interface LinkProps {
	title: string
	placeholder: string
	link: string | null
	companyId: string
	changeOpen: ChangeOpen
	setSuccess: Dispatch<SetStateAction<string>>
}

const LinkUpdate: NextPage<LinkProps> = (props) => {
	const { title, placeholder, link, companyId, changeOpen, setSuccess } = props

	const [inputValue, setInputValue] = useState("")
	const [remove, setRemove] = useState(true)

	const router = useRouter()

	const getUpdateBody = () => {
		if (title === "Menu:")
			return { menu: inputValue, companyId: companyId }
		if (title === "Avis:")
			return { avis: inputValue, companyId: companyId }
		if (title === "Image:")
			return { image: inputValue, companyId: companyId }
		return {}
	}

	const handleClick = async () => {
		const body = getUpdateBody()

		const res = await fetch("/api/company/updateLinks", {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...body })
		})

		const data = await res.json()

		if (data !== "")
			return

		setInputValue("")
		changeOpen()
		setSuccess("Le lien a été modifié avec succès!")
		router.reload()
	}

	const getRemoveBody = () => {
		if (title === "Menu:")
			return { remove: "menu", companyId: companyId }
		if (title === "Avis:")
			return { remove: "avis", companyId: companyId }
		if (title === "Image:")
			return { remove: "image", companyId: companyId }
		return {}
	}

	const handleRemove = async () => {
		const body = getRemoveBody()

		const res = await fetch("/api/company/updateLinks", {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...body })
		})

		const data = await res.json()

		if (data !== "")
			return

		changeOpen()
		setSuccess("Le lien a été supprimé avec succès!")
		setRemove(false)
	}

	return (
		<div className="w-full h-1/4 flex flex-col justify-center items-center">
			<div className="w-4/5 h-1/4 flex justify-between items-center">
				<span className="w-4/5 text-lg text-yellow-500">{title}</span>
				{(link && remove) && <button className="" onClick={handleRemove}><FaTrash color="red" /></button>}
			</div>
			<input type={"text"} className="w-4/5 h-1/4 border border-black outline-0 px-2" placeholder={placeholder} value={inputValue} onChange={(e) => setInputValue(e.target.value)} ></input>
			<button className="w-3/5 h-1/4 border-0 bg-yellow-500 text-white mt-2 outline-0" onClick={handleClick}>Validez</button>
		</div>
	)
}

export default LinkUpdate