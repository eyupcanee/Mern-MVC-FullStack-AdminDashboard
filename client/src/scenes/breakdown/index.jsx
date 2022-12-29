import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import BreakdownChart from "components/BreakdownChart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Breakdown = () => {
  const token = useSelector((state) => state.global.userToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
    } else {
      navigate("/login");
    }
  }, [token]);
  return (
    <Box m="1.5rem 2rem">
      <Header title="BREAKDOWN" subtitle="Breakdown of sales by category." />
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default Breakdown;
