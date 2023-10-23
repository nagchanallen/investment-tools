package services

import (
	"context"

	"github.com/google/uuid"
	models "github.com/nagchanallen/investment-tools/models/portfolio"
	repositories "github.com/nagchanallen/investment-tools/repositories/portfolio"
)

type IPortfolioService interface {
	GetStockTransactions(ctx *context.Context, userId string, page int64, perPage int64, orderBy string) ([]models.StockTransaction, error)
	CreateStockTransaction(ctx *context.Context, userId string, stockTransaction models.StockTransaction) (uuid.UUID, error)
	UpdateStockTransaction(ctx *context.Context, userId string, stockTransaction models.StockTransaction) error
	DeleteStockTransaction(ctx *context.Context, userId string, uuid uuid.UUID) error
}

type PortfolioService struct {
	repositories.IStockTransactionRepository
}

func (s *PortfolioService) GetStockTransactions(ctx *context.Context, userId string, page int64, perPage int64, orderBy string) ([]models.StockTransaction, error) {
	return nil, nil
}

func (s *PortfolioService) CreateStockTransaction(ctx *context.Context, userId string, stockTransaction models.StockTransaction) (uuid.UUID, error) {
	return uuid.UUID{}, nil
}

func (s *PortfolioService) UpdateStockTransaction(ctx *context.Context, userId string, stockTransaction models.StockTransaction) error {
	return nil
}

func (s *PortfolioService) DeleteStockTransaction(ctx *context.Context, userId string, uuid uuid.UUID) error {
	return nil
}
