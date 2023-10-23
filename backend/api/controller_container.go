package api

import (
	"cloud.google.com/go/firestore"
	"github.com/nagchanallen/investment-tools/controllers"
	repositories "github.com/nagchanallen/investment-tools/repositories/portfolio"
	"github.com/nagchanallen/investment-tools/services"
)

type ControllerContainer struct {
	PortfolioController controllers.IPortfolioController
}

func makePortfolioController(db *firestore.Client) *controllers.PortfolioController {
	stockTransactionRepo := repositories.StockTransactionRepository{Db: db}
	portfolioService := services.PortfolioService{StockTransactionRepository: &stockTransactionRepo}

	return &controllers.PortfolioController{PortfolioService: &portfolioService}
}

func MakeControllerContainer(db *firestore.Client) *ControllerContainer {
	return &ControllerContainer{
		PortfolioController: makePortfolioController(db),
	}
}
