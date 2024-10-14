const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors());

const isAccessToken = true;
const userId = "0bdea430-22a8-11ed-95ea-2b2a607c289c";
const email = "swathika@jmangroup.com";

app.get('/', (req, res) => {
    return res.json({ health: 'Going Good, Health Is Better, updating to track changes 1' });
});

const headers =  {
    'Access-Token': isAccessToken,
    'user-id': userId,
    'email': email,
    'Host': 'productionbe.jinapps.co.uk',
    'Origin': 'https://jmangroup.jinapps.co.uk'
};

app.get('/projects', async (req, res) => {
    try {
        const result = await axios.get('https://productionbe.jinapps.co.uk/api/projects/', {
            headers: headers
        });
        return res.json({ data: result.data, error: null });
    } catch (error) {
        return res.json({ data: null, error: error.message });
    }
});

app.get('/api/getAllocation/:userId/:buId', async (req, res) => {
    const { userId, buId } = req.params;
    try {
        const result = await axios.get(`https://productionbe.jinapps.co.uk/api/getAllocation/${userId}/${buId}`, {
            headers: headers
        });
        return res.json({ data: result.data, error: null });
    } catch (error) {
        return res.json({ data: null, error: error.message });
    }
});

app.get('/api/business-unit/:buId', async (req, res) => {
    const { buId } = req.params;
    try {
        const result = await axios.get(`https://productionbe.jinapps.co.uk/api/business-unit/${buId}`, {
            headers: headers
        });
        return res.json({ data: result.data, error: null });
    } catch (error) {
        return res.json({ data: null, error: error.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`SERVER STARTED AT http://localhost:${PORT}`));
