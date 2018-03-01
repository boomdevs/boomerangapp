1) Download the Node Package Manager:

https://nodejs.org/en/

2) Install NPM using the .msi or package installer.

3) Open a command prompt window and change your GIT repo service directory

4) Inside that directory, install the Express NodeJS services package using NodeJS' Node Package Manager.

    npm install express --save

5) Also inside that directory, install the PostGres client and connection pool packages.

	npm install pg-pool
	npm install pg
    
6) Use NodeJS to run the service itself.

    node TournamentService.js
    
7) The service should be running on the configured at the configured port.

    You should see something like...
    
    Listening at http://0.0.0.0:8080

8) Browse to the service with a browser, using the "/generateData" endpoint to initialize the test data.

    http://localhost:8080/generateData

9) browse to the service again, using the "/getAllTournaments" endpoint to see if it actually worked.

    http://localhost:8080/getAllTournaments

    You should see data in your browser.
    
10) Have a beer.  Preferablly a good one.
