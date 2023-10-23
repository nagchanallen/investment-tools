package repositories

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	models "github.com/nagchanallen/investment-tools/models/portfolio"
)

type IStockTransactionRepository interface {
	GetStockTransactions(ctx context.Context, userId string, page int64, perPage int64, orderBy string) ([]models.StockTransaction, error)
	CreateStockTransaction(ctx context.Context, userId string, stockTransaction models.StockTransaction) error
	UpdateStockTransaction(ctx context.Context, userId string, stockTransaction models.StockTransaction) error
	DeleteStockTransaction(ctx context.Context, userId string, transactionId string) error
}

type StockTransactionRepository struct {
	Db *firestore.Client
}

func (r *StockTransactionRepository) GetStockTransactions(ctx context.Context, userId string, page int64, perPage int64, orderBy string) ([]models.StockTransaction, error) {
	return nil, nil
}

func (r *StockTransactionRepository) CreateStockTransaction(ctx context.Context, userId string, stockTransaction models.StockTransaction) error {
	_, err := r.Db.Collection("users").Doc(userId).Collection("stock_transactions").Doc(stockTransaction.Id).Set(ctx, stockTransaction)
	if err != nil {
		log.Printf("An error has occurred in CreateStockTransaction:\n %s", err)
	}
	return err
}

func (r *StockTransactionRepository) UpdateStockTransaction(ctx context.Context, userId string, stockTransaction models.StockTransaction) error {
	return nil
}

func (r *StockTransactionRepository) DeleteStockTransaction(ctx context.Context, userId string, transactionId string) error {
	_, err := r.Db.Collection("users").Doc(userId).Collection("stock_transactions").Doc(transactionId).Delete(ctx)
	if err != nil {
		log.Printf("An error has occurred in DeleteStockTransaction:\n %s", err)
	}
	return err
}
