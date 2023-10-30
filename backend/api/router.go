package api

import (
	"net/http"

	sentrygin "github.com/getsentry/sentry-go/gin"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func (s *Server) SetUpRouter() {
	r := gin.Default()
	r.Use(sentrygin.New(sentrygin.Options{
		Repanic: true,
	}))

	// TODO: Configure CORS properly
	// we enable CORS for all origins temporarily for smoother development
	// should be configured properly in production later
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"*"}
	corsConfig.AllowMethods = []string{"GET", "POST", "DELETE", "OPTIONS", "PATCH"}
	corsConfig.AllowHeaders = []string{"Accept", "Accept-Encoding", "Accept-Language", "Authorization", "Baggage", "Connection", "Content-Type", "Host", "Origin", "Referer", "Sentry-Trace"}

	r.Use(cors.New(corsConfig))

	controllerContainer := MakeControllerContainer(s.Db)
	portfolioRouter := r.Group("/portfolio").Use(Authorizer(s.Auth))
	{
		portfolioRouter.POST("/stock-transactions", controllerContainer.PortfolioController.GetStockTransactions)
		portfolioRouter.POST("/stock-transaction", controllerContainer.PortfolioController.CreateStockTransaction)
		portfolioRouter.PUT("/stock-transaction", controllerContainer.PortfolioController.UpdateStockTransaction)
		portfolioRouter.DELETE("/stock-transaction/:id", controllerContainer.PortfolioController.DeleteStockTransaction)
	}

	// For health check
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	s.Router = r
}
