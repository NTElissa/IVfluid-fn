import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p><b>Name:</b> {user.firstName} {user.lastName}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Role:</b> {user.role}</p>
      <p><b>Hospital:</b> {user.hospital}</p>
    </div>
  );
}

export default Profile;
