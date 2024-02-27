import React, { useState, useEffect } from "react";
import axios from "axios";
import { api, handleError } from "helpers/api";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";
import "react-datepicker/dist/react-datepicker.css";

interface NameChangeFieldProps {
  type?: string;
  value: string | "";
  onChange: (value: string) => void;
}

const NameChangeField: React.FC<NameChangeFieldProps> = ({ type = "text", value, onChange }) => (
  <div className="profile username">
    <input 
      className="profile input"
      type={type}
      placeholder="Enter the username you want to change.."
      value={value || ""}
      onChange={e => onChange(e.target.value)} 
    />
  </div>
);

const EditProfile = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("id") ?? "";

  const [id] = useState<string>(userid);
  const [username, setUsername] = useState<string | "">("");
  const [imageUrl, setImageUrl] = useState<string | "">("");
  const [birthday, setBirthday] = useState<string | "">("");

  useEffect(() => {
    axios.get("https://source.unsplash.com/random")
      .then((response) => setImageUrl(response.request.responseURL))
      .catch((error) => console.log(error));
  }, []);

  const doEditProfile = async () => {
    try {
      const requestBody = JSON.stringify({
        id: id,
        username: username,
        birthday: birthday,
      });
      await api.put(`/users/${id}`, requestBody);
      navigate(`/user/${id}`);
    } catch (error) {
      alert(`Something went wrong during the profile edit: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="profile container">
        <div className="profile avatar">
          {imageUrl && <img src={imageUrl} alt="profile img" className="profile img" />}
        </div>

        <div className="profile name">UserID: {id}</div>

        <div className="profile form">
          <div className="profile container">
            <NameChangeField
              type="date"
              value={birthday}
              onChange={setBirthday}
            />
            {/* <div className="profile username">Current Username: {userUsername}</div> */}
            <NameChangeField
              value={username || ""}
              onChange={setUsername}
            />
          </div>
        </div>

        <div className="login button-container">
          <Button width="100%" onClick={doEditProfile}>Save</Button>
        </div>

        <div className="login button-container">
          <Button width="100%" onClick={() => navigate(`/user/${id}`)}>Go back</Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default EditProfile;
