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

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process
### Postman Testing of the API
Before building the UI, I fully tested the Geo.IPify API and documented with screenshots of Postman to confirm I had everything set up correctly. Early Postman requests originally failed or returned limited data because I used the country endpoint without specifying /country,city and forgot to include the apiKey= parameter in the query string. Once corrected, all responses returned full location data (city, region, postal code, timezone) as expected.

#### Environment Setup
| Variable | Value |
|-----------|--------|
| `baseUrl` | `https://geo.ipify.org/api/v2/` |
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

#### Findings
- The plan must be specified (`country,city`) in the base URL for successful responses.
- All requests use the GET method with query parameters (`apiKey`, `ipAddress`, or `domain`).
- Invalid or private IPs correctly return `422` responses, confirming proper validation handling.
- Early `422 Unknown plan` errors were resolved by appending the correct endpoint to the base URL.
- These results confirm all required API variations function correctly and are ready for front-end integration.


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
- For accessibility, I added aria-live for the results area and set up a <pre> element for showing example error messages later on.


### Continued development
If I have time, I’ll add the desktop version with hover states and finish the JavaScript for live API results of the location of the IP address searched.
Right now, I just used a static map image while setting up the layout.

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

## Author
- Frontend Mentor - [@ellamkoch](https://www.frontendmentor.io/profile/ellamkoch)

## Acknowledgments
Thanks to Ulises and classmates for the feedback during the lead up to the presentation. Also using some Bootstrap tricks from Traversy’s videos helped me figure out the responsive parts a lot faster.


