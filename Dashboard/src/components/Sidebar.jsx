import React  from "react";
import { useState,useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HomeIcon from '@mui/icons-material/Home';
const Sidebar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(!show);
  };



  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };

  return (
    <>
       <nav
         style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
         className={show ? "show sidebar" : "sidebar"}
       >
         <div className="links">
           <HomeIcon onClick={gotoHomePage} />
          
           <PersonAddIcon onClick={gotoAddNewAdmin} />
           
       
           <LogoutIcon onClick={handleLogout} />
         </div>
       </nav>
       <div
         className="wrapper"
         style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
       >
         <MenuIcon className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
