import Link from "next/link";
import React, {ReactNode} from "react";
import { AnchorProps } from "../libs/props";

const Anchor = (props: AnchorProps) => {
	const { href, ...others } = props
	if (!href) return null

	return (
		<Link href={href}>
			<a {...others}>
			</a>
		</Link>
	)
}

export default Anchor;