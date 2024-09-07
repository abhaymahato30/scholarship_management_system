import React,
{ useContext, useEffect, useState } 
from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const Dashboard = () => {
  const [studentInfo,setStudentInfo] = useState([]);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/studentinfo/getall",
          { withCredentials: true }
        );
      setStudentInfo(data.  studentInfo);
      } catch (error) {
      setStudentInfo([]);
      }
    };
    fetchStudentInfo();
  }, []);

  const handleUpdateStatus = async (studentInfoId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/studentinfo//update/${studentInfoId}`,
        { status },
        { withCredentials: true }
      );
    setStudentInfo((prevstudentInfo) =>
      prevstudentInfo.map((studentInfo) =>
          studentInfo._id === studentInfoId
            ? { ...studentInfo, status }
            : studentInfo
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  

  return (
    <>
    <section className="dashboard page">
      <div className="banner">
       
     
          <div className="content">
            <div>
              <p>Hello ,</p>
              <h5>
                {admin &&
                  `${admin.firstName} ${admin.lastName}`}{" "}
              </h5>
            </div>
        
          </div>
    
     
      </div>
      <div className="banner">
        <h5>Applications</h5>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>email</th>
          
              <th> gender</th>
              <th>Document</th>

              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {  studentInfo &&   studentInfo.length > 0
              ?   studentInfo.map((studentInfo) => (

            

                  <tr key={studentInfo._id}>
                    <td>{`${studentInfo.firstName} ${studentInfo.lastName}`}</td>
                    <td>{`${studentInfo.email}`}</td>
                    <td>{`${studentInfo.gender}`}</td>
                    <td>    <img style={{height:"100px",width:"100px"}}
                  src={studentInfo.incomedocAvatar && studentInfo.incomedocAvatar.url}
                  alt="Income Certificate"
                /></td>
              
                    <td>
                      <select
                        className={
                          studentInfo.status === "Pending"
                            ? "value-pending"
                            : studentInfo.status === "Accepted"
                            ? "value-accepted"
                            : "value-rejected"
                        }
                        value={studentInfo.status}
                        onChange={(e) =>
                          handleUpdateStatus(studentInfo._id, e.target.value)
                        }
                      >
                        <option value="Pending" className="value-pending">
                          Pending
                        </option>
                        <option value="Accepted" className="value-accepted">
                          Accepted
                        </option>
                        <option value="Rejected" className="value-rejected">
                          Rejected
                        </option>
                      </select>
                    </td>
                  </tr>
                ))
              : "No Application Found!"}
          </tbody>
        </table>

        {}
      </div>
    </section>
  </>
   );
 };

export default Dashboard;
