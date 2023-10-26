package controllers

import (
	"errors"
	"net/http"
	"time"

	"firebase.google.com/go/v4/auth"
	"github.com/gin-gonic/gin"
	models "github.com/nagchanallen/investment-tools/models/portfolio"
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

func validateStockTransactionAction(action string) bool {
	switch action {
	case "BUY", "SELL":
		return true
	default:
		return false
	}
}

type GetStockTransactionsRequest struct {
	OrderBy       string `json:"orderBy" binding:"required"`
	SortDirection string `json:"sortDirection" binding:"required"`
	Limit         int    `json:"limit" binding:"required"`
	Cursor        string `json:"cursor"`
}

func validateSortDirection(sortDirection string) bool {
	switch sortDirection {
	case "ASC", "DESC":
		return true
	default:
		return false
	}
}

func (c *PortfolioController) GetStockTransactions(ctx *gin.Context) {
	authToken := ctx.MustGet("AuthToken").(*auth.Token)

	var request GetStockTransactionsRequest

	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !validateSortDirection(request.SortDirection) {
		err := errors.New("invalid sort direction")
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	GetStockTransactionsServiceArgs := services.GetStockTransactionsServiceArgs{
		UserId:        authToken.UID,
		OrderBy:       request.OrderBy,
		SortDirection: request.SortDirection,
		Limit:         request.Limit,
		Cursor:        request.Cursor,
	}

	stockTransactions, nextCursor, totalCount, err := c.PortfolioService.GetStockTransactions(ctx, GetStockTransactionsServiceArgs)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"data": stockTransactions, "nextCursor": nextCursor, "totalCount": totalCount})
}

type CreateStockTransactionRequest struct {
	Code       string    `json:"code" binding:"required"`
	Action     string    `json:"action" binding:"required"`
	Date       time.Time `json:"date" binding:"required"`
	Amount     int64     `json:"amount" binding:"required"`
	Price      float64   `json:"price" binding:"required"`
	Commission float64   `json:"commission"`
	Remark     string    `json:"remark"`
}

func (c *PortfolioController) CreateStockTransaction(ctx *gin.Context) {
	authToken := ctx.MustGet("AuthToken").(*auth.Token)

	var request CreateStockTransactionRequest
	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !validateStockTransactionAction(request.Action) {
		err := errors.New("invalid stock transaction action")
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	stockTransaction := models.StockTransaction{
		Code:       request.Code,
		Action:     request.Action,
		Date:       request.Date,
		Amount:     request.Amount,
		Price:      request.Price,
		Commission: request.Commission,
		Remark:     request.Remark,
	}

	stockTransactionId, err := c.PortfolioService.CreateStockTransaction(ctx, authToken.UID, stockTransaction)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"id": stockTransactionId})
}

type UpdateStockTransactionRequest struct {
	Id         string    `json:"id" binding:"required"`
	Code       string    `json:"code" binding:"required"`
	Action     string    `json:"action" binding:"required"`
	Date       time.Time `json:"date" binding:"required"`
	Amount     int64     `json:"amount" binding:"required"`
	Price      float64   `json:"price" binding:"required"`
	Commission float64   `json:"commission"`
	Remark     string    `json:"remark"`
}

func (c *PortfolioController) UpdateStockTransaction(ctx *gin.Context) {
	authToken := ctx.MustGet("AuthToken").(*auth.Token)

	var request UpdateStockTransactionRequest
	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !validateStockTransactionAction(request.Action) {
		err := errors.New("invalid stock transaction action")
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	stockTransaction := models.StockTransaction{
		Id:         request.Id,
		Code:       request.Code,
		Action:     request.Action,
		Date:       request.Date,
		Amount:     request.Amount,
		Price:      request.Price,
		Commission: request.Commission,
		Remark:     request.Remark,
	}

	err := c.PortfolioService.UpdateStockTransaction(ctx, authToken.UID, stockTransaction)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"id": stockTransaction.Id})
}

func (c *PortfolioController) DeleteStockTransaction(ctx *gin.Context) {
	authToken := ctx.MustGet("AuthToken").(*auth.Token)

	stockTransactionId := ctx.Param("id")

	err := c.PortfolioService.DeleteStockTransaction(ctx, authToken.UID, stockTransactionId)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"id": stockTransactionId})
}
