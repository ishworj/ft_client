import React from "react";
import { Col, Row } from "react-bootstrap";
import CustomKPI from "./CustomKPI";
import DoughnutChart from "./chart/DoughnutChart";
import LineChart from "./chart/LineChart";
import balanceIcon from "../assets/balance.png";
import expenseIcon from "../assets/expense.png";
import incomeIcon from "../assets/income.png";
import { useEffect, useState } from "react";
import { formatChartData } from "../../helpers/chartDataHelper";
import BarChart from "./chart/BarChart";
import { useUser } from "../context/UserContext";

export default function DashboardChart() {
  const { transactions, getTransactions } = useUser();

  const [dashboardData, setDashboardData] = useState(formatChartData([]));

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    setDashboardData(formatChartData(transactions));
  }, [transactions]);

  return (
    <>
      <Row>
        <Col>
          <Row>
            <Col xs={4}>
              <CustomKPI
                bgColor="warning"
                iconSrc={balanceIcon}
                kpiType="Balance"
                kpiValue={dashboardData.balance.amount}
              />
            </Col>
            <Col xs={4}>
              <CustomKPI
                bgColor="success"
                iconSrc={incomeIcon}
                kpiType="Income"
                kpiValue={dashboardData.income.amount}
              />
            </Col>
            <Col xs={4}>
              <CustomKPI
                bgColor="danger"
                iconSrc={expenseIcon}
                kpiType="Expense"
                kpiValue={dashboardData.expense.amount}
              />
            </Col>
          </Row>

          <Row className="mt-2 ">
            <Col className="bg-dark  p-2 d-flex align-items-center justify-content-center ">
              <DoughnutChart data={dashboardData.balance.chartData} />
            </Col>
            <Col className="bg-dark  p-2 d-flex align-items-center justify-content-center">
              <LineChart
                data={dashboardData.income.lineData}
                options={dashboardData.income.options}
              />
            </Col>
            <Col className="bg-dark  p-2 d-flex align-items-center justify-content-center">
              <LineChart
                data={dashboardData.expense.lineData}
                options={dashboardData.expense.options}
              />
            </Col>
          </Row>
          <Row>
            <Col className="bg-dark rounded p-4 d-flex justify-content-center">
              <BarChart data={transactions} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
