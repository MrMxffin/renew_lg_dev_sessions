const axios = require('axios');
const cron = require('node-cron');
const tokenData = require('./data/tokens.json');

// Function to reset dev mode session
const resetDevModeSession = () => {
  tokenData.tokens.forEach((token) => {
    axios.get(`https://developer.lge.com/secure/ResetDevModeSession.dev?sessionToken=${token}`)
      .then(response => {
        console.log(`Success: Token ${token} - ${response.status}`);
      })
      .catch(error => {
        console.error(`Error: Token ${token} - ${error}`);
      });
  });
};

// Schedule the job to run every first day of the month at midnight
cron.schedule('0 0 1 * *', () => {
  console.log('Running the scheduled job: Resetting dev mode sessions');
  resetDevModeSession();
});
