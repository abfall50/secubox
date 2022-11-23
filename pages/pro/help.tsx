import { GetServerSideProps, NextPage } from "next";
import NavBar from "../../components/pro/NavBar";
import Image from "next/image"
import Logo from "../../public/sx.png"
import prisma from "../../libs/prisma"
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import YouTube from "react-youtube";
import { getToken } from "next-auth/jwt";

const HelpPagePro: NextPage = (data: any) => {

	const { user, company } = data

	const opts = {
		height: "100%",
		width: "100%",
		playerVars: {
			autoplay: 0,
		},
	};

	return (
		<>
			<NavBar user_id={user.id} />
			<div className="w-full flex flex-col justify-start items-center gap-8 py-10 lg:gap-0 lg:bg-bg_laptop lg:bg-cover">
				<div className="h-[15vh] flex justify-center items-center pt-5">
					<Image src={company.image} alt="Secu Logo" width={150} height={100} />
				</div>
				<span className="text-4xl font-bold">Aide</span>
				<div className="h-[80vh] w-full flex flex-col justify-center items-center gap-8 pb-10 lg:grid lg:grid-cols-2">
					<div className="w-4/5 h-2/3 flex justify-center items-center lg:w-full lg:h-full">
						<YouTube videoId="qBihh3Ut2nQ" opts={opts} />
					</div>
					<div className="w-4/5 h-2/3 flex justify-center items-center lg:w-full lg:h-full">
						<YouTube videoId="qBihh3Ut2nQ" opts={opts} />
					</div>
					<div className="w-4/5 h-2/3 flex justify-center items-center lg:w-full lg:h-full">
						<YouTube videoId="qBihh3Ut2nQ" opts={opts} />
					</div>
					<div className="w-4/5 h-2/3 flex justify-center items-center lg:w-full lg:h-full">
						<YouTube videoId="qBihh3Ut2nQ" opts={opts} />
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


	return {
		props: {
			user,
			company
		}
	}
}

export default HelpPagePro