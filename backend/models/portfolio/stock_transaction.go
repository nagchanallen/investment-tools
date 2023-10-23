package models

import (
	"time"

	"github.com/google/uuid"
)

type StockTransaction struct {
	Id         uuid.UUID
	Action     string
	Date       time.Time
	Amount     int64
	Price      float64
	Commission float64
	Remark     string
	UpdatedAt  time.Time // UTC Time
}

func (t *StockTransaction) GenerateID() {
	id := uuid.New()
	t.Id = id
}

func (t *StockTransaction) UpdateUpdatedAt() {
	timeNowUTC := time.Now().UTC()
	t.UpdatedAt = timeNowUTC
}
