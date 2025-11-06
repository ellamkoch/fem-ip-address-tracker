// This file will be to pull information needed from the GEO.IPify API via axios

//Variables
const baseUrl = 'https://geo.ipify.org/api/v2/country,city?'; //Base url to pull info needed. Have to use City/Country version of url, not the Country version to make sure we pull back all info needed.
const apiKey = 'apiKey=at_JeyrbjM5jdY0NxCWP0N2dt02YztT4';
const ipAddressConfig = '&ipAddress='

async function getIpInfo(ipAddress) {
    const endpoint =`${baseUrl}${apiKey}${ipAddressConfig}${ipAddress}`;//this line builds the api url endpoint dynamically, based upon ip put in on html page

    try {
        const response = await axios.get(endpoint); // reaches out to axios to send a GET request to the pokemon api at the endpoint that matches what the user put in.

        const data = response.data;// extracts data object from the axios response // took await out. will put back in if it doesn't work as it should.

        return { // returns fetched information with a success flag. The success flag makes it easy for other files to validate if the function worked properly.
            success:true,
            data: data
        };

    } catch (error) { // to catch errors, i.e., invalid name, network issues. This block runs instead of crashing the page or becoming unresponsive.

        return { // returns a similar object like above, but when its false it includes the error information
            success: false,
            error: error
        };
        }
    }

     export default getIpInfo;
