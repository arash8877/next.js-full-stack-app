import { ReactNode } from "react";
import usePreVerifyRegister from "@/hooks/usePreVerifyRegister";

interface ProtectedLayoutProps {
  children: ReactNode;
}

//----------------------------------- Main Function ---------------------------------------

const PreVerifyRegisterProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  const authenticated = usePreVerifyRegister();

  if (!authenticated) {
    return null; 
  }

  return <>{children}</>;
};

export default PreVerifyRegisterProtectedLayout;
