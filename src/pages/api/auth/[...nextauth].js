/*import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import {MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI)

export default NextAuth({
    providers: [
        Provers.Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials){
                const user = { id: 1, name: }
            }
        })
    ]
})

//callbacks go here 
//defines who is a customer vs admin with the use of tokens too.

*/
//THIS IS INCOMPLETE