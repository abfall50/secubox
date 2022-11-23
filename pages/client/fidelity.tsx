import { GetServerSideProps, NextPage } from "next";
import NavBar from "../../components/client/NavBar";
import Image from "next/image";
import Logo1 from "../../public/1.png"
import Logo2 from "../../public/2.png"
import Logo3 from "../../public/3.png"
import Logo4 from "../../public/4.png"
import Logo5 from "../../public/5.png"
import Logo6 from "../../public/6.png"
import Logo7 from "../../public/7.png"
import Logo8 from "../../public/8.png"
import Logo9 from "../../public/9.png"
import Logo10 from "../../public/10.png"
import Logo11 from "../../public/11.png"
import { useEffect, useState } from "react";
import prisma from "../../libs/prisma"
import { getToken } from "next-auth/jwt";

const image = [Logo1, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7, Logo8, Logo9, Logo10, Logo11]

const FidelityPageCLI: NextPage = (data: any) => {

	const { user, company, fidelity } = data

	const [complete, setComplete] = useState(false)
	const [isImage, setImage] = useState(company?.fidelity_img)
	const [claim, setClaim] = useState<boolean>(fidelity?.claim)

	useEffect(() => {
		if (fidelity?.count === 10)
			setComplete(true)
	}, [fidelity.count])

	const onClick = async () => {
		const body = { id: fidelity.id }
		const res = await fetch("/api/fidelity/claim", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...body })
		})
		const data = await res.json()

		if (data !== "")
			return
			
		setClaim(true)
	}

	return (
		<>
			<NavBar user_id={user.id} />
			<div className="flex justify-center items-center py-10 lg:bg-bg_laptop lg:bg-cover">
				<div className="w-4/5 h-[100vh] bg-white rounded-3xl shadow-2xl shadow-black flex flex-col justify-center items-center gap-4 pt-12 lg:w-1/3">
					{company.fidelity_company &&
						<>
							{isImage && <div className="w-4/5 h-1/5 flex justify-center">
								<Image src={company.fidelity_img} alt="Fidelity_Logo" width={150} height={100} />
							</div>}
							<div className="w-4/5 h-1/5">
								<p className="text-center text-xl font-bold">{company.fidelity_msg}</p>
							</div>
							<div className="w-4/5 h-3/5 flex justify-center items-center">
								<Image src={image[fidelity.count]} alt="Fidelity" height="350px" width="300px" />
							</div>
							{!complete && <div className="w-full h-2/5 flex justify-center items-center pb-5">
								<span className="text-xl text-center">Il vous manque {10 - fidelity.count} points de fidélité.</span>
							</div>}
							{(complete && !claim) && <div className="w-full h-2/5 flex justify-center items-center">
								<button className="w-3/5 h-2/4 border-0 rounded-full bg-yellow-500 text-white mt-2 outline-0" onClick={() => onClick()}>Réclamez</button>
							</div>}
							{(complete && claim) && <div className="w-full h-2/5 flex justify-center items-center pb-5">
								<span className="text-xl text-center">Attendez la validation du restaurant</span>
							</div>}
						</>
					}
					{!company.fidelity_company && 
						<span className="text-5xl text-bold text-center">Cette fonctionnalité n&apos;est pas disponible chez ce restaurant</span>
					}
				</div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const token = await getToken({ req: context.req })

	let user = null
	if (token?.sub) {
		user = await prisma.user.findUnique({
			where: {
				id: token.sub
			}
		})
	}
	const company = await prisma.company.findUnique({
		where: {
			id_secubox: user?.connectedTo
		}
	})
	let fidelity = null
	if (user) {
		fidelity = await prisma.fidelity.findFirst({
			where: {
				id_user: user?.id,
				id_company: company?.id
			}
		})
	}
	return {
		props: {
			user,
			company,
			fidelity: JSON.parse(JSON.stringify(fidelity))
		}
	}
}

export default FidelityPageCLI