import React, { useState, useEffect } from "react";
import axios from "axios";
import { api, handleError } from "helpers/api";
import { Button } from "../ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";
import { Spinner } from "components/ui/Spinner";

interface User {
    id: number;
    username: string;
    registerDate: string;
    birthday?: string;
    status: "ONLINE" | "OFFLINE";
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const localId = parseInt(localStorage.getItem("id") ?? "0", 10);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get("https://source.unsplash.com/random")
      .then((response) => setImageUrl(response.request.responseURL))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get<User>(`/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error(`Fetching user data failed: ${handleError(error)}`);
        alert("Failed to fetch user details.");
      }
    }

    fetchData();
  }, [id]);

  const ProfileField = ({ functionuser }: { functionuser: User }) => {
    const [showEditButton, setShowEditButton] = useState(false);

    useEffect(() => {
      setShowEditButton(functionuser.id === localId);
    }, [functionuser.id, localId]);

    const statusStyle = {
      color: functionuser.status === "ONLINE" ? "green" : "red",
    };

    return (
      <div className="profile container">
        <div className="profile name">User ID: {functionuser.id}</div>
        <div className="profile username">Username: {functionuser.username}</div>
        <div className="profile name">Creation Date: {functionuser.registerDate}</div>
        <div className="profile name">Birthday: {functionuser.birthday}</div>
        <div className="profile status">
          Online Status: <span style={statusStyle}>{functionuser.status}</span>
        </div>
        {showEditButton && (
          <div className="profile edit-button">
            <Button width="100%" onClick={() => navigate("/editprofile")}>Edit Profile</Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <BaseContainer>
      <div className="profile container">
        <div className="profile avatar">
          {imageUrl && <img src={imageUrl} alt="Profile" className="profile img" />}
        </div>
        {user ? <ProfileField functionuser={user} /> : <Spinner />}
        <div className="profile back-button">
          <Button width="100%" onClick={() => navigate("/game")}>Go Back</Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default ProfilePage;
