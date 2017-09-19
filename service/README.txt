1) Download the Node Package Manager:

https://nodejs.org/en/

2) Install NPM using the .msi or package installer.

3) Create a workspace folder in your file system.  This is arbitrary and can be anything.

4) Inside that workspace, install the Express NodeJS services package using NodeJS' Node Package Manager.

    npm install express --save
    
5) Use NodeJS to run the service itself.

    node TournamentService.json
    
6) The service should be running on the configured at the configured port.

    You should see something like...
    
    Listening at http://0.0.0.0:8080

7) browse to the service with a browser, using the "/generateData" endpoint to initialize the test data.

    http://localhost:8080/generateData

8) browse to the service again, using the "/getAllTournaments" endpoint to see if it actually worked.

    You should see data in yoru browser.
    
9) Have a beer.  Preferablly a good one.