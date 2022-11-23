import { NextPage } from "next";
import { useRouter } from "next/router";
import { FaArrowRight } from "react-icons/fa";
import Anchor from "../Anchor";

interface CompanyCompProps {
	name: string,
	id:	string
}

const CompanyComp: NextPage<CompanyCompProps> = (props) => {

	const { name, id } = props
	
	return (
		<div className="w-full h-[100px] flex justify-between items-center">
			<span className="w-4/5 flex justify-start items-center text-2xl pl-10">{name}</span>
			<div className="w-2/6 h-full flex justify-center items-center border-0 rounded-full bg-yellow-500 mr-10">
				<Anchor href={`/admin/gerer/${id}`} className="text-xl text-center flex justify-center items-center gap-4">Validez <FaArrowRight></FaArrowRight> </Anchor>
			</div>
		</div>
	)
}

export default CompanyComp