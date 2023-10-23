package repositories

import (
	"cloud.google.com/go/firestore"
	"github.com/google/uuid"
	models "github.com/nagchanallen/investment-tools/models/portfolio"
)

type IStockTransactionRepository interface {
	GetStockTransactions(page int64, perPage int64, orderBy string) ([]models.StockTransaction, error)
	CreateStockTransaction(models.StockTransaction) error
	UpdateStockTransaction(models.StockTransaction) error
	DeleteStockTransaction(uuid.UUID) error
}

type StockTransactionRepository struct {
	Db *firestore.Client
}

func (r *StockTransactionRepository) GetStockTransactions(page int64, perPage int64, orderBy string) ([]models.StockTransaction, error) {
	return nil, nil
}

func (r *StockTransactionRepository) CreateStockTransaction(models.StockTransaction) error {
	return nil
}

func (r *StockTransactionRepository) UpdateStockTransaction(models.StockTransaction) error {
	return nil
}

func (r *StockTransactionRepository) DeleteStockTransaction(uuid.UUID) error {
	return nil
}
