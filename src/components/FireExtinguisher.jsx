// FireExtinguisher.jsx
import { useState, useEffect, useRef } from "react";
import { QrReader } from "react-qr-reader";
import jsQR from "jsqr";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import emailjs from "emailjs-com";
import styles from "../css/FireExtinguisher.module.css";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const checklistFields = [
  "Safety pin is intact",
  "Gauge is at green level",
  "Weight is appropriate",
  "No Pinholes/Damage/Rust",
  "Hanging clip is intact",
  "Easy accessible / No Block",
  "Refilling is overdue",
  "Instructions are visual",
  "Any other remarks - actions",
];

const FireExtinguisher = () => {
  const [theme, setTheme] = useState("light");
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [complaint, setComplaint] = useState("");
  const [email, setEmail] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [qrFile, setQrFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false);
  const videoStream = useRef(null);
  const [checklist, setChecklist] = useState(
    checklistFields.reduce((acc, field) => ({ ...acc, [field]: null }), {})
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const validateChecklist = () => {
    for (const field in checklist) {
      if (checklist[field] === null) {
        return false;
      }
    }
    return true;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setQrFile(file);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl = e.target.result;
      const img = new Image();
      img.src = imageDataUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const qrCode = jsQR(imageData.data, img.width, img.height);
        if (qrCode) {
          setScanResult(qrCode.data);
          setError(null);
        } else {
          setError("Unable to detect a QR code in the uploaded image.");
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const handleScan = (result) => {
    if (result?.text && result.text !== scanResult) {
      setScanResult(result.text);
      setError(null);
    }
  };

  const handleCheckboxChange = (field, value) => {
    setChecklist((prev) => ({ ...prev, [field]: value }));
  };

  const formatChecklist = () => {
    return checklistFields
      .map((field) => `${field}: ${checklist[field] || "Not answered"}`)
      .join("\n");
  };

  const handleSubmit = async () => {
    if (!validateChecklist()) {
      alert("Please answer all the checklist questions.");
      return;
    }

    if (!scanResult || !email) {
      alert("Please scan a QR code, enter a valid email, and complete the checklist.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      return;
    } else {
      setEmailError("");
    }

    try {
      const formattedChecklist = formatChecklist();

      await addDoc(collection(db, "complaints"), {
        qrCodeData: scanResult,
        checklist,
        userEmail: email,
        complaint,
        timestamp: new Date(),
      });

      emailjs
        .send(
          "service_1zasa7j",
          "template_pwdehif",
          {
            userEmail: email,
            qrCodeData: scanResult,
            complaint,
            checklist: formattedChecklist,
          },
          "wlx0gHIwJzdNLcMCR"
        )
        .then(() => alert("Checklist and complaint submitted successfully!"))
        .catch(() => alert("Error sending email."));

      setScanResult(null);
      setChecklist(checklistFields.reduce((acc, field) => ({ ...acc, [field]: null }), {}));
      setComplaint("");
      setEmail("");
      setError(null);
      setQrFile(null);
      setFileName("");
    } catch {
      alert("Error saving data to Firestore.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      setCameraPermissionDenied(false);
      setIsCameraOpen(true);
      videoStream.current = stream;
    } catch (err) {
      setCameraPermissionDenied(true);
      alert("Camera access denied. Please enable camera permissions in your browser.");
    }
  };

  const closeCamera = () => {
    if (videoStream.current) {
      const tracks = videoStream.current.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsCameraOpen(false);
  };

  useEffect(() => {
    if (!isCameraOpen) setScanResult(null);
  }, [isCameraOpen]);

  return (
    <div className={styles.container}>
      {/* Theme toggle (using a globally styled class) */}
      <div className="light-dark-toggle" onClick={toggleTheme}>
        <img
          src={
            theme === "light"
              ? "https://icon-library.com/images/moon-icon-png/moon-icon-png-19.jpg"
              : "https://icon-library.com/images/sun-icon-png/sun-icon-png-3.jpg"
          }
          alt={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          style={{
            width: "32px",
            height: "32px",
            cursor: "pointer",
            filter: theme === "dark" ? "invert(100%)" : "none",
          }}
        />
      </div>

      <h1>Fire Extinguisher Tracker</h1>

      {/* Wrap all sections in a scrollable container */}
      <div className={styles.scrollableContainer}>
        <div className={styles.section}>
          <h2>Scan QR Code</h2>
          <button onClick={isCameraOpen ? closeCamera : requestCameraPermission}>
            {isCameraOpen ? "Close Camera" : "Open Camera"}
          </button>
          {isCameraOpen && !cameraPermissionDenied && (
            <QrReader onResult={handleScan} constraints={{ facingMode: "environment" }} />
          )}
        </div>

        <div className={styles.section}>
          <h2>Upload QR Code</h2>
          <div className={styles["file-upload-container"]}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              key={qrFile ? qrFile.name : ""}
              style={{ display: "none" }}
            />
            <button onClick={() => document.querySelector('input[type="file"]').click()}>
              Choose File
            </button>
            {fileName && <span className={styles["file-name"]}>{fileName}</span>}
          </div>
        </div>

        {scanResult && (
          <div className={`${styles["qr-code-data"]} ${styles.section}`}>
            <h3>QR Code Data</h3>
            <p>{scanResult}</p>
          </div>
        )}

        <div className={styles.section}>
          <h2>Checklist</h2>
          {checklistFields.map((field, index) => (
            <div key={index} className={styles["checklist-item"]}>
              <label>{field}</label>
              <div className={styles["checkbox-group"]}>
                <label>
                  <input
                    type="radio"
                    name={field}
                    value="Yes"
                    checked={checklist[field] === "Yes"}
                    onChange={() => handleCheckboxChange(field, "Yes")}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={field}
                    value="No"
                    checked={checklist[field] === "No"}
                    onChange={() => handleCheckboxChange(field, "No")}
                  />
                  No
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <h2>Submit Complaint</h2>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {emailError && <p className={styles.error}>{emailError}</p>}
          <textarea
            placeholder="Your Complaint"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
          <button onClick={handleSubmit}>Submit Complaint</button>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default FireExtinguisher;
