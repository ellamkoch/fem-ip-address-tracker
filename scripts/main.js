//this file handles
// -capturing the user input,
// -calls the api,
// -shows the loading spinner and
// -displays the ip address location info, or an error.

// Import js services and call them here
import getIpInfo  from './services/getIpInfo.js';
import renderIpInfo from './components/renderIpInfo.js';
// console.log('main loaded');// proof of life check
// variables
const form = document.getElementById("search-bar");
const input = document.getElementById("ip-input");
const errorBox = document.getElementById("errorBox");
const spinner = document.getElementById("spinner");
const results = document.querySelector('.results'); // . targets the class. did this because....


form.addEventListener('submit', async (e)=> {
    e.preventDefault()// stops default page refresh/reload
    // console.log('submit button working');// proof of life

    //bootstrap validation
    // if (!form.checkValidity()) {// this calls for the validity check for what I did for bootstrap with
    //     form.classList.add('was-validated'); // boot strap validation styles will only show up with this.
    //     return; // stops functions there on the form if bootstrap validation is triggered. - saw this in the Traversy video, thought it was fun, but couldnt get it to display as I'd like, so removing for now.
    // }

    const ipValue = input.value.trim(); // grabs users input and trims it if they put extra spaces around it to ensure proper results are returned.

    if (!ipValue) {// Shows a friendly message in the <pre> area with the errorBox div. ! tells us that if the value isnt correct to trigger this error message.
        errorBox.classList.remove('visually-hidden');//removes visually hidden class)
        errorBox.textContent = "No input or improper IP address entered. Format must be as 8.8.8.8 or domain.com";
            return; // stop functions here if there's an error triggered based on this
    }
        //clears any previous error messages and rehides errorBox div
        errorBox.classList.add('visually-hidden');
        errorBox.textContent = '';

        //puts the loader/spinner on the page before the api call, then removes it to show the api response/results card
        spinner.removeAttribute('hidden'); // shows spinner before info is displayed.
        //clears card and hides it when new search occurs.
        results.classList.add('d-none');
        results.classList.remove('show');
        // clears out text in the card
        document.getElementById('ip-results').textContent = '';
        document.getElementById('location-results').textContent = '';
        document.getElementById('timezone-results').innerHTML = '<span class="timezone__label me-1 fs-4 fw-semibold">UTC</span>';
        document.getElementById('isp-results').textContent = '';

        try {
            const apiResponse = await getIpInfo(ipValue); // tells the function to try and call the getIpInfo function from the getIpInfo js file. await makes code pause until api sends back the response. object is returned from the function that is either a success or an error message, as listed in the getIpInfo.js file
            console.log('[apiResponse]', apiResponse); // check to see if we're getting response in the console

            renderIpInfo(apiResponse); // calls render function and puts in the api response info that's been stored.
            if (apiResponse.success) {
                results.classList.remove('d-none'); // removes the d-none in teh class and makes this section visible.
                results.classList.add('show'); //makes the fade animation work from bootstrap and shows the results section to reveal the fetched location info of the ip address.
            } else {
                results.classList.add('d-none'); // keep map/card hidden on errors
            }
            // clears the input after a search
            input.value = '';

        }
        catch (err) { // extra safety message in case there's an error that wasn't planned for.
            renderIpInfo({ // calls function from the renderIpInfo js file and displays it on the page.
                success: false,
                error: err //errorbox message is shown if there's an error
            });
            results.classList.add('d-none'); // rehides the results card on an error after a search has been performed.
        } finally {
            spinner.setAttribute('hidden', ''); // hides spinner after the the fetch of info and its displayed if its true. if its false, it displays the error, which is the preformatted text. completely.

        }
});
