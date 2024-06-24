const axios = require('axios');
require('dotenv').config()
const CLERK_API_URL = 'https://api.clerk.dev/v1';

const getUsers = async (req, res) => {
  try {
    const response = await axios.get(`${CLERK_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
         'Content-Type': 'application/json'
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = getUsers

