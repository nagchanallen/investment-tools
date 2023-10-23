package repositories

import (
	"context"

	"cloud.google.com/go/firestore"
	"github.com/google/uuid"
	models "github.com/nagchanallen/investment-tools/models/portfolio"
)

type IStockTransactionRepository interface {
	GetStockTransactions(ctx *context.Context, userId string, page int64, perPage int64, orderBy string) ([]models.StockTransaction, error)
	CreateStockTransaction(ctx *context.Context, userId string, stockTransaction models.StockTransaction) error
	UpdateStockTransaction(ctx *context.Context, userId string, stockTransaction models.StockTransaction) error
	DeleteStockTransaction(ctx *context.Context, userId string, uuid uuid.UUID) error
}

type StockTransactionRepository struct {
	Db *firestore.Client
}

func (r *StockTransactionRepository) GetStockTransactions(ctx *context.Context, userId string, page int64, perPage int64, orderBy string) ([]models.StockTransaction, error) {
	return nil, nil
}

func (r *StockTransactionRepository) CreateStockTransaction(ctx *context.Context, userId string, stockTransaction models.StockTransaction) error {
	return nil
}

func (r *StockTransactionRepository) UpdateStockTransaction(ctx *context.Context, userId string, stockTransaction models.StockTransaction) error {
	return nil
}

func (r *StockTransactionRepository) DeleteStockTransaction(ctx *context.Context, userId string, uuid uuid.UUID) error {
	return nil
}
