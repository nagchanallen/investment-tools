package api

import (
	"errors"
	"net/http"
	"strings"

	"firebase.google.com/go/v4/auth"
	"github.com/gin-gonic/gin"
)

const (
	authorizationHeaderKey = "Authorization"
	authTokenKey           = "AuthToken"
)

func authorizeHeader(ctx *gin.Context, auth *auth.Client) (*auth.Token, error) {
	authorizationHeader := ctx.GetHeader(authorizationHeaderKey)

	if len(authorizationHeader) == 0 {
		err := errors.New("authorization header is missing")
		return nil, err
	}

	fields := strings.Fields(authorizationHeader)
	if len(fields) < 2 {
		err := errors.New("authorization header is malformed")
		return nil, err
	}

	authorizationScheme := strings.ToLower(fields[0])
	if authorizationScheme != "bearer" {
		err := errors.New("unsupported authentication scheme")
		return nil, err
	}

	idToken := fields[1]

	authToken, err := auth.VerifyIDTokenAndCheckRevoked(ctx, idToken)
	if err != nil {
		return nil, err
	}

	return authToken, nil
}

func Authorizer(auth *auth.Client) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authToken, err := authorizeHeader(ctx, auth)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		}

		ctx.Set(authTokenKey, authToken)
		ctx.Next()
	}
}
