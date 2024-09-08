import axios from "axios";
import React  from "react";
import { useState,useContext} from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { Context } from "../main";


const AppointmentForm = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [incomedocAvatar, setIncomedocAvatar] = useState("");
  const [incomedocAvatarPreview, setIncomedocAvatarPreview] = useState("");


  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setIncomedocAvatarPreview(reader.result);
        setIncomedocAvatar(file);
    };
  };

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("phone", phone);
   
       
      
        formData.append("gender", gender);
      
        formData.append("incomedocAvatar", incomedocAvatar);
        await axios
          .post("https://scholarship-management-system-nine.vercel.app/api/v1/studentinfo/post", formData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            toast.success(res.data.message);
            setIsAuthenticated(true);
            navigateTo("/");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
         
          
            setGender("");
        
          });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
      }

  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Apply For Scholarship</h2>
        <form onSubmit={handleAppointment}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
      
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
         
          </div>
          <div>
              <img
                src={
                    incomedocAvatarPreview ? `${incomedocAvatarPreview}` : "/docHolder.jpg"
                }
                alt="Income certificate Image"
              />
              <input type="file" onChange={handleAvatar} />
            </div>
      
      
  
          <button style={{ margin: "0 auto" }} type="submit">Apply</button>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
