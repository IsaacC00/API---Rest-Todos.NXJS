import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { signInEmailPassword } from "@/app/auth/actions/auth-actions";



export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Correo", type: "email", placeholder: "google.com" },
                password: { label: "Password", type: "password", placeholder: '********' }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = await signInEmailPassword(credentials!.email, credentials!.password)

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                }
                // If you return null then an error will be displayed advising the user to check their details.
                return null


            }
        })
    ],

    //? o el inicio de sesion sera con un JSON web token
    session: {
        strategy: 'jwt'
    },

    //? un callback es uan funcion que se ejecuta en cierto punto cuando se da la sesion 
    callbacks: {
        //? funcion para que N usuario pueda o no iniciar sesion 
        async signIn({ account, user, profile, email, credentials }) {
            return true;
        },
        //? token en el cuedo puedo agregerar cierta informacion 
        //? saber si esta activo, permisos de ususario
        async jwt({ token }) {
            //? obtenemos la informacion del usuario mediante el token, si no lo encuentra pasamos '' vacio
            const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? '' } });

            if (dbUser?.isActive === false) {
                throw Error('Usuario no Activo')
            }

            //? ahora ontenemos los roles de dbUser
            token.roles = dbUser?.roles ?? ['no-roles'];
            token.id = dbUser?.id ?? 'no-uuid';

            return token;
        },
        //? 
        async session({ session, token }) {

            if (session && session.user) {
                session.user.roles = token.roles;
                session.user.id = token.id;
            }

            return session;
        }
    }

}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };