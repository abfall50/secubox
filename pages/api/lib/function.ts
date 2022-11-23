const bcrypt = require("bcrypt")
import sha256 from "crypto-js/sha256"

export const hashPass = (password: string) => {
	return sha256(password).toString()
}

export const comparePass = (password: string, hashPass: string) => {
	return password === hashPass
}