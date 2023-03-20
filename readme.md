# Google Cloud Identity Platform Demo

This repository has two folders:
- `backend`
- `frontend`

The `backend` is a Go based HTTP server that can be run like `GOOGLE_CLOUD_PROJECT=my-google-project go run main.go`. It will list on port `8080` for requests and expect a header like `Authorization: Bearer ID_TOKEN`. The provided `ID_TOKEN` will be validated against Google Cloud Identity Platform. Do have that work out of the box without a service account key, run the service within Google Cloud (e.g. Cloud Run, Google Compute Engine).

```
cd backend;

# build container
docker build -t gcip-demo-backend:0.1 .

# run the docker container with your specific Google Cloud project
docker run --rm -p 8080:8080 -e GOOGLE_CLOUD_PROJECT=my-google-project gcip-demo-backend:0.1
```

The `frontend` is a React application that will call the `backend` service. If the user is not signed an error message from the `backend` should appear. If the user is logged the response of the Google Cloud Identity Platform will be retured.

```
cd frontend;

# fill in your custom values with the ones shown in Google Cloud Identity Platform
cp src/config.js.example src/config.js
# vim src/config.js

# build container
docker build -t gcip-demo-frontend:0.1 .

# run the docker container with your specific Google Cloud project
docker run --rm -p 3000:3000 gcip-demo-frontend:0.1
```

In the default configuration, the React application assumes the `backend` be availble at `localhost:8080` this can be changed in `frontend/src/config.js` with the `backendUrl` property.