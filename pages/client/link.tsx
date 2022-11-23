import { GetServerSideProps, NextPage } from "next";
import NavBar from "../../components/client/NavBar";
import Image from "next/image";
import Logo from "../../public/sx.png"
import { useState } from "react";
import LinkComp from "../../components/client/LinkComp";
import prisma from "../../libs/prisma"
import { getToken } from "next-auth/jwt";

interface LinkObject {
	Menu?: string
	Avis?: string
	Offre?: string
	Internet: string
}

const InfoPageCLI: NextPage = (data: any) => {

	const { user, company } = data

	const comp: any[]= []

	const links: LinkObject = {
		Internet: "https://google.com"
	}

	if (company.fidelity_company)
		links.Offre = "/client/fidelity"

	if (company?.menu)
		links.Menu = company.menu
	
	if (company?.reviews)
		links.Avis = company.reviews

	Object.entries(links).forEach(([key, value], index) => {
		if (index % 2 === 0)
			comp.push( <LinkComp title={key} background="gray" link={value} /> )
		else
			comp.push( <LinkComp title={key} background="white" link={value} /> )
	})

	const keys = Object.keys(links)

	return (
		<>
			<NavBar user_id={user.id} />
			<div className="h-[95vh] flex justify-center items-center py-10 lg:bg-bg_laptop lg:bg-cover">
				<div className="w-4/5 h-[80vh] bg-white rounded-3xl shadow-2xl shadow-black flex flex-col lg:w-1/3 xl:w-1/4">
					{comp}
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
	
	return {
		props: {
			user,
			company
		}
	}
}

export default InfoPageCLI
