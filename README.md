# fragments
# Project Overview
This project builds a cloud-based microservice for a fictional Canadian manufacturer. 

This highly scalable service processes fragments of text and images from a sizeable amount of IoT devices, mobile apps, automated cameras on the company's assembly lines, etc.

The service connects seamlessly with the rest of the existing systems using existing authorization methods. It is deployed to AWS, which is the cloud provider used for the rest of the company's systems.

# Project Demo
To run a demo of this project, please follow these steps.

Clone the project to your local machine using the git command:
```
git clone https://github.com/thhuynh7/fragments.git
```
In the project directory, install node packages using the command:
```
npm install
```
Next, you can run the app in development mode with:
```
npm run dev 
```
or run it in production mode:
```
npm start 
```
or start debugging with:
```
npm run debug 
```

Finally, you can access the running server using one of the methods below:
1. Using your web browser to open the following URL:
```
http://localhost:8080/
```
2. Using curl in the terminal: 
```
curl localhost:8080
```
Or using curl and jq to pretty-print the JSON:
```
curl -s localhost:8080 | jq
```
or using curl with the -i flag to check the HTTP headers sent back by the server:
```
curl -i localhost:8080
```

Note: You can statically analyze your code to find problems by running the command:
```
npm run lint
```
