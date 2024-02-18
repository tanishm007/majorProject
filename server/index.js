const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 8080;

const app = express();

const schema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    imgType: { type: String, required: true }
});

const ImageModel = mongoose.model("Image", schema);

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get('/', async (req, res) => {
    try {

        const { email } = req.query;
        console.log(req.query);
        var data;
        if (email) {
            // If email is provided, filter images by email
            data = await ImageModel.find({ email: email });
        } else {
            // If no email provided, return all images
            data = await ImageModel.find({});
        }

        res.json({ message: "All images", data: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/upload', async (req, res) => {
    try {
        const { name, email, img, imgType } = req.body;
        if (!name || !email || !img || !imgType) {
            throw new Error("Missing required fields");
        }
        const image = new ImageModel({
            name,
            email,
            image: img,
            imgType
        });
        await image.save();
        res.status(201).send({ message: "Image successfully uploaded", success: true });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: error.message });
    }
});

mongoose.connect("mongodb://localhost:27017/imageBase64").then(() => {
    console.log('Db connected');
    app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
}).catch((err) => {
    console.log(err);
});
