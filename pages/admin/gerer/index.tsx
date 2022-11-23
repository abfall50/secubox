import { GetServerSideProps } from "next"
import { useState } from "react"
import Logo from "../../../public/sx.png"
import { FaArrowRight } from "react-icons/fa"
import NavBar from "../../../components/admin/NavBar"
import ReclamationComp from "../../../components/pro/ReclamtionComp"
import prisma from "../../../libs/prisma"
import Image from "next/image"
import { getToken } from "next-auth/jwt"
import CompanyComp from "../../../components/admin/CompanyComp"

const ManagePage = (data: any) => {

	const { user, companies } = data

	const [inputClient, setInputClient] = useState("")
	const [error, setError] = useState("")

	const handleClickFidelity = async () => {
		const body = { email: inputClient }

		const res = await fetch("/api/fidelity/point", {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...body })
		})

		const json = await res.json()

		setInputClient("")
		if (json !== "")
			setError(json)
	}

	return (
		<>
			<NavBar user_id={user.id} />
			<div className="h-full min-h-[100vh] flex flex-col justify-start items-center py-10 gap-4 lg:bg-bg_laptop lg:bg-cover">
				<div className="h-[15vh] flex justify-center items-center pt-5">
					<Image src={Logo} alt="Secu Logo" width={120} height={100} />
				</div>
				<span className="text-4xl font-bold pt-10">Restaurants</span>
				<div className="w-4/5 bg-white rounded-3xl shadow-2xl shadow-black flex flex-col justify-start gap-8 py-10 lg:w-2/5 xl:w-1/3">
					<div className="flex flex-col justify-start items-center gap-8">
						{companies?.map((c: any) => {
							return (<CompanyComp key={c.id} name={c.name} id={c.id} />)
						})}
					</div>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const token = await getToken({ req: context.req })

	const user = await prisma.user.findUnique({
		where: {
			id: token?.sub
		}
	})

	const companies = await prisma.company.findMany({})

	return {
		props: {
			user,
			companies
		}
	}
}


export default ManagePage