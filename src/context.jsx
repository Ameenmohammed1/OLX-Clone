import { createContext, useState } from "react";

export const AuthContext = createContext(null);


export default function Context({ children }) {
  const [user, setUser] = useState('');
  return <AuthContext.Provider value={{user,setUser}}> {/**authcontext 2 value pass cheythu */}
    {children} {/**app ne ithinde akathu akatum app nu mukalil idunathinu thulyam*/}
    </AuthContext.Provider>;
}
