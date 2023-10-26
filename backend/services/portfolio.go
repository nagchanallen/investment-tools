package services

import (
	"context"

	models "github.com/nagchanallen/investment-tools/models/portfolio"
	repositories "github.com/nagchanallen/investment-tools/repositories/portfolio"
)

type GetStockTransactionsServiceArgs struct {
	UserId        string
	OrderBy       string
	SortDirection string
	Limit         int
	Cursor        string
}

type IPortfolioService interface {
	GetStockTransactions(ctx context.Context, args GetStockTransactionsServiceArgs) ([]models.StockTransaction, string, int64, error)
	CreateStockTransaction(ctx context.Context, userId string, stockTransaction models.StockTransaction) (string, error)
	UpdateStockTransaction(ctx context.Context, userId string, stockTransaction models.StockTransaction) error
	DeleteStockTransaction(ctx context.Context, userId string, transactionId string) error
}

type PortfolioService struct {
	StockTransactionRepository repositories.IStockTransactionRepository
}

func (s *PortfolioService) GetStockTransactions(ctx context.Context, args GetStockTransactionsServiceArgs) ([]models.StockTransaction, string, int64, error) {
	GetStockTransactionsServiceArgs := repositories.GetStockTransactionsRepositoryArgs{
		UserId:        args.UserId,
		OrderBy:       args.OrderBy,
		SortDirection: args.SortDirection,
		Limit:         args.Limit,
		Cursor:        args.Cursor,
	}

	stockTransactions, nextCursor, totalCount, err := s.StockTransactionRepository.GetStockTransactions(ctx, GetStockTransactionsServiceArgs)

	return stockTransactions, nextCursor, totalCount, err
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
