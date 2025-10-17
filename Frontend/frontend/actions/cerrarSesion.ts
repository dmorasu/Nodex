"use server"

import {cookies} from 'next/headers'
import { redirect } from 'next/navigation'


export async function cerrarSesion() {
    cookies().delete('TOKEN')
    redirect('/auth/login')
}