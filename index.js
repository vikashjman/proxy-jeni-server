const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.get('/', (req, res) => {
    return res.json({ health: 'Going Good, Health Is Better' });
});

app.get('/projects', async (req, res) => {
    try {
        const result = await axios.get('https://productionbe.jinapps.co.uk/api/projects/', {
            headers: {
                // Add headers if required, e.g., Authorization: `Bearer ${token}`
            }
        });
        return res.json({ data: result.data, error: null });
    } catch (error) {
        return res.json({ data: null, error: error.message || 'An error occurred' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`SERVER STARTED AT http://localhost:${PORT}`));
