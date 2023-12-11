
import React, { useEffect, useState } from "react";
import NavbarDashboard from "../../components/navbarDashboard/NavbarDashboard";
import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Contexts";
import "./enhancement.css";


export default function Dashboard() {
  const [signedIn, setSignedIn] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [MSE, setMSE] = useState(null);
  const [PSNR, setPSNR] = useState(null);

  const { checkLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (checkLoggedIn()) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, []);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserImage(file);
  };

  let response;

  const handleSubmit = async () => {
    if (!userImage) {
      console.log("No image selected");
      return;
    }
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append("file", userImage);
   
    try {
       response = await fetch("http://localhost:5000/enhance", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        if (response.bodyUsed) {
          console.error("Response body already used");
          return;
        }
          const result = await response.json();
  
        setMSE(result.MSE);
        setPSNR(result.PSNR);
       
        console.log(result);
        setProcessedImage(`http://localhost:5000/uploads/${result.processed_image_path}`);


      } else {
        console.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };
  

  

  const handleDownload = () => {
    if (processedImage) {

      const downloadLink = document.createElement("a");
      downloadLink.href = processedImage;
      downloadLink.download = "processed_image.jpg";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <>
      {signedIn ? <NavbarDashboard /> : <Navbar />}
      <div className="dashboard">
        <div className="left-section">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={handleSubmit} style = {{marginBottom: "5rem"}}
          className="submit-button">
            Submit
          </button>

          {userImage && (
            <img
              className="dashboard-image"
              src={URL.createObjectURL(userImage)}
              alt="User Input Image"
            />
          )}
        </div>
        <div className="right-section">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "1rem 0",
            }}
          >
            <h1>E N H A N C E M E N T</h1>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            processedImage && (
              <>
                <img
                  src = {processedImage}
                  alt="Processed Image"
                  style={{
                    width: userImage.width,
                    height: userImage.height,
                  }}
                />
                <div className="improvement-values">
                  <p> MSE : {MSE}</p>
                  <p>PSNR : {PSNR}</p>
                  {/* <p>SNR Improvement: {snrImprovement}%</p> */}
                </div>
                <button onClick={handleDownload} className="download-button">
                  Download
                </button>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
}
