/** @format */

import { useCallback } from "react";
import { useAuthContext } from "../contexts/AuthProvider";
import { apiFetch } from "../http-common/apiFetch";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/reducers/user.reducer";

export function useAuth() {

	// const {updateUser} = useAuthContext()

	const dispatch = useDispatch()

	const authentificate = async () => {
		try {
			const user : any = await apiFetch("/me", 'GET')
			dispatch(updateUser(user))
		} catch (error) {
			console.error(error)
		}
	}

	const login = useCallback( (username: string, password: string) => {
		apiFetch("/login", 'post', {password, username} ).then(
			(res : any) => {
				dispatch(updateUser(res))
			}
		).catch(error => {
			console.error(error)
		})
	}, []);

	const logout = useCallback(() => {
		apiFetch("/logout", 'post' ).then((res:any) => {
			dispatch(updateUser(res))
		});
	}, []);

	return {
		authentificate,
		login,
		logout,
	};
}
