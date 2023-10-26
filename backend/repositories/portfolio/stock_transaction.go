package repositories

import (
	"context"
	"errors"
	"log"

	"cloud.google.com/go/firestore"
	"cloud.google.com/go/firestore/apiv1/firestorepb"
	models "github.com/nagchanallen/investment-tools/models/portfolio"
)

type GetStockTransactionsRepositoryArgs struct {
	UserId        string
	OrderBy       string
	SortDirection string
	Limit         int
	Cursor        string
}

type IStockTransactionRepository interface {
	GetStockTransactions(ctx context.Context, args GetStockTransactionsRepositoryArgs) ([]models.StockTransaction, string, int64, error)
	CreateStockTransaction(ctx context.Context, userId string, stockTransaction models.StockTransaction) error
	UpdateStockTransaction(ctx context.Context, userId string, stockTransaction models.StockTransaction) error
	DeleteStockTransaction(ctx context.Context, userId string, transactionId string) error
}

type StockTransactionRepository struct {
	Db *firestore.Client
}

func (r *StockTransactionRepository) GetStockTransactions(ctx context.Context, args GetStockTransactionsRepositoryArgs) ([]models.StockTransaction, string, int64, error) {
	var sortDirection firestore.Direction

	if args.SortDirection == "DESC" {
		sortDirection = firestore.Desc
	} else {
		sortDirection = firestore.Asc
	}

	collection := r.Db.Collection("users").Doc(args.UserId).Collection("stock_transactions")

	aggregationQuery := collection.NewAggregationQuery().WithCount("all")
	countAggregationResults, err := aggregationQuery.Get(ctx)
	if err != nil {
		log.Printf("An error has occurred when getting countAggregationResults in GetStockTransactions:\n %s", err)
		return nil, "", 0, err
	}

	count, ok := countAggregationResults["all"]
	if !ok {
		err = errors.New("could not read count from countAggregationResults")
		log.Printf("An error has occurred when getting count in GetStockTransactions:\n %s", err)
		return nil, "", 0, err
	}

	countValue := count.(*firestorepb.Value)

	query := collection.OrderBy(args.OrderBy, sortDirection)
	if args.Cursor != "" {
		cursorDoc, err := collection.Doc(args.Cursor).Get(ctx)
		if err != nil {
			log.Printf("An error has occurred when getting cursorDoc in GetStockTransactions:\n %s", err)
			return nil, "", 0, err
		}
		cursorData := cursorDoc.Data()
		query = query.StartAfter(cursorData[args.OrderBy])
	}
	query = query.Limit(args.Limit)

	iter := query.Documents(ctx)
	snapShots, err := iter.GetAll()
	if err != nil {
		log.Printf("An error has occurred when getting snapShots in GetStockTransactions:\n %s", err)
		return nil, "", 0, err
	}

	var results []models.StockTransaction
	for _, snapShot := range snapShots {
		var result models.StockTransaction
		if err := snapShot.DataTo(&result); err != nil {
			log.Printf("An error has occurred when converting results in GetStockTransactions:\n %s", err)
			return nil, "", 0, err
		}
		results = append(results, result)
	}

	var cursor string

	if len(results) == 0 {
		cursor = ""
	} else {
		cursor = results[len(results)-1].Id
	}

	return results, cursor, countValue.GetIntegerValue(), nil
}

func (r *StockTransactionRepository) CreateStockTransaction(ctx context.Context, userId string, stockTransaction models.StockTransaction) error {
	_, err := r.Db.Collection("users").Doc(userId).Collection("stock_transactions").Doc(stockTransaction.Id).Create(ctx, stockTransaction)
	if err != nil {
		log.Printf("An error has occurred in CreateStockTransaction:\n %s", err)
	}
	return err
}

func (r *StockTransactionRepository) UpdateStockTransaction(ctx context.Context, userId string, stockTransaction models.StockTransaction) error {
	_, err := r.Db.Collection("users").Doc(userId).Collection("stock_transactions").Doc(stockTransaction.Id).Set(ctx, stockTransaction)
	if err != nil {
		log.Printf("An error has occurred in UpdateStockTransaction:\n %s", err)
	}
	return err
}

func (r *StockTransactionRepository) DeleteStockTransaction(ctx context.Context, userId string, transactionId string) error {
	_, err := r.Db.Collection("users").Doc(userId).Collection("stock_transactions").Doc(transactionId).Delete(ctx)
	if err != nil {
		log.Printf("An error has occurred in DeleteStockTransaction:\n %s", err)
	}
	return err
}
