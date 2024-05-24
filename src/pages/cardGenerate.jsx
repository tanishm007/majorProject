import React, { useState } from 'react';
import './cardGenerator.css';

function App() {
  const [name, setName] = useState('');
  const [batch, setBatch] = useState('');
  const [branch, setBranch] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="App">
      <h1>ID Card Generator</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Batch"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <div className="id-card">
        <div className="id-card-header">NIT JALANDHAR</div>
        <div className="id-card-body">
          <div className="id-card-image">
            {image && <img src={image} alt="Profile" />}
          </div>
          <div className="id-card-details">
            <p>Name: {name}</p>
            <p>Batch: {batch}</p>
            <p>Branch: {branch}</p>
            <p>Roll Number: {rollNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
