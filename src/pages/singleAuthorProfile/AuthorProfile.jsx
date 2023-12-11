import * as React from "react";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import NavbarDashboard from "../../components/navbarDashBoard/NavbarDashboard";
import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Contexts";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { getUserByUsername } from "../../services/user";
import BlogList from "../allBlogsPage/Blogs";

function UserInfo({ userName, userEmail }) {
  return (
    <div className="userInfoWrapper">
      <div>
        <div className="profilePicWrap">
          <img
            src="\src\assets\avatar.png"
            alt="profile"
            className="profilePic"
          />
        </div>

        <div className="infoForm">
          <Card className="blogCards">
            <CardContent style={{ overflowWrap: "break-word" }}>
              <hr style={{ border: "10px solid #e0d8c3" }} />
              <Typography
                variant="h5"
                component="div"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  color: "#863812",
                }}
              >
                Username: {userName}
              </Typography>
              <hr style={{ border: "10px solid #e0d8c3" }} />
              <Typography
                variant="h5"
                component="div"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "italic",
                  color: "#25383C",
                }}
              >
                Email: {userEmail}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <hr style={{ border: "3px solid #e0d8c3" }} />
      </div>
    </div>
  );
}

export default function UsersProfile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [blogCount, setBlogCount] = useState(0);
  const [signedIn, setSignedIn] = useState(false)
  const { checkLoggedIn } = useContext(AuthContext);

  const changePage = (page) => {
    setPageNumber(page);
  };

  const { username } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (checkLoggedIn()) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }

 

    async function fetchUserDetails() {
      const response = await getUserByUsername(username);
      if (response.status === 200) {
        setUserId(response.data.id);
        setUserName(response.data.username);
        setUserEmail(response.data.email);

        const pgNo = searchParams.get("pageNo");
        const pgSize = searchParams.get("pageSize");

        if (parseInt(pgNo) > 0 && pgNo !== "null") setPageNumber(pgNo);
        if (parseInt(pgSize) > 0 && pgSize !== "null") setPageSize(pgSize);
      } else {
        navigate("*");
      }
    }
    fetchUserDetails();
  }, [username, searchParams]);

  return (
    <>
      {signedIn ? <NavbarDashboard /> : <Navbar />}
      <UserInfo userName={userName} userEmail={userEmail} />
      
      <div style={{ margin: "1rem 10rem 3rem" }}>
        {  userId &&
          <BlogList
            blogAdded={null}
            setPageNumber={setPageNumber}
            setPageSize={setPageSize}
            authorId={userId}
            setBlogCount={setBlogCount}
          />
        }
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1rem 0",
          }}
        >
        
        <Pagination
          changePage={changePage}
          pageSize={pageSize}
          pageNumber={pageNumber}
          blogCount={blogCount}
        />
    </div>
      </div>
    </>
  );
}
