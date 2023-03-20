package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"regexp"

	firebase "firebase.google.com/go"
)

func main() {
	log.Printf("welcome to one and only, backend app!")

	app, err := firebase.NewApp(context.Background(), &firebase.Config{
		ProjectID: os.Getenv("GOOGLE_CLOUD_PROJECT"),
	})
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		ctx := context.Background()

		// disable CORS for testing
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if r.Method == http.MethodOptions {
			return
		}

		bearer := r.Header["Authorization"]
		if len(bearer) < 1 || bearer[0] == "" {
			handleErr(w, "no bearer token provided", http.StatusBadRequest)
			return
		}

		re := regexp.MustCompile(`(?i)Bearer (.+)`)
		matches := re.FindStringSubmatch(bearer[0])
		if len(matches) <= 1 {
			handleErr(w, "no bearer token provided", http.StatusBadRequest)
			return
		}

		idToken := matches[1]
		client, err := app.Auth(ctx)

		if err != nil {
			handleErr(w, fmt.Sprintf("error getting auth client: %v\n", err), http.StatusInternalServerError)
			return
		}

		token, err := client.VerifyIDToken(ctx, idToken)
		if err != nil {
			handleErr(w, fmt.Sprintf("error verifying ID token: %+v", err), http.StatusForbidden)
			return
		}

		b, err := json.Marshal(token)
		if err != nil {
			handleErr(w, fmt.Sprintf("error marshalling JSON: %+v", err), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(b)
	})

	log.Println("starting http server")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handleErr(w http.ResponseWriter, msg string, httpStatus int) {
	w.WriteHeader(httpStatus)
	fmt.Fprintln(w, msg)
	log.Println(msg)
}
