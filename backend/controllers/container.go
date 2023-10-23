package controllers

import (
	"cloud.google.com/go/firestore"
	repositories "github.com/nagchanallen/investment-tools/repositories/portfolio"
	"github.com/nagchanallen/investment-tools/services"
)

type ControllerContainer struct {
	PortfolioController IPortfolioController
}

func makePortfolioController(db *firestore.Client) *PortfolioController {
	stockTransactionRepo := repositories.StockTransactionRepository{Db: db}
	portfolioService := services.PortfolioService{StockTransactionRepository: &stockTransactionRepo}

	return &PortfolioController{PortfolioService: &portfolioService}
}

func MakeControllerContainer(db *firestore.Client) *ControllerContainer {
	return &ControllerContainer{
		PortfolioController: makePortfolioController(db),
	}
}
