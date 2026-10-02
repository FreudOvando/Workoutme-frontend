export interface Payment {
  id: number
  userId: number
  userFullName: string
  amount: number
  paymentDate: string
  nextDueDate: string
  createdAt: string
}

export interface PaymentPayload {
  userId: number
  amount: number | null
  paymentDate: string | null
}