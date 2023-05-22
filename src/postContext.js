import { createContext, useState } from "react";

export const PostContext = createContext(null);


export default  function ViewContext({ children }) {
    const [post, setPost] = useState('');
    return <PostContext.Provider value={{post,setPost}}> {/**authcontext 2 value pass cheythu */}
      {children} {/**app ne ithinde akathu akatum */}
      </PostContext.Provider>;
  }
  