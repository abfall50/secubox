import { NextPage } from "next";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

interface ChangeOpen {
	(): void
}
interface ReclamationProps {
	name: string
	id_user: string
	id_company: string
	changeOpen: ChangeOpen
	setSuccess: Dispatch<SetStateAction<string>>
}

const ReclamationComp: NextPage<ReclamationProps> = (props) => {

	const { name, id_user, id_company, changeOpen, setSuccess } = props

	const [show, setShow] = useState(true)

	const router = useRouter()

	const handleClaim = async () => {
		const body = { claim: true, id_user: id_user, id_company: id_company }

		const res = await fetch("/api/fidelity/validate", {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...body })
		})

		const json = await res.json()

		if (json !== "")
			return

		setShow(false)
		changeOpen()
		setSuccess("Vous avez validé la réclamation du client avec succès!")
	}

	return (
		<>
			{show &&
				<div className="w-full h-[100px] flex justify-between items-center">
					<span className="w-4/5 flex justify-start items-center text-2xl pl-10">{name}</span>
					<div className="w-2/6 h-full flex justify-center items-center border-0 rounded-full bg-yellow-500 mr-10">
						<button className="text-xl text-center flex justify-center items-center gap-4" onClick={handleClaim}>Validez</button>
					</div>
				</div>
			}
		</>
	)
}

export default ReclamationComp