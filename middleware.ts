export { default } from "next-auth/middleware"

export const config = { matcher: ["/client", "/client/fidelity", "/client/link", "/client/profil", "/client/password",
									"/pro", "/pro/fidelity", "/pro/gestion", "/pro/help", "/pro/profil", "/pro/tools", "/pro/password", "/pro/personnalisation", "/pro/reclamation", 
									"/admin/home", "/admin/creation", "/admin/gerer", "/admin/gerer/[id]"] }