package services

import (
	"context"

	models "github.com/nagchanallen/investment-tools/models/portfolio"
	repositories "github.com/nagchanallen/investment-tools/repositories/portfolio"
)

type IPortfolioService interface {
	GetStockTransactions(ctx context.Context, userId string, page int64, perPage int64, orderBy string) ([]models.StockTransaction, error)
	CreateStockTransaction(ctx context.Context, userId string, stockTransaction models.StockTransaction) (string, error)
	UpdateStockTransaction(ctx context.Context, userId string, stockTransaction models.StockTransaction) error
	DeleteStockTransaction(ctx context.Context, userId string, transactionId string) error
}

type PortfolioService struct {
	StockTransactionRepository repositories.IStockTransactionRepository
}

func (s *PortfolioService) GetStockTransactions(ctx context.Context, userId string, page int64, perPage int64, orderBy string) ([]models.StockTransaction, error) {
	return nil, nil
}

func (s *PortfolioService) CreateStockTransaction(ctx context.Context, userId string, stockTransaction models.StockTransaction) (string, error) {
	stockTransaction.GenerateID()
	stockTransaction.UpdateUpdatedAt()

	err := s.StockTransactionRepository.CreateStockTransaction(ctx, userId, stockTransaction)
	return stockTransaction.Id, err
}

func (s *PortfolioService) UpdateStockTransaction(ctx context.Context, userId string, stockTransaction models.StockTransaction) error {
	stockTransaction.UpdateUpdatedAt()

	err := s.StockTransactionRepository.UpdateStockTransaction(ctx, userId, stockTransaction)
	return err
}

func (s *PortfolioService) DeleteStockTransaction(ctx context.Context, userId string, transactionId string) error {
	err := s.StockTransactionRepository.DeleteStockTransaction(ctx, userId, transactionId)
	return err
}
