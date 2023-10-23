package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (s *Server) SetUpRouter() {
	r := gin.Default()

	controllerContainer := MakeControllerContainer(s.Db)
	portfolioRouter := r.Group("/portfolio").Use(Authorizer(s.Auth))
	{
		portfolioRouter.GET("/stock-transactions", controllerContainer.PortfolioController.GetStockTransactions)
		portfolioRouter.POST("/stock-transaction", controllerContainer.PortfolioController.CreateStockTransaction)
		portfolioRouter.PUT("/stock-transaction", controllerContainer.PortfolioController.UpdateStockTransaction)
		portfolioRouter.DELETE("/stock-transaction", controllerContainer.PortfolioController.DeleteStockTransaction)
	}

	// For health check
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	s.Router = r
}
