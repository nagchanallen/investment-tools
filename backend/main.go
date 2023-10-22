package main

import (
	"log"
	"net/http"
	"os"

	"context"

	firebase "firebase.google.com/go/v4"
	"github.com/gin-gonic/gin"
	"github.com/nagchanallen/investment-tools/config"
	"google.golang.org/api/option"
) 

func main() {
	configPath := os.Getenv("APP_CONFIG_PATH")
	config, err := config.LoadConfig(configPath)
	if (err != nil) {
		log.Fatalf("Error loading environment variable file from %v:\n %v", configPath, err)
	}

	ctx := context.Background()

	opt := option.WithCredentialsFile(config.FirebaseAdminSDKCredentialsFile)
	_, err = firebase.NewApp(ctx, nil, opt)
	if (err != nil) {
		log.Fatalf("Error ititializing app:\n %v", err)
	}

	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.Run()
}
