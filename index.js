const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors());

const XAuthToken = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IlN5V0o5cDRNa2VEdmxPcjVLZldxb2tRRlpsQzFxUFpaUWVKdVlOZ0k0cjgiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1jN2wzSXo5M2c3dXdnTmVFbW13X1dZR1BrbyIsImtpZCI6Ik1jN2wzSXo5M2c3dXdnTmVFbW13X1dZR1BrbyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8yODAwYzBhMC03MGU5LTQ5YmUtODczMy1mYWVhYTZhY2VkOTkvIiwiaWF0IjoxNzI3Njc2MTA3LCJuYmYiOjE3Mjc2NzYxMDcsImV4cCI6MTcyNzY4MTAxOSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFZUUFlLzhZQUFBQTNXbDczbElHYnoyNHh4VFJwWjFSYllxbmdQaGluUVNMams4Unlna3RkSCs1eXBlOUY5MlcyNUNaRndlMTJEUkhINWswK1VnOURzMTVXenNmdVVHaXM1aklIVWdlRHFkajltZUQybnpudXQzVEkwcU9FMzNyM01YQXRDR0ZhMTc3ZU9SQnZ4dXJDU0pMV2IxV1pPYnZnbXo3RkI4dkM4cmQwQzlaczJ1eDNsUT0iLCJhbXIiOlsicnNhIiwibWZhIl0sImFwcF9kaXNwbGF5bmFtZSI6IkpJTiIsImFwcGlkIjoiYWVhNGFmYzgtZGI3ZC00MzFkLTkzZGMtNDc3OGI2ZjU3YWMzIiwiYXBwaWRhY3IiOiIxIiwiZGV2aWNlaWQiOiIyZmFiMWM3ZS01ZTQ2LTQxYzMtYWZlZi0xMjA4NDEyOGE2YjkiLCJmYW1pbHlfbmFtZSI6IkMiLCJnaXZlbl9uYW1lIjoiU3dhdGhpa2EiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxNC45Ny4xNzAuMTUwIiwibmFtZSI6IlN3YXRoaWthIEMiLCJvaWQiOiIxYzFkYjM1YS1iNjZkLTQ4Y2ItYjc1OS1mNzkzNDg4NDcyNjMiLCJwbGF0ZiI6IjMiLCJwdWlkIjoiMTAwMzIwMDA5M0I4Q0Y2MSIsInJoIjoiMC5BVjhBb01BQUtPbHd2a21ITV9ycXBxenRtUU1BQUFBQUFBQUF3QUFBQUFBQUFBQVBBU0kuIiwic2NwIjoiQ2FsZW5kYXJzLlJlYWQgQ2FsZW5kYXJzLlJlYWQuU2hhcmVkIG9wZW5pZCBwcm9maWxlIFVzZXIuUmVhZCBVc2VyLlJlYWQuQWxsIFVzZXIuUmVhZEJhc2ljLkFsbCBlbWFpbCIsInNpZ25pbl9zdGF0ZSI6WyJkdmNfbW5nZCIsImttc2kiXSwic3ViIjoiSld4dUJ1cGdRZUVSQmdFWUpOWUV6NThtelh1bkFTdkZ5aDhXMVRFUTMtYyIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJFVSIsInRpZCI6IjI4MDBjMGEwLTcwZTktNDliZS04NzMzLWZhZWFhNmFjZWQ5OSIsInVuaXF1ZV9uYW1lIjoic3dhdGhpa2FAam1hbmdyb3VwLmNvbSIsInVwbiI6InN3YXRoaWthQGptYW5ncm91cC5jb20iLCJ1dGkiOiJnWW5tQUhVVTRFcUtPWWNGU1NZSkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiNiAxIiwieG1zX3N0Ijp7InN1YiI6Ijk1eWEwZ1ZWS1N6QW9vVVYzX3A2UFpWZ3VZa1FsYkl3MGpMTHU3N1c3OHcifSwieG1zX3RjZHQiOjE1Nzc3MjAxNjl9.02tXlAzUaKNdhFa0h6tBEval1CJdU4pz8cJfqcKSDZ2ikfr2ktOsOEo7WAV6zAqFI3ULA0BAJJU00Hk0DPn5zQ5RZHTvSMbRlRg3vCcPdyWw1iLer2WqIC0tVwz-fm1pwx37E4eJ9SgibgPWb2yTc5d6grPesvIRF6ijXED0SUG658spnAXo1b_c3kxmCoRQ9tPfxzYGz7Rqz2mSjyn1ReBODNVCm4qoAbg2ypyH_hPwgSAQmMjviYqg1hQ1nnUFvSbg9f62kkX4ik59lGpmvbpnsMAVlaa5FR3q579HwYlwM4ZNfksl-jYqo0-54ObbgOhsmj1CmyuxayYh48qGWw"
const isAccessToken = true;
const userId = "0bdea430-22a8-11ed-95ea-2b2a607c289c";
const email = "swathika@jmangroup.com"

app.get('/', (req, res) => {
    return res.json({ health: 'Going Good, Health Is Better, updating to track changes 1' });
});

const headers =  {
    'X-Auth-Token': XAuthToken,
    'Access-Token': isAccessToken,
    'user-id': userId,
    'email': email,
    'Host':'productionbe.jinapps.co.uk',
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
        
        const result = await axios.get(`https://productionbe.jinapps.co.uk/api/projects/getAllocation/${userId}/${buId}?startDate=2024-10-01&endDate=2024-10-31&dashboard=dashboard`, {
            headers: headers
        });
        return res.json({ data: result.data, error: null });
    } catch (error) {
        return res.json({ data: null, error: error.message });
    }
});

app.get('/api/business-unit', async (req, res) => {
    const { buId } = req.params;
    try {
        const result = await axios.get(`https://productionbe.jinapps.co.uk/api/business-unit`, {
            headers: headers
        });
        return res.json({ data: result.data, error: null });
    } catch (error) {
        return res.json({ data: null, error: error.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`SERVER STARTED AT http://localhost:${PORT}`));
