const Modal = {
  open() {
    // Abrir modal
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const transactions = [
  {
    id: 1,
    description: "Luz",
    amount: -50000,
    date: "23/01/2021",
  },
  {
    id: 2,
    description: "Website",
    amount: 500000,
    date: "23/02/2021",
  },
  {
    id: 3,
    description: "Internet",
    amount: -100000,
    date: "23/01/2021",
  },
];

const Transaction = {
  all: transactions,
  add(transaction) {
    Transaction.all.push(transaction);
  },
  incomes() {
    let income = 0;

    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });

    return income;
  },
  expenses() {
    let expense = 0;

    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense -= transaction.amount;
      }
    });

    return expense;
  },
  total() {
    let total = 0;

    Transaction.all.forEach((transaction) => {
      total += transaction.amount;
    });

    return total;
  },
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionsContainer.appendChild(tr);
  },
  innerHTMLTransaction(transaction) {
    const amountClass = transaction.amount > 0 ? "income" : "expense";
    const amount = Utils.formatCurrency(transaction.amount);
    const html = `
			<td class="description">${transaction.description}</td>
			<td class="${amountClass}">${amount}</td>
			<td class="date">${transaction.date}</td>

			<td><img src="./assets/minus.svg" alt="Remover Transação" /></td>

		`;

    return html;
  },
  updateBalance() {
    document.getElementById("income-display").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );
    document.getElementById("expense-display").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );
    document.getElementById("total-display").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },
};

const Utils = {
  formatCurrency(value) {
    const signal = value < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("pt-mz", {
      style: "currency",
      currency: "MZN",
    });
    return signal + value;
  },
};

transactions.forEach((transaction) => {
  DOM.addTransaction(transaction);
});

DOM.updateBalance();
