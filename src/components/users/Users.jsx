import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userList";
import { Grid, ListItem } from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { useNavigate } from "react-router-dom";

import "./users.css";

function formatTimestamp(timestamp, createOrUpdate) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  };
  const formatted = new Date(timestamp).toLocaleString("en-US", options);

  if (createOrUpdate === "create") {
    return (
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        <b>Created:</b> {formatted}
      </Typography>
    );
  }
  return (
    <Typography sx={{ mb: 1.5 }} color="text.secondary">
      <b>Last Updated:</b> {formatted}
    </Typography>
  );
}

function AllUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      const allUsers = await getAllUsers();
      setUsers(allUsers.data);
    }
    fetchUsers();
  }, []);

  return (
    <>
      {users.map((item) => (
        <Card className="userCards" key={item.id}>
          <CardContent>
            <Grid container rowSpacing={0}>
              <Grid item xs={8}>
                <ListItem style={{ height: "40px" }}></ListItem>
                <ListItem style={{ height: "40px" }}>
                  <Typography
                    sx={{ fontSize: 25, fontFamily: "Poppins" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {" "}
                    <a
                      onClick={() => navigate(`/users/${item.username}`)}
                    >
                      Username: {item.username}
                    </a>
                  </Typography>
                </ListItem>
                <ListItem>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <EmailRoundedIcon
                      sx={{ color: "#863812", width: 30, marginRight: "10px" }}
                    />{" "}
                    <span>{item.email}</span>
                  </div>
                </ListItem>
              </Grid>
              <Grid item xs={4}>
                <ListItem style={{ height: "60px" }}>
                  {formatTimestamp(item.updatedAt, "update")}
                </ListItem>
                <ListItem style={{ height: "50px" }}>
                  {formatTimestamp(item.createdAt, "create")}
                </ListItem>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default function UsersList() {
  return <AllUsers />;
}