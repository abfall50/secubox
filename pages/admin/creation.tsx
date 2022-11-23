import { GetServerSideProps, NextPage } from "next";
import Anchor from "../../components/Anchor";
import NavBar from "../../components/admin/NavBar";
import Logo from "../../public/sx.png"
import Image from "next/image";
import prisma from "../../libs/prisma";
import { getToken } from "next-auth/jwt";
import { FaArrowRight } from "react-icons/fa";
import SecuboxCreationPage from "../../components/admin/SecuboxCreate";

const CreationPage: NextPage = (data: any) => {

	const { user } = data

	return (
		<>
			<NavBar user_id={user.id} />
			<SecuboxCreationPage user_id={user.id} />
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


export default CreationPage