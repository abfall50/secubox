import { ChildrenProps } from "../../libs/props"

const MobileConnexionLayout = ({ children }: ChildrenProps) => {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<div className="w-4/5 h-4/5 bg-white border">
				<div>{children}</div>
			</div>
		</div>
	)
}

export default MobileConnexionLayout