# Celesta-Rendezvous
This project was created for submission to the celesta-hack-it-out hackathon. <br>
Check the working website here: https://celesta2022rendezvous.herokuapp.com
## Backend Setup
Clone the entire repo, move to the rendezvous_backend-master folder and open terminal, then type `npm i` <br> create a file called .env in rendezvous_backend-master folder
and type the following lines of code: (You need to use your own mongoDB connection string for this purpose) <br>
<pre>
PORT = 8080
MONGODB= [write your own connection string here within '' ]
SECRET_KEY= '38fa8f0e14afd15947d9c8ae6d0c77dc8ef6e113ac20d9a6d2d1c68c208d736a'
</pre>
After this, open terminal and type `node index`, and the server should start. <br>

## Frontend setup
After clone, move to the rendezvous_frontend-main folder, open terminal and type `npm i`. <br>
By default, the frontend will use the backend server hosted on heroku. To use a local server as backend, perform a global search in the folder for the text snippet
`const host` . Change all the host variables with your localhost url.<br>
To start the frontend, type `npm run dev` in the terminal
