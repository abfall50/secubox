import { GetServerSideProps, NextPage } from "next";
import { getToken } from "next-auth/jwt";
import { FaArrowLeft } from "react-icons/fa";
import Anchor from "../../components/Anchor";
import NavBar from "../../components/client/NavBar";
import PasswordUpdate from "../../components/client/PasswordUpdate";
import prisma from "../../libs/prisma"

const Password: NextPage = (data: any) => {

	const { user } = data

	return (
		<>
			<NavBar user_id={user.id} />
			<div className="h-[95vh] flex justify-center items-center py-10 lg:bg-bg_laptop lg:bg-cover">
				<div className="w-4/5 h-[80vh] bg-white rounded-3xl shadow-2xl shadow-black flex flex-col justify-center items-center gap-8 lg:w-1/3 xl:w-1/4">
					<div className="w-full h-1/6 flex justify-center items-center rounded-t-3xl bg-yellow-500">
						<span className="text-4xl text-center font-medium">Modifier votre mot de passe</span>
					</div>
					<PasswordUpdate email={user.email} />
					<div className="w-full h-[10%] flex justify-start items-center pb-10">
						<Anchor href="/client/profil" className="w-full flex justify-center items-center">
							<FaArrowLeft color="#EAB308" />
							<span className="text-xl text-yellow-500 flex pl-2 underline lg:no-underline hover:underline lg:hover:text-2xl">Retour</span>
						</Anchor>
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

	return {
		props: {
			user
		}
	}
}

export default Password