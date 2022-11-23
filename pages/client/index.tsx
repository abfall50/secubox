import { GetServerSideProps, NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Anchor from "../../components/Anchor";
import NavBar from "../../components/client/NavBar";
import Logo from "../../public/sx.png"
import Image from "next/image";
import prisma from "../../libs/prisma"
import { getToken } from "next-auth/jwt";
import { FaArrowRight } from "react-icons/fa";

const HomePageCLI: NextPage = (data: any) => {

	const { data: session } = useSession()
	const { user, company } = data

	return (
		<>
			<NavBar user_id={user.id} />
			<div className="h-[95vh] flex justify-center items-center py-10 lg:bg-bg_laptop lg:bg-cover">
				<div className="w-4/5 h-[80vh] bg-white rounded-3xl shadow-2xl shadow-black flex flex-col justify-evenly px-7 lg:w-1/3 xl:w-1/4">
					{!company?.image ? <div className="h-1/4 flex justify-center items-center"><Image src={Logo} alt="Secu Logo" width={"100px"} height={"100px"} /></div> :
						<div className="h-1/4 flex justify-center items-center pt-10"><Image src={company.image} alt="Secu Logo" width={"150px"} height={"100px"} /></div>}
					<h1 className="h-1/3 flex justify-center items-center text-center text-4xl font-medium">Bonjour {session?.user?.name} !</h1>
					<span className="h-1/3 flex justify-center items-center text-xl text-center">{company.welcome_msg}</span>
					<div className="w-full h-1/4 flex justify-center items-start">
						<Anchor className='w-2/3 h-2/5 bg-yellow-500 border-0 rounded-3xl text-white flex justify-center items-center font-bold shadow-xl active:shadow-none' href='/client/link'>LIENS <FaArrowRight /></Anchor>
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

	const company = await prisma.company.findUnique({
		where: {
			id_secubox: user?.connectedTo
		}
	})

	const fidelity = await prisma.fidelity.findFirst({
		where: {
			id_company: company?.id,
			id_user: token?.sub
		}
	})

	if (!fidelity && user && company) {
		const create = await prisma.fidelity.create({
			data: {
				id_user: user.id,
				id_company: company.id,
				connected: true,
			}
		})
	} else if (!fidelity?.connected) {
		const update = await prisma.fidelity.update({
			where: {
				id: fidelity?.id
			},
			data: {
				connected: true,
				last_connection: new Date()
			}
		})
	}

	return {
		props: {
			user,
			company
		}
	}
}


export default HomePageCLI