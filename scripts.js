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
  incomes() {},
  expenses() {},
  total() {},
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
			<td class="${amountClass}">${transaction.amount}</td>
			<td class="date">${transaction.date}</td>

			<td><img src="./assets/minus.svg" alt="Remover Transação" /></td>

		`;

    return html;
  },
};

const Utils = {
  formatCurrency(value) {
    const signal = value < 0 ? "-" : "";
  },
};

transactions.forEach((transaction) => {
  DOM.addTransaction(transaction);
});
