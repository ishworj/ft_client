import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data }) => {

  // Aggregate income and expense amounts for each date
  const aggregatedData = data.reduce((acc, item) => {
    const date = new Date(item.date).toLocaleDateString();

    // If the date exists, add the amount to the correct type (income or expense)
    if (!acc[date]) {
      acc[date] = { income: 0, expense: 0 };
    }

    if (item.type === "Income") {
      acc[date].income += item.amount;
    } else if (item.type === "Expense") {
      acc[date].expense += item.amount;
    }

    return acc;
  }, {});

  // Prepare the labels (dates) and datasets (amounts)
  const labels = Object.keys(aggregatedData);
  const expenses = labels.map((date) => aggregatedData[date].expense);
  const income = labels.map((date) => aggregatedData[date].income);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Expense",
        data: expenses,
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Red color for expenses
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Income",
        data: income,
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Green color for income
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Expense vs Income",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `$${tooltipItem.raw}`, // Format tooltip to show value with $
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "80vw", height: "auto" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
