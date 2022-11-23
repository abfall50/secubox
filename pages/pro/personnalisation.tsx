import NavBar from "../../components/pro/NavBar"
import Image from "next/image"
import prisma from "../../libs/prisma"
import { GetServerSideProps } from "next"
import Anchor from "../../components/Anchor"
import styles from "../../components/client/LinkComp.module.css"
import { FaArrowRight } from "react-icons/fa"
import { getToken } from "next-auth/jwt"

const PersoPage = (data: any) => {

	const { user, company } = data

	return (
		<>
			<NavBar user_id={user.id} />
			<div className="flex flex-col justify-center items-center gap-8 py-10 lg:bg-bg_laptop lg:bg-cover">
				<div className="h-[15vh] flex justify-center items-center pt-5">
					<Image src={company.image} alt="Secu Logo" width={150} height={100} />
				</div>
				<div className="w-4/5 h-[80vh] bg-white rounded-3xl shadow-2xl shadow-black flex justify-center items-center lg:w-1/3">
					<div className="w-4/5 h-4/5 border-2 border-black flex flex-col justify-evenly items-center">
						<div className="w-full h-1/4 flex border-0 rounded-3xl">
							<div className="w-full h-full flex justify-center items-center">
								<Anchor href="/pro/gestion" className={styles.cta}>
									<span className="flex justify-center items-center">Général <FaArrowRight /></span>
								</Anchor>
							</div>
						</div>
						<div className="w-full h-1/4 flex border-0 rounded-3xl">
							<div className="w-full h-full flex justify-center items-center">
								<Anchor href="/pro/fidelity" className={styles.cta}>
									<span className="flex justify-center items-center">Fidélité <FaArrowRight /></span>
								</Anchor>
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
			},
			select: {
				email: true,
				name: true,
				phoneNumber: true,
				id: true,
				id_secu: true
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

	return {
		props: {
			user,
			company
		}
	}
}

export default PersoPage