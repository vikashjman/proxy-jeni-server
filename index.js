const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const XAuthToken = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkI4b2IzeXlMalkyTHN2aHU5UFBKVUNvYnhuQlAwNmlZaWJsQzNaWENIYjAiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1jN2wzSXo5M2c3dXdnTmVFbW13X1dZR1BrbyIsImtpZCI6Ik1jN2wzSXo5M2c3dXdnTmVFbW13X1dZR1BrbyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8yODAwYzBhMC03MGU5LTQ5YmUtODczMy1mYWVhYTZhY2VkOTkvIiwiaWF0IjoxNzI3OTQ3NTk4LCJuYmYiOjE3Mjc5NDc1OTgsImV4cCI6MTcyNzk1MjkxNCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFZUUFlLzhZQUFBQXdHSFlWRDQ2cFE1YnZzSFFhbTl6Q1VZaWl1UUFJSXg1bHJIQ3pPZDFKZ3J3MG9ScDlBUnBVQzlsZm0yOTNPUmdZUVBWcDVJckF2SFI5QmVDU2t4MS9PaitxWjV5R21XUVhUOXBTWmF6WitPcVptdk9LS3E1ZSs2UW1aeGo4Q1NmeXorR1BqbTNTMWh3cHQxQjBOMmUvdE94M0gwTVJsRGxKVG9RbHpvWXFsQT0iLCJhbXIiOlsicnNhIiwibWZhIl0sImFwcF9kaXNwbGF5bmFtZSI6IkpJTiIsImFwcGlkIjoiYWVhNGFmYzgtZGI3ZC00MzFkLTkzZGMtNDc3OGI2ZjU3YWMzIiwiYXBwaWRhY3IiOiIxIiwiZGV2aWNlaWQiOiJhYjFlNjAyZC05ZTA2LTRhNzctODc0Zi02N2ViODQ0ZTU0YWUiLCJmYW1pbHlfbmFtZSI6IkRhcyIsImdpdmVuX25hbWUiOiJBbmlrZXQiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxNC45Ny4xNzAuMTUwIiwibmFtZSI6IkFuaWtldCBEYXMiLCJvaWQiOiJiODY0NjQ0MC0yNGRkLTRmMWYtYWZkMS0wZTEwZTcwZWQ5Y2QiLCJwbGF0ZiI6IjMiLCJwdWlkIjoiMTAwMzIwMDM0NTQ3NTJBQyIsInJoIjoiMC5BVjhBb01BQUtPbHd2a21ITV9ycXBxenRtUU1BQUFBQUFBQUF3QUFBQUFBQUFBQVBBVVUuIiwic2NwIjoiQ2FsZW5kYXJzLlJlYWQgQ2FsZW5kYXJzLlJlYWQuU2hhcmVkIFVzZXIuUmVhZCBVc2VyLlJlYWQuQWxsIFVzZXIuUmVhZEJhc2ljLkFsbCBwcm9maWxlIG9wZW5pZCBlbWFpbCIsInNpZ25pbl9zdGF0ZSI6WyJkdmNfbW5nZCIsImttc2kiXSwic3ViIjoiRnlLZkdZN0lQcDlSbDdCc3Y3OUhpSEZGYXZUSExUb3FVYmI3dHZXLWVvOCIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJFVSIsInRpZCI6IjI4MDBjMGEwLTcwZTktNDliZS04NzMzLWZhZWFhNmFjZWQ5OSIsInVuaXF1ZV9uYW1lIjoiYW5pa2V0ZGFzQGptYW5ncm91cC5jb20iLCJ1cG4iOiJhbmlrZXRkYXNAam1hbmdyb3VwLmNvbSIsInV0aSI6ImNfMUlpVlVPM1U2OTF1VTROcmN5QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfaWRyZWwiOiIxIDMwIiwieG1zX3N0Ijp7InN1YiI6IjlLU1pXS0tGQllXZThSZFRVY3lYQTBQQUtkSTN5bHp2Q2c3cUpsQTdJMWsifSwieG1zX3RjZHQiOjE1Nzc3MjAxNjl9.0xq0Dm-KSxcQ9_VNBu_NGmhPOu2JYFUyIFpXN8luhXTIEEiH_dYCs8WA2iVKwHtkxeUYcuOtyRFDLg3P3ac-LK8Tk3vxGzLJzd5727ysCB6Qbi8GYi04rNOLrLRSZaF10cH4RctLWiE-bwwSXdpVfngtYIcXfSL9WD-sUousAGRxTEHISsVZZnmN7huLgGe_dtZc0yJO_ek_8dm1XwgzwTda2lF33kuwPTlQ4ENkgbbYxvIePeoQqDAot5eC4VQxckheV_PkZyjExgNlEi-cF4tt0NeFBvtx5QGQyIAfT8SG_2L0NdpFH0F28YSaSx1ysaBvBkDMuQx3mMC7J2pnvQ"
const isAccessToken = true;
const userId = "a05b4d4e-f014-4a6f-80c4-ce451993ffe9";
const email = "aniketdas%40jmangroup.com"

app.get('/', (req, res) => {
    return res.json({ health: 'Going Good, Health Is Better' });
});

app.get('/projects', async (req, res) => {
    try {
        const result = await axios.get('https://productionbe.jinapps.co.uk/api/projects/', {
            headers: {
                'X-Auth-Token': XAuthToken,
                'AccessToken': isAccessToken,
                'userId': userId,
                'email': email
            }
        });
        return res.json({ data: result.data, error: null });
    } catch (error) {
        return res.json({ data: null, error: error.message || 'An error occurred' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`SERVER STARTED AT http://localhost:${PORT}`));
