const Modal = {
  open() {
    // Abrir modal
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const Storage = {
  getTransactions() {
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || [];
  },

  setTransactions(transactions) {
    localStorage.setItem(
      "dev.finances:transactions",
      JSON.stringify(transactions)
    );
  },

  getTheme() {
    return JSON.parse(localStorage.getItem("dev.finances:theme")) || "";
  },

  setTheme(theme) {
    localStorage.setItem("dev.finances:theme", JSON.stringify(theme));
  },
};

const Theme = {
  theme: Storage.getTheme(),
  toggle() {
    const theme = document.querySelector("body").classList.toggle("dark-theme");
    Storage.setTheme(theme);
  },

  load() {
    if (Theme.theme) {
      document.querySelector("body").classList.add("dark-theme");
    }
  },
};

const Transaction = {
  all: Storage.getTransactions(),
  add(transaction) {
    Transaction.all.push(transaction);

    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);
    console.log(index);
    App.reload();
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
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;

    DOM.transactionsContainer.appendChild(tr);
  },
  innerHTMLTransaction(transaction, index) {
    const amountClass = transaction.amount > 0 ? "income" : "expense";
    const amount = Utils.formatCurrency(transaction.amount);
    const html = `
			<td class="description">${transaction.description}</td>
			<td class="${amountClass}">${amount}</td>
			<td class="date">${transaction.date}</td>

			<td class="remove">
				<img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover Transa????o" />
			</td>

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

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
  },
};

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),
  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },
  validateFields() {
    const { description, amount, date } = Form.getValues();

    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
      throw new Error("Por favor, preencha todos os campos");
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues();
    amount = Utils.formatAmount(amount);

    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date,
    };
  },

  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },

  submit(event) {
    event.preventDefault();

    try {
      Form.validateFields();

      const transaction = Form.formatValues();
      Transaction.add(transaction);

      Form.clearFields();
      Modal.close();
    } catch (error) {
      alert(error.message);
    }
  },
};

const Utils = {
  formatAmount(value) {
    value = value * 100;

    return Math.round(value);
  },

  formatDate(date) {
    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  },
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

const App = {
  init() {
    Transaction.all.forEach((transaction, index) => {
      DOM.addTransaction(transaction, index);
    });

    DOM.updateBalance();

    Storage.setTransactions(Transaction.all);
  },

  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

App.init();
