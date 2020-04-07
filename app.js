// Hidden Elements
const loadingGif = document.getElementById('loading');
const resultsDiv = document.getElementById('results');
loadingGif.style.display = 'none';
resultsDiv.style.display = 'none';

// Listen For Submit
document
  .getElementById('loan-form')
  .addEventListener('submit', calculateResults);

// Calculate Results
function calculateResults(e) {
  // Input Variables
  const amountUI = document.getElementById('amount');
  const interesUI = document.getElementById('interest');
  const yearsUI = document.getElementById('years');

  // Result Variables
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  // Import Loan Calculation Variables
  const principal = parseFloat(amountUI.value);
  const calculatedInterest = parseFloat(interesUI.value) / 100 / 12;
  const calculatedPayments = parseFloat(yearsUI.value) * 12;

  // Compute Monthly Payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    loadingGif.style.display = 'block';
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    setTimeout(() => {
      loadingGif.style.display = 'none';
      resultsDiv.style.display = 'block';
    }, 850);
  } else {
    showError('Please Check Your Input...');
  }

  e.preventDefault();
}

function showError(error) {
  // Create The Error Message Element From Scratch
  const errorDiv = document.createElement('div');

  // Get Elements To Be Able To Append
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add Class
  errorDiv.className = 'alert alert-danger';

  // Create Text Node & Append To Div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert Error Above Heading
  card.insertBefore(errorDiv, heading);

  // Clear Error After 3 Seconds
  setTimeout(clearError, 3000);
}

// Clear Error
function clearError() {
  document.querySelector('.alert').remove();
}
