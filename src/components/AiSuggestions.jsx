import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { FaRobot } from "react-icons/fa";
import axios from "axios";
import { useUser } from "../context/UserContext";

const AiSuggestions = () => {
   const placement = window.innerWidth < 768 ? "left" : "bottom";
  const { transactions, getTransactions } = useUser();
  useEffect(() => {
    getTransactions();
  }, []);

  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);

  const Data = [
    { date: "10 feb 2024", income: "500", description: "From lotto" },
    { date: "12 feb 2024", expense: "400", description: "buy lotto ticket" },
    { date: "15 feb 2024", income: "500", description: "From work" },
    { date: "19 feb 2024", income: "1000", description: "From work" },
    {
      date: "20 feb 2024",
      expense: "500",
      description: "by loto lotto ticket",
    },
    { date: "20 feb 2024", expense: "500", description: "education" },
    { date: "25 feb 2024", expense: "100", description: "buy medicenes" },
  ];

  const question = `${JSON.stringify(
    Data
  )} by analyzing this data, suggest how to be financially stable.`;

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant analyzing financial data.",
            },
            {
              role: "user",
              content: question,
            },
          ],
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `Bearer lll`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuggestions(response.data.choices[0].message.content.trim());
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
      setSuggestions(
        "This section is under development  :  Sample message  Financial Overview:Income: $200Expenses: $2500Balance: -$50Suggestions:Reduce lotto ticket spending.Focus on essentials like education and health.Save regularly and track expenses."  
 
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <OverlayTrigger
      trigger="click"
      key={placement}
      placement={placement}
      overlay={
        <Popover id={`popover-positioned-${placement}`}>
          <Popover.Header as="h3">This Week Report</Popover.Header>
          <Popover.Body>
            {loading ? (
              <div>Loading suggestions...</div>
            ) : (
              <div>
                <p>
                  <strong>Suggestions:</strong>{" "}
                  {suggestions || "Click the button to get suggestions."}
                </p>
              </div>
            )}
          </Popover.Body>
        </Popover>
      }
    >
      <Button
        variant="light"
        className="p-0 text-success"
        onClick={fetchSuggestions}
      >
        <FaRobot style={{ height: "50px", width: "50px" }} />
      </Button>
    </OverlayTrigger>
  );
};

export default AiSuggestions;
