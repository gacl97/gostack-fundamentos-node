import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    this.getBalance();
    return this.transactions;
  }

  public getBalance(): Balance {
    this.balance = this.transactions.reduce(
      (result, { value, type }) => {
        if (type === 'income') {
          result.income += value;
        } else {
          result.outcome += value;
        }
        result.total = result.income - result.outcome;

        return result;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
