# Getting Started

This project was developed for the purpose of completion of assessment for the role of Front end developer at Eurail.

## Features
1) Fetching the contacts list from http://randomuser.me/api. Fetching 500 results by default 
2) The contacts are grouped in tabs. 
3) When clicking on a contact, its card will be displayed with min-width of 400px and max-width of 500px to maintain the view.
4) When clicking on the close button of a card, it is being disappeared.
5) While a contact card is being displayed, if another contact is clicked, the first clicked contact card will be disappeared.
6) Responsiveness is achieved.
7) Documentation has been provided as part of comments in the code itself.
8) No Bootstrap or any other library has been used in developing the feature. Only for SASS has been used as css pre-processor.
9) The application is running successfully on latest Chrome and Firefox.
10) Tried to implement the same design to maintain consistency.

## Extra Features
1) Delete Contact from the list. Since the deletion is not supported by the API, so it is being achieved at Front-end level.
2) Select & Unselect all contacts for the active Tab.
3) Bulk Deletion of Contacts based on individual selection or Select All for the active Tab.
4) No. of records are also being updated in Tabs on deletion of any respective record.
5) Pagination has been implemented for Previous & Next Page.
6) Enhancement of Pagination by accepting the Page No. and/or No. of Records.
7) Filter contacts by search text(will match the search text in first and last name).
8) Add new record and edit current record can also be implemented, but didn't implement due to unavailability of APIs.
9) We can use font-awesome or other libraries for better User Experience but as per description in the document, I didn't use any library.

##Documentation

Documentation for the Developers has been written in the code files.
User Guide does not seem to be required because the app is very small scale.

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all the missing dependencies, if any.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
