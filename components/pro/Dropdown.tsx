import { useState } from "react";
import Anchor from "../Anchor";

const DropdownMenu = () => {

	const [click, setClick] = useState(false);

	const handleClick = () => setClick(!click);

	return (
		<>
			<ul
				onClick={handleClick}
				className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
			>
				<li key={0}>
					<Anchor className="dropdown-link" href="/pro/gestion" onClick={() => { setClick(false) }}>
						Général
					</Anchor>
				</li>
				<li key={1}>
					<Anchor className="dropdown-link" href="/pro/fidelity" onClick={() => { setClick(false) }}>
						Fidélité
					</Anchor>
				</li>
			</ul>
		</>
	)
}

export default DropdownMenu