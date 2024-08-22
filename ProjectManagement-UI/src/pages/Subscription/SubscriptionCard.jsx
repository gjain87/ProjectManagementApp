import { Button } from "@/components/ui/button";
import { createPayment } from "@/redux/Payment/Action";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch } from "react-redux";

const SubscriptionCard = ({ data }) => {
  const dispatch = useDispatch();
  const handleUpgrade = () => {
    dispatch(
      createPayment({
        planType: data.planType,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };
  return (
    <div className="rounded-xl bg-[#1b1b1b] bg-opacity-20 shadow-[#14173b] shadow-2xl card p-5 space-y-5 w-[18rem]">
      {data.planName === "Free" ? (
        <p className="text-green-500 font-semibold">{data.planName}</p>
      ) : (
        <p className="font-semibold">{data.planName}</p>
      )}
      <p className="flex gap-2 items-center">
        <span className="text-xl font-semibold">₹{data.price}/</span>
        <span className="font-bold text-gray-500">{data.planType}</span>
        {data.planType === "ANNUALLY" && (
          <p className="text-green-500">30% off</p>
        )}
      </p>

      <Button onClick={handleUpgrade} className="w-full">
        {data.buttonName}
      </Button>
      <div>
        {data.features.map((item) => (
          <div key="item" className="flex items-center gap-2">
            <CheckCircledIcon />
            <p className="text-gray-400">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionCard;
