import { jwtDecode } from "jwt-decode";

interface iJWTInfo {
  sponsor_id: string;
}

const useJWTUserInfo = (): {
  jwtInfo: iJWTInfo | null;
} => {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("sp_token")
      : null;
  if (!token) return { jwtInfo: null };

  const decoded = jwtDecode<iJWTInfo>(token);
  // console.log(decoded);
  return { jwtInfo: decoded };
};

export default useJWTUserInfo;
