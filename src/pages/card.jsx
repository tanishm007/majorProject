import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import NavBar from '../component/navbar';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Carda(){

    const [allImage, setAllImage] = useState([]);

    const location = useLocation();
    const decodedData = location.state?.decodedData;

    
    const imageBase64 = async (file) => {
        const reader = new FileReader();
        
        await reader.readAsDataURL(file);
        
        return new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    let email;

    if(decodedData)
    {
        email = decodedData.email;
    }
    
    useEffect(() => {
        fetchImage(email?email:null); // Pass the decoded email to fetchImage function
    }, []);


    
    console.log(decodedData);
    const fetchImage = async (email) => {

        const url = email ? `http://localhost:8080/?email=${email}` : 'http://localhost:8080/';
        console.log("hello")
        const res = await fetch(url);
       
        const data = await res.json();
   
        setAllImage(data.data);
    }


    
    return (
        <>
        <NavBar></NavBar>
            <div className="container">
                <div className="row justify-content-center">
                    {allImage.map(el => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={el._id}>
                            <Image
                                src={el.image}
                                alt="Uploaded"
                                width="2000px"
                                height="500px"
                                fluid
                            />
                            <div className="card-body card shadow">
                                <p className="card-text">{el.imgType}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
}

export default Carda