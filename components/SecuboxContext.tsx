import { createContext, ReactNode, useContext } from "react"
import { ChildrenProps } from "../libs/props"

type Props = {
	children: ReactNode
}

interface secuboxContextType {
	secubox_id: string
}

export const SecuboxContext = createContext<secuboxContextType | undefined>(undefined)

export function useSecubox() {
	return useContext(SecuboxContext)
}

export function SecuboxProvider({ children }: Props) {
	const value = "secubox1"

	return (
		<SecuboxContext.Provider value={{ secubox_id: value }}>
			{children}
		</SecuboxContext.Provider>
	)
}