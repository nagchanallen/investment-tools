package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/nagchanallen/investment-tools/services"
)

type IPortfolioController interface {
	GetStockTransactions(ctx *gin.Context)
	CreateStockTransaction(ctx *gin.Context)
	UpdateStockTransaction(ctx *gin.Context)
	DeleteStockTransaction(ctx *gin.Context)
}

type PortfolioController struct {
	PortfolioService services.IPortfolioService
}

func (c *PortfolioController) GetStockTransactions(ctx *gin.Context) {}

func (c *PortfolioController) CreateStockTransaction(ctx *gin.Context) {}

func (c *PortfolioController) UpdateStockTransaction(ctx *gin.Context) {}

func (c *PortfolioController) DeleteStockTransaction(ctx *gin.Context) {}
