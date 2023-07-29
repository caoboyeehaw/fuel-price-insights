import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { getDatabase } from "./db";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const db = await getDatabase();
        const clientProfile = db.collection('ClientInfo');

        const user = await clientProfile.findOne({ username: credentials.username });

        if (user) {
          const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
          if (isPasswordMatch) {
            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        } else {
          return Promise.resolve(null);
        }
      }
    })
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user._id;
      }
      return token;
    },
    async session(session, token) {
      session.userId = token.id;
      return session;
    },
  },
  database: process.env.MONGODB_URI,
});


