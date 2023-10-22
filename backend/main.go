package main

import (
	"log"
	"os"

	"context"

	firebase "firebase.google.com/go/v4"
	"github.com/getsentry/sentry-go"
	"github.com/nagchanallen/investment-tools/api"
	"github.com/nagchanallen/investment-tools/config"
	"google.golang.org/api/option"
)

func main() {
	configPath := os.Getenv("APP_CONFIG_PATH")
	config, err := config.LoadConfig(configPath)
	if err != nil {
		log.Fatalf("Error loading environment variable file from %v:\n %v", configPath, err)
	}

	err = sentry.Init(sentry.ClientOptions{
		Dsn:              config.SentryDSN,
		TracesSampleRate: 1.0,
	})

	if err != nil {
		log.Fatalf("Error initializing sentry:\n %v", err)
	}

	ctx := context.Background()

	opt := option.WithCredentialsFile(config.FirebaseAdminSDKCredentialsFile)
	firebaseApp, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		log.Fatalf("Error initializing app:\n %v", err)
	}

	auth, err := firebaseApp.Auth(ctx)
	if err != nil {
		log.Fatalf("Error initializing auth:\n %v", err)
	}

	db, err := firebaseApp.Firestore(ctx)
	if err != nil {
		log.Fatalf("Error initializing firestore:\n %v", err)
	}

	server := api.NewServer(auth, db)
	server.Run()

	if err != nil {
		log.Fatalf("Error running server:\n %v", err)
	}
}
