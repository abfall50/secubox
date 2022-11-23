import { NextPage } from "next"
import style from "./ToggleSwitch.module.css"

interface OnClick {
	(): void
}

interface ToggleSwitchProps {
	checked: boolean
	onClick: OnClick
}

const ToggleSwitch: NextPage<ToggleSwitchProps> = (props) => {

	const { checked, onClick } = props

	return (
		<label className={style.switch}>
			<input type="checkbox" defaultChecked={checked} onClick={onClick} />
			<span className={style.slider}></span>
		</label>
	)
}

export default ToggleSwitch