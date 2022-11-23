import { GetServerSideProps, NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Anchor from "../../components/Anchor";
import NavBar from "../../components/pro/NavBar";
import Logo from "../../public/sx.png"
import Image from "next/image";
import prisma from "../../libs/prisma"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken } from "next-auth/jwt";
import SecuboxFormPage from "../../components/pro/SecuboxForm";
import CompanyFormPage from "../../components/pro/CompanyForm";

const HomePagePRO: NextPage = (data: any) => {

	const { user, company, connected } = data


	const [lastUpdate, setLastUpdate] = useState(new Date())

	const router = useRouter()

	const handleRefresh = () => {
		router.reload()
	}

	if (!user?.id_secu) {
		return (
			<>
				<SecuboxFormPage user_id={user.id} />
			</>
		)
	}

	if (!company) {
		return (
			<>
				<CompanyFormPage user_id={user.id} secubox_id={user.id_secu} />
			</>
		)
	}

	return (
		<>
			<NavBar user_id={user.id} />
			<div className="flex flex-col justify-center items-center z-[1] lg:bg-bg_laptop lg:bg-cover">
				<div className="h-[15vh] flex justify-center items-center pt-5">
					<Image src={company.image} alt="Secu Logo" width={150} height={100} />
				</div>
				<div className="w-4/5 h-[15vh] flex justify-center items-center pt-5 lg:w-2/5">
					<span className="w-full h-2/3 bg-white border-0 rounded-full shadow-2xl flex justify-center items-center text-[7vw] font-medium text-yellow-500 overflow-hidden lg:text-[3vw]">Bonjour {user.name}</span>
				</div>
				<div className="w-full flex flex-col justify-center items-center gap-8 lg:flex-row">
					<div className="w-4/5 h-[60vh] bg-white rounded-3xl shadow-2xl shadow-black flex justify-center items-center my-10 lg:w-1/3 xl:w-1/4">
						<div className="w-4/5 h-4/5 border-2 border-black flex flex-col justify-center items-center">
							<h1 className="w-4/5 h-1/3 flex justify-center items-center text-4xl text-yellow-500">Informations</h1>
							<div className="w-5/5 h-2/3 flex flex-col justify-center items-center gap-4">
								<span>Nom de l&apos;enseigne: {company.name}</span>
								<span>ID de la Secubox: {company.id_secubox}</span>
								<span>Nom du Wifi gérant: {company.ssid_company}</span>
								<span>Nom du Wifi client: {company.ssid_client}</span>
							</div>
						</div>
					</div>
					<div className="w-4/5 h-[60vh] bg-white rounded-3xl shadow-2xl shadow-black flex justify-center items-center my-10 lg:w-1/3 xl:w-1/4">
						<div className="w-4/5 h-4/5 border-2 border-black flex flex-col justify-center items-center">
							<h1 className="w-4/5 h-1/3 flex justify-center items-center text-4xl text-yellow-500">Dashboard</h1>
							<div className="w-5/5 h-2/3 flex flex-col justify-center items-center gap-4">
								<button className="w-4/5 h-1/6 border-0 bg-yellow-500 text-white" onClick={handleRefresh}>Actualisez les informations</button>
								<span className="text-center text-sm italic">Dernière actualisation le {lastUpdate.toLocaleDateString()} à {lastUpdate.getHours()}:{lastUpdate.getMinutes()}</span>
								<span>CPU de la secubox: 5.6</span>
								<span>Il y a {connected.length} clients connectés</span>
								<span>État de connexion: Connecté</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const token = await getToken({ req: context.req })

	let user
	let company
	if (token?.sub) {
		user = await prisma.user.findUnique({
			where: {
				id: token.sub
			}
		})
		if (user?.id_secu) {
			company = await prisma.company.findUnique({
				where: {
					id_secubox: user.id_secu
				}
			})
		}
	}

	const connected = await prisma.fidelity.findMany({
		where: {
			connected: true,
			id_company: company?.id
		}
	})

	if (!company) {
		return {
			props: {
				company: null,
				user,
				connected: JSON.parse(JSON.stringify(connected))
			}
		}
	}

	return {
		props: {
			company: company,
			user,
			connected: JSON.parse(JSON.stringify(connected))
		}
	}
}

export default HomePagePRO