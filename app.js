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
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
  } else {
    console.log('Please Check Your Input');
  }

  e.preventDefault();
}
