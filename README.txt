Name: Steve Jung
Email: steve.j.jung@vanderbilt.edu

How to run:
1. Ensure all node dependencies are installed, type below into terminal containing project folder
	npm install
2. Start the locally hosted restful api to get random words from the english-words.csv file by typing this in a terminal window
	node src/server.js
3. Run the application by running the following in a different terminal window
	npm start
4. When prompted to host on different port, type 'y'

Reflection:
Creating a restful API to retrieve data from a locally hosted server using csv parsing libraries in node proved to be a learning curve debugging requests and responses. In react, I developed an in-depth understanding of hooks and utilizing references and states to develop a unique user-interface to have boxes for each letter of the scrambled word to showcase a more interactive environment with colors to denote correct and incorrect guesses. To aid guessers, a dictionary API was called based on the current word to provide definitions as a hint.

Next Steps:
Building off the wordle-inspired interface where each letter is placed into a box. Everytime an incorrect guess was made, I could utilize each separate box to indicate if the letter is in the correct spot.

Bonus Question:
Ekreb => Berke
