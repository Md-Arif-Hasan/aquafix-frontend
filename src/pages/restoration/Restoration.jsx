// import React, { useEffect, useState } from "react";
// import NavbarDashboard from "../../components/navbarDashboard/NavbarDashboard";
// import Navbar from "../../components/navbar/Navbar";
// import { useContext } from "react";
// import { AuthContext } from "../../contexts/Contexts";
// import "./restoration.css";

// export default function Restoration() {
//   const [signedIn, setSignedIn] = useState(false);
//   const [userImage, setUserImage] = useState(null);
//   const [processedImage, setProcessedImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { checkLoggedIn } = useContext(AuthContext);

//   useEffect(() => {
//     if (checkLoggedIn()) {
//       setSignedIn(true);
//     } else {
//       setSignedIn(false);
//     }
//   }, []);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setUserImage(file);
//   };

//   const handleSubmit = async () => {
//     if (!userImage) {
//       console.log("No image selected");
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//     formData.append("file", userImage);

//     try {
//       const response = await fetch("http://localhost:5000/restore", {
//         method: "POST",
//         body: formData,
//         responseType: "arraybuffer",
//       });

//       if (response.ok) {
//         // Create a blob from the binary response data
//         const blob = new Blob([await response.arrayBuffer()], { type: "image/jpeg" });

//         // Convert the blob to an image URL
//         const imageUrl = URL.createObjectURL(blob);

//         // Set the processed image URL to display it
//         setProcessedImage(imageUrl);
//       } else {
//         console.error("Image upload failed");
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = () => {
//     if (processedImage) {
//       const link = document.createElement("a");
//       link.href = processedImage;
//       link.download = "restored_image.jpg";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   return (
//     <>
//       {signedIn ? <NavbarDashboard /> : <Navbar />}
//       <div className="dashboard">
//         <div className="left-section">
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//           <button onClick={handleSubmit} className="submit-button">
//             Submit
//           </button>
//           {userImage && (
//             <img
//               className="input-image-preview"
//               src={URL.createObjectURL(userImage)}
//               alt="User Input Image"
//             />
//           )}
//         </div>
//         <div className="right-section">
//           <div className="restoration-header">
//             <h1>R E S T O R A T I O N</h1>
//           </div>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             processedImage && (
//               <>
//                 <img
//                   className="output-image-preview"
//                   src={processedImage}
//                   alt="Processed Image"
//                 />
//                 <button onClick={handleDownload} className="download-button">
//                   Download
//                 </button>
//               </>
//             )
//           )}
//         </div>
//       </div>
//     </>
//   );
// }








import React, { useEffect, useState } from "react";
import NavbarDashboard from "../../components/navbarDashboard/NavbarDashboard";
import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Contexts";
import "./restoration.css";

export default function Restoration() {
  const [signedIn, setSignedIn] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contrastImprovement, setContrastImprovement] = useState(null);
  const [sharpnessImprovement, setSharpnessImprovement] = useState(null);
  const [snrImprovement, setSNRImprovement] = useState(null);

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

  const handleSubmit = async () => {
    if (!userImage) {
      console.log("No image selected");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", userImage);

    try {
      const response = await fetch("http://localhost:5000/restore", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();

        setContrastImprovement(result.contrast_improvement);
        setSharpnessImprovement(result.sharpness_improvement);
        setSNRImprovement(result.snr_improvement);

        setProcessedImage(`http://localhost:5000/uploads/${result.restored_image_path}`);
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
      const link = document.createElement("a");
      link.href = processedImage;
      link.download = "restored_image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      {signedIn ? <NavbarDashboard /> : <Navbar />}
      <div className="dashboard">
        <div className="left-section">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={handleSubmit} className="submit-button"  style = {{marginBottom: "5rem"}} >
            Submit
          </button>
          {userImage && (
            <img
              className="input-image-preview"
              src={URL.createObjectURL(userImage)}
              alt="User Input Image"
            />
          )}
        </div>
        <div className="right-section">
          <div className="restoration-header">
            <h1>R E S T O R A T I O N</h1>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            processedImage && (
              <>
                <img
                  className="output-image-preview"
                  src={processedImage}
                  alt="Processed Image"
                />
                <div className="improvement-values">
                  <p>Contrast Improvement: {contrastImprovement}%</p>
                  <p>Sharpness Improvement: {sharpnessImprovement}%</p>
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
