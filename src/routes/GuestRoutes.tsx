// import { Navigate } from "react-router-dom";
// import { Route, Routes ,useNavigate} from "react-router";
// import Auth from "../components/pages/Auth/Auth";
// import { useEffect, useState } from "react";

// interface RouteProps{
//   setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean>>
//   isLoggedIn:boolean
// }

// const GuestRoutes: React.FunctionComponent<RouteProps> = ({setIsLoggedIn , isLoggedIn}) => {
//   const navigate = useNavigate();
//   useEffect(() => { 
//     if(isLoggedIn) {
//       navigate("/dashboard");
//     }
//   },[isLoggedIn])
//   return (
  
//     <Routes>
    
//           {/* <Route path="/signup" element={<Auth />} /> */}
//           <Route path="/login" element={<Auth comp={"signIn"} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/> } />
//           <Route path="/signup" element={<Auth comp={"signUp"} isLoggedIn={isLoggedIn}/>} />
//           <Route path="/forgot" element={<Auth comp={"forgot"} isLoggedIn={isLoggedIn}/>} />
//           <Route path="/verify" element={<Auth comp={"activate"} isLoggedIn={isLoggedIn}/>} />
//           <Route path="/reset" element={<Auth comp={"reset"} isLoggedIn={isLoggedIn}/>} />
//           <Route path="*" element={<Navigate to="/login" replace />} />
          
          
//   </Routes>
  
  
  
// )};

// export default GuestRoutes;
