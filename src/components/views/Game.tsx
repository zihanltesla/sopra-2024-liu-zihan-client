import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom"; // Correct for React Router v6
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { User } from "types";

interface PlayerProps {
  user: User;
}

//define a react function component which want to receive 
const Player: React.FC<PlayerProps> = ({ user }) => {
  const statusStyle = {
    color: user.status === "ONLINE" ? "green" : "red",
  };

  return (
    <div className="player container">
      <div className="player username"><a href={`/user/${user.id}`} className="player namelink">Username: {user.username}</a></div>
      <div className="player name">Creation time: {user.registerDate}</div>
      <div className="player id">ID: {user.id}</div>
      <div className="player status">
        <span style={statusStyle}>{user.status}</span>
      </div>
    </div>
  );
};

Player.propTypes = {
  user: PropTypes.object,
};

const Game = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // Initialize with an empty array for correct mapping

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/users");
        // Simulating a delay for spinner demonstration
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsers(response.data);
      } catch (error) {
        console.error(`Fetching users error: ${handleError(error)}`);
        alert("Failed to fetch users. Redirecting to login.");
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]); // Correct dependency

  const logout = async () => {
    // Assuming logout logic is correctly implemented on your backend
    localStorage.removeItem("token");
    navigate("/login");
  };

  let content = users.length > 0 ? (
    <div className="game">
      <ul className="game user-list">
        {users.map((user) => (
          <Player key={user.id} user={user} />
        ))}
      </ul>
      <Button width="100%" onClick={logout}>
        Logout
      </Button>
    </div>
  ) : (
    <Spinner />
  );

  return (
    <BaseContainer className="game container">
      <h2>Happy Coding!</h2>
      <p>Get all users from a secure endpoint:</p>
      {content}
    </BaseContainer>
  );
};

export default Game;
