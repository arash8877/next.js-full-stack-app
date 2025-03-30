import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';



const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: '',
      clientSecret: '',
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