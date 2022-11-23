import NextAuth, { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { hashPass, comparePass } from "../lib/function"
import { omit } from "lodash"
import prisma from "../../../libs/prisma"

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			credentials: {
				email: {
					label: "Email",
					type: "email",
				},
				password: {
					label: "Password",
					type: "password",
				},
				status: {
					label: "Status"
				}
			},
			authorize: async (credentials, req) => {
				const user = await prisma.user.findUnique({
					where: { email: credentials?.email },
					select: {
						id: true,
						name: true,
						email: true,
						phoneNumber: true,
						password: true,
						status: true
					}
				})
				if (user && credentials?.password && comparePass(user.password, hashPass(credentials?.password)) && credentials.status === user.status) {
					return omit(user, "password")
				}
				return null
			}
		})
	],
	pages: {
		signIn: "/",
		error: "/"
	},
	session: { strategy: "jwt" },
	secret: process.env.NEXTAUTH_SECRECT
	/*callbacks: {
		async session({ session, user, token }) {
			let userDB = null
			if (user.email) {
				userDB = await prisma.user.findUnique({
					where: {
						email: user.email
					}
				})
			}
			let userData = null
			if (userDB) {
				userData = {
					name: userDB.name,
					email: userDB.email,
					image: userDB.image,
				}
			}
			if (userData)
				session.user = userData
			return Promise.resolve(session)
		}
	}*/
}

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			credentials: {
				email: {
					label: "Email",
					type: "email",
				},
				password: {
					label: "Password",
					type: "password",
				},
				status: {
					label: "Status"
				}
			},
			authorize: async (credentials, req) => {
				const user = await prisma.user.findUnique({
					where: { email: credentials?.email },
					select: {
						id: true,
						name: true,
						email: true,
						phoneNumber: true,
						password: true,
						status: true
					}
				})
				console.log(user)
				if (user && credentials?.password && comparePass(user.password, hashPass(credentials?.password)) && credentials.status === user.status) {
					return omit(user, "password")
				}
				return null
			}
		})
	],
	pages: {
		signIn: "/",
		error: "/"
	},
	session: {
		strategy: "jwt",
		maxAge: 60 * 60
	},
	secret: process.env.NEXTAUTH_SECRECT
})
