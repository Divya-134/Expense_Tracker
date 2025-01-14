const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const expenseForm = document.getElementById('expense-form');
const expenseTableBody = document.querySelector('#expense-table tbody');
const expenseChart = document.getElementById('expense-chart').getContext('2d');

let expenses = [];

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Handle sign up logic
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Handle login logic
    document.getElementById('auth').style.display = 'none';
    document.getElementById('expense-manager').style.display = 'block';
});

expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const category = e.target[0].value;
    const amount = e.target[1].value;
    const comments = e.target[2].value;
    const createdAt = new Date().toLocaleString();
    const updatedAt = createdAt;

    expenses.push({ category, amount, createdAt, updatedAt, comments });
    renderExpenses();
    e.target.reset();
});

function renderExpenses() {
    expenseTableBody.innerHTML = '';
    expenses.forEach((expense, index) => {
        const row = `<tr>
            <td>${expense.category}</td>
            <td>${expense.amount}</td>
            <td>${expense.createdAt}</td>
            <td>${expense.updatedAt}</td>
            <td>${expense.comments}</td>
            <td><button onclick="deleteExpense(${index})">Delete</button></td>
        </tr>`;
        expenseTableBody.innerHTML += row;
    });
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    renderExpenses();
}

// Optional: Data Visualization
const chartData = {
    labels: [...new Set(expenses.map(exp => exp.category))],
    datasets: [{
        label: 'Expenses by Category',
        data: expenses.map(exp => exp.amount),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }]
};

const myChart = new Chart(expenseChart, {
    type: 'pie',
    data: chartData,
});