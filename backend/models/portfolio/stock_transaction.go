package models

import (
	"time"

	"github.com/google/uuid"
)

type StockTransaction struct {
	Id         string    `firestore:"id,omitempty"`
	Code       string    `firestore:"code,omitempty"`
	Action     string    `firestore:"action,omitempty"`
	Date       time.Time `firestore:"date,omitempty"`
	Amount     int64     `firestore:"amount,omitempty"`
	Price      float64   `firestore:"price,omitempty"`
	Commission float64   `firestore:"commission,omitempty"`
	Remark     string    `firestore:"remark,omitempty"`
	UpdatedAt  time.Time `firestore:"updated_at,omitempty"`
}

func (t *StockTransaction) GenerateID() {
	id := uuid.New().String()
	t.Id = id
}

func (t *StockTransaction) UpdateUpdatedAt() {
	timeNowUTC := time.Now().UTC()
	t.UpdatedAt = timeNowUTC
}
