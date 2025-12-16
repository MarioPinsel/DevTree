import { isAxiosError } from 'axios'
import api from '../config/axios'
export async function getUser() {
    try {
        const { data } = await api('/user')
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error)
        }
    }
}