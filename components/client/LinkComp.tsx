import { NextPage } from "next"
import Anchor from "../Anchor"
import styles from "./LinkComp.module.css"


interface LinkProps {
	title: string,
	background: string,
	link: string
}

interface Background {
	white: string,
	gray: string,
	[key: string]: string
}

const LinkComp: NextPage<LinkProps> = (props) => {

	const { title, background, link } = props

	const bgColor: Background = {
		white: '#ffffff',
		gray: '#C5C7CA'
	}

	return (
		<div className="w-full h-1/4 flex border-0 rounded-3xl" style={{backgroundColor: bgColor[background]}}>
			<div className="w-full h-full flex justify-center items-center">
				<a href={link} className={styles.cta} target={title === "Offre" ? "_self": "_blank"} rel="noreferrer">
					<span>{title}</span>
				</a>
			</div>
		</div>
	)
}

export default LinkComp