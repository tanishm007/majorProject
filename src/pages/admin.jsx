import React, { useEffect, useState } from 'react';
import './cardGenerator.css';
import { FaCloudUploadAlt } from "react-icons/fa";
import html2canvas from 'html2canvas';

function Admin() {
    const [name, setName] = useState("");
    const [batch, setBatch] = useState("");
    const [branch, setBranch] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [email, setEmail] = useState("");
    const [img, setImg] = useState(null);
    const [base64Img, setBase64Img] = useState("");
    const [imgType, setImgType] = useState("");
    const [allImage, setAllImage] = useState([]);

    const imageBase64 = async (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await imageBase64(file);
            setBase64Img(base64);
            setImg(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        fetchImage();
    }, []);

    const fetchImage = async () => {
        const url = email ? `http://localhost:8080/email?email=${email}` : 'http://localhost:8080/';
    
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setAllImage(data.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cardElement = document.getElementById('idCard');
        html2canvas(cardElement).then(async (canvas) => {
            const base64Image = canvas.toDataURL('image/png');
            const res = await fetch("http://localhost:8080/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, batch, branch, rollNumber, email, img: base64Image, imgType })
            });

            const data = await res.json();

            if (data.success) {
                alert(data.message);
                setName("");
                setBatch("");
                setBranch("");
                setRollNumber("");
                setEmail("");
                setImg(null);
                setBase64Img("");
                setImgType("");
                fetchImage();
            }
        });
    };

    return (
        <>
            <div className="navbar">
                <button className="navButton">Home</button>
                <button className="navButton">About</button>
                <button className="navButton">Help</button>
            </div>

            <div className="imageContainer">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="uploadImage" className="uploadBox">
                        <input type="file" id="uploadImage" onChange={handleImageUpload} />
                        {img ? <img src={img} alt="Uploaded" /> : <FaCloudUploadAlt />}
                    </label>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="batch">Batch:</label>
                        <input type="text" id="batch" value={batch} onChange={(e) => setBatch(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branch">Branch:</label>
                        <input type="text" id="branch" value={branch} onChange={(e) => setBranch(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rollNumber">Roll Number:</label>
                        <input type="text" id="rollNumber" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Image Type:</label>
                        <div className="radio-group">
                            <label className="radio-label">
                                <input type="radio" value="ID Card" checked={imgType === 'ID Card'} onChange={() => setImgType('ID Card')} />
                                ID Card
                            </label>
                            <label className="radio-label">
                                <input type="radio" value="Library Card" checked={imgType === 'Library Card'} onChange={() => setImgType('Library Card')} />
                                Library Card
                            </label>
                            <label className="radio-label">
                                <input type="radio" value="Bus Card" checked={imgType === 'Bus Card'} onChange={() => setImgType('Bus Card')} />
                                Bus Card
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="submit-button">Upload</button>
                </form>
        
            </div>

            <div className="banner">
                <h1>Dr.BR Ambedkar National Institute of Technology</h1>
            </div>

            <div id="idCard" className="id-card">
                <div className="id-card-header">
                    <img src="/bhav.png" alt="College Logo" className="college-logo" />
                    Dr.B R Ambedkar National Institute of Technology
                </div>
                <div className="id-card-body">
                    <div className="id-card-image">
                        {img && <img src={img} alt="Profile" />}
                    </div>
                    <div className="id-card-details">
                        <p>Name: {name}</p>
                        <p>Batch: {batch}</p>
                        <p>Branch: {branch}</p>
                        <p>Roll Number: {rollNumber}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;
