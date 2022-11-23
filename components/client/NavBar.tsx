import Anchor from "../Anchor"
import { FaTimes, FaBars } from "react-icons/fa"
import { useState } from "react"
import Image from "next/image"
import Logo from "../../public/secu.png"
import { signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { NextPage } from "next"

interface NavBarProps {
	user_id: string
}

const NavBar: NextPage<NavBarProps> = (props) => {
	const router = useRouter()
	const [click, setClick] = useState(false)

	const { user_id } = props

	const handleClick = () => {
		if (click) {
			document.body.style.position = ""
			document.body.style.width = ""
			document.body.style.height = ""
		}
		else {
			document.body.style.position = "fixed"
			document.body.style.width = "100vw"
			document.body.style.height = "110vh"
		}
		setClick(!click)
	}
	const closeMenu = () => {
		document.body.style.position = ""
		document.body.style.width = ""
		document.body.style.height = ""
		setClick(false)
	}

	const logOut = async () => {
		signOut({ redirect: false })
		const res = await fetch("/api/fidelity/logout", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user_id })
		})
		router.push("/")
	}

	return (
			<nav className="navbar">
				<Anchor href={"/client"} className="navbar-logo" ><Image src={Logo} alt="Secubox Logo" width={"150px"} height={"50px"} onClick={closeMenu} /></Anchor>

				<div onClick={handleClick} className="menu-icon" >{ click ? <FaTimes color="white" /> : <FaBars color="white" /> }</div>

				<ul className={click ? "nav-menu active" : "nav-menu"}>
					<li className="nav-item">
						<Anchor href="/client" className='nav-links' onClick={closeMenu}>
							Accueil
						</Anchor>
					</li>
					<li className="nav-item">
						<Anchor href="/client/profil" className='nav-links' onClick={closeMenu}>
							Profil
						</Anchor>
					</li>
					<li className="nav-item">
						<Anchor href="/client/link" className='nav-links' onClick={closeMenu}>
							Liens
						</Anchor>
					</li>
					<li className="nav-item">
						<button className='nav-links rounded-2xl' style={{ backgroundColor: "rgb(234 179 8)" }} onClick={logOut}>
							Se déconnecter
						</button>
					</li>
				</ul>
			</nav>
	)
}

export default NavBar