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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data }) => {
  const aggregatedData = data.reduce((acc, item) => {
    const date = new Date(item.date).toLocaleDateString();

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

  const labels = Object.keys(aggregatedData);
  const expenses = labels.map((date) => aggregatedData[date].expense);
  const income = labels.map((date) => aggregatedData[date].income);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Expense",
        data: expenses,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Income",
        data: income,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
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
          label: (tooltipItem) => `$${tooltipItem.raw}`,
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
