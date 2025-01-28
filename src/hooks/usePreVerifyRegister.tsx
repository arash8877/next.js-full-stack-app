import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

//----------------------------------- Main Function ---------------------------------------
const usePreVerifyRegister = () => {
  const [verified, setVerified] = useState(false);
  const router = useRouter();

  //--- request to check if user has verified email + post that user complete ----
  const CheckUserVerified = async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem("sp_token");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/users/verified`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data === true) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/users/complete`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      return response.data; // boolean
    } catch (error) {
      console.error("Error in verified", error);
      return false;
    }
  };

  //----------------------------------- useEffect ---------------------------------------
  useEffect(() => {
    const verifyUser = async () => {
      if (typeof window !== "undefined") {
        try {
          const isVerified = await CheckUserVerified();
          if (isVerified) {
            router.push("/register/step4");
          } else {
            setVerified(true);
          }
        } catch (error) {
          console.error("Error checking user verified", error);
          router.push("/login");
        }
      }
    };

    verifyUser();
  }, [router]);

  //----------------------------------- JSX ---------------------------------------
  return verified;
};

export default usePreVerifyRegister;
