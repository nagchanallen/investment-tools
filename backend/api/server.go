package api

import (
	"cloud.google.com/go/firestore"
	"firebase.google.com/go/v4/auth"
	"github.com/gin-gonic/gin"
)

type Server struct {
	Auth   *auth.Client
	Db     *firestore.Client
	Router *gin.Engine
}

func (s *Server) Run() error {
	return s.Router.Run()
}

func NewServer(auth *auth.Client, db *firestore.Client) *Server {
	server := &Server{
		Auth: auth,
		Db:   db,
	}

	server.SetUpRouter()

	return server
}
