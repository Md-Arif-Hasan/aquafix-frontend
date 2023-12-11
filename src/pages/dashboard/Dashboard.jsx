import React, { useState, useEffect } from "react";
import NavbarDashboard from "../../components/navbarDashboard/NavbarDashboard";
import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Contexts";
import "./dashboard.css";

const DashboardPage = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [linkData, setLinkData] = useState({ enhance_links: [], restore_links: [] });
  const [signedIn, setSignedIn] = useState(false);
  const { checkLoggedIn } = useContext(AuthContext);


  useEffect(() => {
    // Fetch links from the Flask backend
    const fetchLinks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_links");
        if (response.ok) {
          const data = await response.json();
          setLinkData(data);
        } else {
          console.error("Failed to fetch links");
        }
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    fetchLinks();
  }, []);

  
  useEffect(() => {
    if (checkLoggedIn()) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  },[]);


  return (
    <>
      {signedIn ? <NavbarDashboard /> : <Navbar />}
      <div className="dashboard dashboard-page">
        <h1 className="page-title"> Edited Images</h1>
        
        <div className="previews-section">
          <h2>Enhance Previews</h2>
          <div className="image-gallery">
            {linkData.enhance_links.map((link, index) => (
              <div key={index} className="image-container">
                   <img src={`http://127.0.0.1:5000/uploads/${link[1]}`} alt={`Enhanced Image ${index + 1} Preview`} />
              </div>
            ))}
          </div>
          <h2>Restore Previews</h2>
          <div className="image-gallery">
            {linkData.restore_links.map((link, index) => (
              <div key={index} className="image-container">
                <img src={`http://127.0.0.1:5000/uploads/${link[1]}`} alt={`Restored Image ${index + 1} Preview`} />
              </div>
            ))}
          </div>


        </div>
      </div>
    </>
  );
};

export default DashboardPage;
