import Anchor from "../Anchor"
import { FaTimes, FaBars, FaCaretDown } from "react-icons/fa"
import { ChangeEvent, useEffect, useState } from "react"
import Image from "next/image"
import Logo from "../../public/secu.png"
import { signOut } from "next-auth/react"
import { useRouter } from "next/router"
import DropdownMenu from "./Dropdown"
import { NextPage } from "next"
import { style } from "@mui/system"

interface NavBarProps {
	user_id: string
}

const NavBar: NextPage<NavBarProps> = (props) => {

	const router = useRouter()
	const [click, setClick] = useState(false)
	const [dropdown, setDropdown] = useState(false);

	const { user_id } = props

	const handleClick = () => {
		if (click) {
			document.body.style.position = ""
			document.body.style.width = ""
		}
		else {
			document.body.style.position = "fixed"
			document.body.style.width = "100vw"
		}
		setClick(!click)
	}
	const closeMenu = () => {
		document.body.style.position = ""
		document.body.style.width = ""
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

	const onMouseEnter = () => {
		if (window.innerWidth < 960) {
		  setDropdown(false);
		} else {
		  setDropdown(true);
		}
	  };
	
	  const onMouseLeave = () => {
		if (window.innerWidth < 960) {
		  setDropdown(false);
		} else {
		  setDropdown(false);
		}
	  };

	return (
		<nav className="navbar">
			<Anchor href={"/pro"} className="navbar-logo" ><Image src={Logo} alt="Secubox Logo" width={"150px"} height={"50px"} onClick={closeMenu} /></Anchor>

			<div onClick={handleClick} className="menu-icon" >{click ? <FaTimes color="white" /> : <FaBars color="white" />}</div>

			<ul className={click ? "nav-menu active" : "nav-menu"}>
				<li className="nav-item">
					<Anchor href="/pro" className='nav-links' onClick={closeMenu}>
						Accueil
					</Anchor>
				</li>
				<li className="nav-item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
					<Anchor href="/pro/personnalisation" className="nav-links flex justify-center items-center" onClick={closeMenu}>Personnalisation <i><FaCaretDown /></i></Anchor>
					{dropdown && <DropdownMenu />}
				</li>
				<li className="nav-item">
					<Anchor href="/pro/profil" className='nav-links' onClick={closeMenu}>
						Profil
					</Anchor>
				</li>
				<li className="nav-item">
					<Anchor href="/pro/tools" className='nav-links' onClick={closeMenu}>
						Outils promotionnels
					</Anchor>
				</li>
				<li className="nav-item">
					<Anchor href="/pro/help" className='nav-links' onClick={closeMenu}>
						Aide
					</Anchor>
				</li>
				<li className="nav-item" >
					<button className='nav-links rounded-2xl' style={{ backgroundColor: "rgb(234 179 8)" }} onClick={logOut}>
						Se déconnecter
					</button>
				</li>
			</ul>
		</nav>
	)
}

export default NavBar