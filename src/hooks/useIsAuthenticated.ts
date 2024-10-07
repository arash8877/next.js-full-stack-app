import { useEffect, useState } from "react";

export default function useIsAuthenticated() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if running on the client
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setAuthenticated(Boolean(token));
    }
  }, []);

  return authenticated;
}
