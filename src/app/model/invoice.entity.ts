export class Invoice {
  id: string;
  amount: string;
  code: string;
  paymentDate: string;
  paymentMethod: string;
  paymentState: string;

  constructor(id: string, code: string, amount: string, paymentDate: string,
              paymentMethod: string, paymentState: string) {
    this.id = id;
    this.code = code;
    this.amount = amount;
    this.paymentDate = paymentDate;
    this.paymentMethod = paymentMethod;
    this.paymentState = paymentState;
  }


}
