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
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTransactions();
  }, []);

  const filtred = transactions.slice(-10).map((input) => {
    return {
      amount: input.amount,
      description: input.description,
      type: input.type,
    };
  });

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/openai",
        data: {
          question:
            JSON.stringify(filtred) +
            " anylaze this data and give me financial suggestion how money can be utilized in 4 points in  80 words answer will look like this    <h5>Suggestions</h5> 4* <li>  you can give some colours in tags to make sense to show red flag",
        },
      });

      if (response.data.content) {
        setLoading(false);
        setSuggestions(response.data.content);
      }
    } catch (error) {
      return {
        status: "error",
        message: error?.response?.data?.message || error.message,
      };
    }
  };

  return (
    <OverlayTrigger
      trigger="click"
      key={placement}
      placement={placement}
      overlay={
        <Popover id={`popover-positioned-${placement}`}>
          <Popover.Header as="h3">Based on recent transactions</Popover.Header>
          <Popover.Body>
            {loading ? (
              <div>Loading suggestions...</div>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: suggestions || "click the button to get suggestions",
                }}
              ></div>
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
