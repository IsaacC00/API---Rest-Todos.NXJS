import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';

//? duncion para obtener el usuario del lado de servidor
export const getUserServerSession = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export const signInEmailPassword = async (email: string, password: string) => {
   
    if (!email || !password) return null;
   
    const user = await prisma.user.findUnique({ where: { email } })
    
    //? Si el usuario no existe ese crea uno nuevo
    if (!user) {
        const dbUser = await createUser(email,password);
        return dbUser;
    }
    
    //? Si la clave no coincide con la del usuario
    if (!bcrypt.compareSync( password, user.password ?? '' )) {
        return null;
    }
}

//? utilizamos bcriptjs para encriptar el password
const createUser = async(email: string, password: string) => {
  const newUser = await prisma.user.create({data:{
    email,
    password: bcrypt.hashSync(password),
    name:email.split('@')[0],
  }})

  return newUser;

}

