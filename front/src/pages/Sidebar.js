import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUseryId } from "../services/noteService";

const Sidebar = () => {
  const [users, setusers] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchShared = async () => {
      try {
        const user = await getUseryId(userId);
        setusers(user);
      } catch (error) {
        console.log("Error fetching user", error);
      }
    };

    fetchShared();
  }, []);

  return (
    <div
      className="sidebar"
      style={{ width: "250px", backgroundColor: "#f8f9fa", height: "100vh" }}
    >
      <div className="user-profile text-center py-4 ">
        <div
          className="user-icon"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          <img
            src="https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png"
            alt="User Icon"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        {users && (
          <>
            <div
              className="user-name mb-1 font-user"
              style={{ fontSize: "1.2rem", fontWeight: "bold" }}
            >
              {users.username}
            </div>
            <div className="user-email font-user" style={{ color: "#6c757d" }}>
              {users.email}
            </div>
          </>
        )}
      </div>
      {/* <h4>Navigation</h4> */}
      <ul className="nav nav-pills flex-column mb-auto font-header">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link active">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/notes/create" className="nav-link">
            Create Note
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
