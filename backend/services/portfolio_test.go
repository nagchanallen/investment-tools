package services

import (
	"testing"
	"time"

	"context"

	models "github.com/nagchanallen/investment-tools/models/portfolio"

	repositories "github.com/nagchanallen/investment-tools/repositories/portfolio"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockedPortfolioRepository struct {
	mock.Mock
}

func (m *MockedPortfolioRepository) GetStockTransactions(ctx context.Context, args repositories.GetStockTransactionsRepositoryArgs) ([]models.StockTransaction, string, int64, error) {
	ret := m.Called(args)

	var r0 []models.StockTransaction
	if ret.Get(0) != nil {
		r0 = ret.Get(0).([]models.StockTransaction)
	}
	r1 := ret.Get(1).(string)
	r2 := ret.Get(2).(int64)
	r3 := ret.Error(3)

	return r0, r1, r2, r3
}

func (m *MockedPortfolioRepository) CreateStockTransaction(ctx context.Context, userId string, stockTransaction models.StockTransaction) error {
	ret := m.Called(userId, stockTransaction)

	r0 := ret.Error(0)

	return r0
}

func (m *MockedPortfolioRepository) UpdateStockTransaction(ctx context.Context, userId string, stockTransaction models.StockTransaction) error {
	ret := m.Called(userId, stockTransaction)

	r0 := ret.Error(0)

	return r0
}

func (m *MockedPortfolioRepository) DeleteStockTransaction(ctx context.Context, userId string, transactionId string) error {
	ret := m.Called(userId, transactionId)

	r0 := ret.Error(0)

	return r0
}

func TestGetStockTransactions(t *testing.T) {
	mockPortfolioRepository := new(MockedPortfolioRepository)

	stockTransactionData := models.StockTransaction{
		Id:         "Id",
		Code:       "Code",
		Action:     "Action",
		Date:       time.Now(),
		Amount:     20,
		Price:      35.25,
		Commission: 0.99,
		Remark:     "Remark",
	}

	mockPortfolioRepository.On("GetStockTransactions", mock.Anything).Return([]models.StockTransaction{stockTransactionData}, "12345", int64(1), nil)

	portfolioService := PortfolioService{
		StockTransactionRepository: mockPortfolioRepository,
	}

	stockTransactionResult, cursor, totalPage, err := portfolioService.GetStockTransactions(context.Background(), GetStockTransactionsServiceArgs{
		UserId:        "UserId",
		OrderBy:       "id",
		SortDirection: "DESC",
		Limit:         5,
		Cursor:        "123456",
	})

	assert.Equal(t, []models.StockTransaction{stockTransactionData}, stockTransactionResult)
	assert.Equal(t, "12345", cursor)
	assert.Equal(t, int64(1), totalPage)
	assert.NoError(t, err)
}

func TestCreateStockTransaction(t *testing.T) {

	mockPortfolioRepository := new(MockedPortfolioRepository)
	mockPortfolioRepository.On("CreateStockTransaction", mock.Anything, mock.Anything, mock.Anything).Return(nil)

	portfolioService := PortfolioService{
		StockTransactionRepository: mockPortfolioRepository,
	}

	_, err := portfolioService.CreateStockTransaction(context.Background(), "UserId", models.StockTransaction{})

	assert.NoError(t, err)
}

func TestUpdateStockTransaction(t *testing.T) {
	mockPortfolioRepository := new(MockedPortfolioRepository)
	mockPortfolioRepository.On("UpdateStockTransaction", mock.Anything, mock.Anything, mock.Anything).Return(nil)

	portfolioService := PortfolioService{
		StockTransactionRepository: mockPortfolioRepository,
	}

	err := portfolioService.UpdateStockTransaction(context.Background(), "UserId", models.StockTransaction{})

	assert.NoError(t, err)
}

func TestDeleteStockTransaction(t *testing.T) {
	mockPortfolioRepository := new(MockedPortfolioRepository)
	mockPortfolioRepository.On("DeleteStockTransaction", mock.Anything, mock.Anything, mock.Anything).Return(nil)

	portfolioService := PortfolioService{
		StockTransactionRepository: mockPortfolioRepository,
	}

	err := portfolioService.DeleteStockTransaction(context.Background(), "UserId", "TransactionId")

	assert.NoError(t, err)
}
