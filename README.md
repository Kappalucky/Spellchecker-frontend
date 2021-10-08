# Spellchecker-frontend

This folder contains the React built frontend for the Spellchecker application

## Getting Started

Please note, if your server is not running on port 31337, this will not work properly and the 'apiUrl' within pages/Main.js will have to be changed.

#### Prerequisites

- [Node](https://nodejs.org/en/)
- [npm](https://npmjs.com/en/)

#### Installation

1.  Install prerequisites if you have not already
2.  Install all package requirements
	```
	npm install
	```
3.  Start development server
	```
	npm start
	```
## Methodology

I kept the frontend rather simple, and named it "Busy Bee" as a play on word for spelling bee...since this is a spelling checker 😀.

The folder structure is pretty straightforward. I didn't see the need to separate everything into components across different folders or set up a router as this literally does only 1 thing.

I did add conditional statements using a functional approach though. It's a very different approach from Vue in the grand scheme of things but still relatively similar.