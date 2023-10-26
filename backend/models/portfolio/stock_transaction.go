package models

import (
	"time"

	"github.com/google/uuid"
)

type StockTransaction struct {
	Id         string    `firestore:"id,omitempty" json:"id"`
	Code       string    `firestore:"code,omitempty" json:"code"`
	Action     string    `firestore:"action,omitempty" json:"action"`
	Date       time.Time `firestore:"date,omitempty" json:"date"`
	Amount     int64     `firestore:"amount,omitempty" json:"amount"`
	Price      float64   `firestore:"price,omitempty" json:"price"`
	Commission float64   `firestore:"commission,omitempty" json:"commission"`
	Remark     string    `firestore:"remark,omitempty" json:"remark"`
	UpdatedAt  time.Time `firestore:"updatedAt,omitempty" json:"updatedAt"`
}

func (t *StockTransaction) GenerateID() {
	id := uuid.New().String()
	t.Id = id
}

func (t *StockTransaction) UpdateUpdatedAt() {
	timeNowUTC := time.Now().UTC()
	t.UpdatedAt = timeNowUTC
}
