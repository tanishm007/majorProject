import React, { useEffect, useState } from 'react';
import './admin.css';
import { FaCloudUploadAlt } from "react-icons/fa";

function Admin() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [img, setImg] = useState("");
    const [imgType, setImgType] = useState("");
    const [allImage, setAllImage] = useState([]);

    const imageBase64 = async (file) => {
        const reader = new FileReader();

        await reader.readAsDataURL(file);

        return new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];

        const image = await imageBase64(file);
        setImg(image);
    }

    useEffect(() => {
        fetchImage();
    }, []);

    const fetchImage = async () => {
        const url = email ? `http://localhost:8080/email?email=${email}` : 'http://localhost:8080/';
    
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setAllImage(data.data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (img) {
            const res = await fetch("http://localhost:8080/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, img, imgType })
            });

            const data = await res.json();

            if (data.success) {
                alert(data.message);
                setName("");
                setEmail("");
                setImg("");
                setImgType("");
                fetchImage();
            }
        }
    }

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
                        <input type="file" id="uploadImage" onChange={handleUploadImage} />
                        {img ? <img src={img} alt="Uploaded" /> : <FaCloudUploadAlt />}
                    </label>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
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
                <div className='allimage'>
                    {allImage.map(el => {
                      
                        return <img key={el._id} src={el.image} width={"200px"} height={"150px"} alt="Uploaded" />
                    })}
                </div>
            </div>

            <div className="banner">
                <h1>Dr.BR Ambedkar National Institute of Technology</h1>
            </div>
        </>
    );
}

export default Admin;
