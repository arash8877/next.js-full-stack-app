import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';



console.log({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
})

const handler = NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_ID || (() => { throw new Error("GOOGLE_ID is not defined in environment variables"); })(),
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || (() => { throw new Error("GOOGLE_CLIENT_SECRET is not defined in environment variables"); })(),
    })
  ],
  callbacks: {
    async session({ session }) {

      return session;
    },
    async signIn() {
      try {
       

        return true
      } catch (error) {
        if (error instanceof Error) {
          console.log("Error checking if user exists: ", error.message);
        } else {
          console.log("An unknown error occurred:", error);
        }
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }