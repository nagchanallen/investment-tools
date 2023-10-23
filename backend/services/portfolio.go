package services

import (
	"github.com/google/uuid"
	models "github.com/nagchanallen/investment-tools/models/portfolio"
	repositories "github.com/nagchanallen/investment-tools/repositories/portfolio"
)

type IPortfolioService interface {
	GetStockTransactions(page int64, perPage int64, orderBy string) ([]models.StockTransaction, error)
	CreateStockTransaction(models.StockTransaction) (uuid.UUID, error)
	UpdateStockTransaction(models.StockTransaction) error
	DeleteStockTransaction(uuid.UUID) error
}

type PortfolioService struct {
	repositories.IStockTransactionRepository
}

func (s *PortfolioService) GetStockTransactions(page int64, perPage int64, orderBy string) ([]models.StockTransaction, error) {
	return nil, nil
}

func (s *PortfolioService) CreateStockTransaction(models.StockTransaction) (uuid.UUID, error) {
	return uuid.UUID{}, nil
}

func (s *PortfolioService) UpdateStockTransaction(models.StockTransaction) error {
	return nil
}

func (s *PortfolioService) DeleteStockTransaction(uuid.UUID) error {
	return nil
}
