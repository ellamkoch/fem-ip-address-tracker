# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)



## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Screenshot

![](./Screenshots/Final%20Design/Blank%20Mobile%20Search.png) Blank Search - Mobile Design
![](./Screenshots/Final%20Design/Error%20message.png) - Error Message from API - Mobile Design
![](./Screenshots/Final%20Design/Searched%20IP%20info%20results%20shown.png) - Full Search results

### Links

- Solution URL: [GitHub Repo](https://github.com/ellamkoch/fem-ip-address-tracker/tree/dev)
- Live Site URL: [Live site on GitHub](https://ellamkoch.github.io/fem-ip-address-tracker/)

## My process
### Geo.IPify API Signup
Signed up for an API key with a free account with Geo.IPify. Read through the documentation. Signup was quick.

On the final night where I presented, I had to sign up with a new account with GEO.IPify as I used all my credits shortly before the presentation occurred and swap out the API key information in Postman and my GET js file.

### Postman Testing of the API
Before building the UI, I fully tested the Geo.IPify API and documented with screenshots of Postman to confirm I had everything set up correctly. Early Postman requests originally failed or returned limited data because I used the country endpoint without specifying /country,city and forgot to include the apiKey= parameter in the query string. Once corrected, all responses returned full location data (city, region, postal code, timezone) as expected.

#### Environment Setup
| Variable | Value |
|-----------|--------|
| `baseUrl` | `https://geo.ipify.org/api/v2/country,city?` | - For the City/Country Version of the API
| `apiKey`  | (hidden for security) |

#### Tested Endpoints

| Test Name | Endpoint | Result | Screenshot |
|------------|-----------|---------|-------------|
| IP Search – Google | `ipAddress=8.8.8.8` |  200 OK → Mountain View, CA (Google LLC) | [View Screenshot](./Screenshots/postman/IP%20Search%20-%20Google.png) |
| IP – Wikipedia | `ipAddress=208.80.152.201` |  200 OK → Carrollton, TX (Wikimedia Foundation) | [View Screenshot](./Screenshots/postman/IP%20-%20Wikipedia.png) |
| Moodle Domain | `domain=moodle.com` |  200 OK → South Beach, CA (Cloudflare) | [View Screenshot](./Screenshots/postman/Moodle%20Domain.png) |
| FMCTC Domain | `domain=fmctc.com` |  200 OK → Singapore (Squarespace Hosting) | [View Screenshot](./Screenshots/postman/FMCTC%20Domain.png) |
| No Parameters (Auto-detect) | none |  200 OK → Current User IP (Walnut, IA) | [View Screenshot](./Screenshots/postman/No%20parameters.png) |
| Invalid IP Test | `ipAddress=192.168.0.132` |  422 Unprocessable Entity → Private IP not allowed | [View Screenshot](./Screenshots/postman/invalid%20ip.png) |
| Setup Debug (Error Fix) | Missing `country,city` in URL |  422 Unknown Plan → Fixed by adding correct endpoint path | [View Screenshot](./Screenshots/postman/Setup%20Debug.png) |
| New API key setup working | `domain=google.com `|  200 OK → Updated API Key since credits ran out on other account | [View Screenshot](./Screenshots/postman/New%20API%20key%20setup%20working.png) |


#### Findings
- The plan must be specified (`country,city`) in the base URL for successful responses.
- All requests use the GET method with query parameters (`apiKey`, `ipAddress`, or `domain`).
- Invalid or private IPs correctly return `422` responses, confirming proper validation handling.
- Early `422 Unknown plan` errors were resolved by appending the correct endpoint to the base URL.
- These results confirm all required API variations function correctly and are ready for front-end integration.
- Had to signup for a new account with Geo.IPify as I ran out of credits and redo redo postman setup for new API Key 30 minutes before presentation. Forgot to swap API key in JS GET file at first, but then remembered.

### Created HTML Pages and CSS Styling
I reviewed the Front end mentor design information and style guide and created a mobile version of the page, utilizing bootstrap for styling as much as possible. Added in Custom CSS where needed and then created the js files in a modular version. I used placeholder images for the map background since I took time to learn bootstrap and didn't have time to devote to learning about how to do the dynamic map display. Would love to do that another time though. 

The results card originally used a large negative margin to float over the map, which made it shift when zooming. Ulises reminded me that rem and % scale with browser zoom, so relative spacing can move. We decided not to over-engineer zoom handling at this time as its not common for typical users, but I stabilized the layout with Bootstrap utilities (position-relative, translate, and centered flex wrappers) so the card looks consistent at normal sizes.

### JS files
I mirrored my Pokémon API structure for modular files and used the code from the Pokemon API work as an example. It initially only worked for IPs because I hard-coded &ipAddress=. The final fix was a simple conditional:
// choose domain vs ip by checking for any letter
if (inputValue.match(/[a-zA-Z]/)) {
  endpoint = `${baseURL}${apiKey}&domain=${inputValue}`;
} else {
  endpoint = `${baseURL}${apiKey}&ipAddress=${inputValue}`;
}

I also fixed a case mismatch (baseUrl vs baseURL), which caused “baseURL is not defined.” After that, both domains and IPs worked consistently in Postman and in the app.
### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Bootstrap 5](https://getbootstrap.com/)
- Modular JavaScript (using [Axios](https://axios-http.com/))
- Postman for API testing
- Geo.IPify API for data

### What I learned

- Gained more experience working and testing APIs with postman.
- Learned a lot more about absolute positioning and how percentages actually behave inside relatively positioned containers.
Centering the map pin was a good example — using
```css
top: 25%;
left: 50%;
transform: translate(-50%, -100%);
```
- learned about how to use bootstrap and its limitations compared to custom css. for example, I tried to use bootstrap as much as possible, but there were some items I had to use custom css to make sure it was closer to the final design images from Front End Mentor.
- Reminded how to float pieces of the page, i.e. the search bar and other containers above the background images
- More experience trying to use variables and utilities css files for more organization of css styles
- More experience with making modular js files to separate functions and import/export them.
- For accessibility, I added aria-live for the results area and set up a <pre> element for showing API error messages for invalid searches.
- A tiny regex check (/[a-zA-Z]/) with .match() is enough to route domain vs IP searches.
- Zoom affects rem and % positioning; absolute layouts need careful anchoring.
- Cleaner separation of concerns with modular JS imports/exports.
- Better control over show/hide flow (spinner, error box, map/card) based on success/error states.

### Continued development
- Replace placeholder image with a live Leaflet map using the API coordinates.
- Finish desktop hover states and tighten spacing at larger breakpoints.
- (Optional) experiment with CSS variables or transforms to keep the card perfectly proportional during zoom.
- IP validation with ipv4 and/or 6 in the future with JS

### Useful resources
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/getting-started/introduction/) – main reference for class names, spacing utilities, and component options.
- [Traversy Media: Bootstrap 5 Crash Course](https://www.youtube.com/watch?v=4sosXZsdy-s) – helped me get more comfortable with Bootstrap’s spacing, grid, and button utilities.
- [Geo.IPify API Docs](https://geo.ipify.org/) – used for all Postman tests and API setup.
- [Frontend Mentor Challenge Page](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0) – the base project instructions and design specs.
- [CSS-Tricks: Complete Guide to Centering](https://css-tricks.com/centering-css-complete-guide/) – helped me understand how to use `transform` and percentages properly.
- [GeeksforGeeks: Center Absolutely Positioned Elements](https://www.geeksforgeeks.org/css/how-to-center-absolutely-positioned-element-in-div-using-css/) – another quick reference for pin placement.
- [Stack Overflow: CSS Centering with Transform](https://stackoverflow.com/questions/42121150/css-centering-with-transform) – cleared up why `top:50%` wasn’t perfect visually.
- [Reform Blog: Accessible Form Error Messaging](https://www.reform.app/blog/accessible-form-error-messaging-best-practices) – for the `<pre>` example and validation ideas.
- [NNG: Error Message Guidelines](https://www.nngroup.com/articles/error-message-guidelines/) – UX best practices for clear feedback.
- [W3C WAI: User Notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) – for accessible live-region error displays.
- [Stack Overflow](https://stackoverflow.com/questions/19855924/check-if-a-string-contains-a-letter-in-javascript)  – check if string contains a letter in JS
- [MDN Web Docs Regex basics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet)  –  Explains what [a-zA-Z] means — “match any character from lowercase a–z or uppercase A–Z.”

## Author
- Frontend Mentor - [@ellamkoch](https://www.frontendmentor.io/profile/ellamkoch)

## Acknowledgments
Thanks to Ulises and classmates for the feedback during the lead up to the presentation. Also using some Bootstrap tricks from Traversy’s videos helped me figure out the responsive parts a lot faster.
