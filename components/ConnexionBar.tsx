import Anchor from "../components/Anchor"

const ConnexionBar = () => {
	return (
		<div className="w-full h-1/6 flex">
			<div className="w-full h-full">
				<Anchor href="/auth/client/signin" className="w-full h-full flex justify-center items-center text-2xl">S&apos;inscrire</Anchor>
			</div>
			<div className="w-full h-full">
				<Anchor href="/auth/client/signin" className="w-full h-full flex justify-center items-center text-2xl">Se connecter</Anchor>
			</div>
		</div>
	)
}

export default ConnexionBar