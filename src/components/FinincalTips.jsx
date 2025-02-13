import React, { useEffect, useState } from "react";
import { GrMoney } from "react-icons/gr";
const financialTips = [
  {
    tip: "Build an emergency fund.",
    quote:
      "Do not save what is left after spending, but spend what is left after saving.",
    expert: "Warren Buffett",
  },
  {
    tip: "Invest in income-generating assets.",
    quote: "The rich invest in time, the poor invest in money.",
    expert: "Warren Buffett",
  },
  {
    tip: "Avoid lifestyle inflation.",
    quote:
      "The quickest way to double your money is to fold it in half and put it in your back pocket.",
    expert: "Will Rogers",
  },
  {
    tip: "Diversify your investments.",
    quote: "Don't put all your eggs in one basket.",
    expert: "Andrew Carnegie",
  },
  {
    tip: "Start investing early.",
    quote:
      "Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn’t, pays it.",
    expert: "Albert Einstein",
  },
  {
    tip: "Manage debt wisely.",
    quote:
      "A big part of financial freedom is having your heart and mind free from worry about the what-ifs of life.",
    expert: "Suze Orman",
  },
  {
    tip: "Create and follow a budget.",
    quote:
      "A budget is telling your money where to go instead of wondering where it went.",
    expert: "Dave Ramsey",
  },
  {
    tip: "Improve financial literacy.",
    quote: "An investment in knowledge pays the best interest.",
    expert: "Benjamin Franklin",
  },
  {
    tip: "Invest with patience.",
    quote:
      "The stock market is designed to transfer money from the active to the patient.",
    expert: "Warren Buffett",
  },
  {
    tip: "Work towards financial independence.",
    quote:
      "Financial freedom is available to those who learn about it and work for it.",
    expert: "Robert Kiyosaki",
  },
];
const FinincalTips = () => {
  const [showQuote, setShowQuote] = useState(financialTips[0]);

  useEffect(() => {
    setInterval(() => {
      setShowQuote(
        financialTips[Math.floor(Math.random() * financialTips.length)]
      );
    }, 3000);
  }, []);

  const { tip, quote, expert } = showQuote;
  return (
    <div
      className="d-flex flex-column justify-content-center gap-3 "
      style={{ height: "100%" }}
    >
      <div>
        <GrMoney className="text-success " style={{fontSize:'10rem'}}/>
      </div>
      <div>Watch your Money grow </div>
      <h4>{tip}</h4>
      <div className="fw-bolder">
        " {quote} " - {expert}
      </div>
    </div>
  );
};

export default FinincalTips;
