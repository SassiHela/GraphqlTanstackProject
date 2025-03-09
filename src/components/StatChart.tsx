"use client"
import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

export default function StatsChart({ props }: any) {
  // Sample data
  const data2 = [
    { name: "Geeksforgeeks", value: 40 },
    { name: "Technical scripter", value: 70 },
    { name: "Geek-i-knack", value: 20 },
    { name: "Geek-o-mania", value: 100 },
  ];


  return (
    <BarChart width={600} height={300} data={props}>
      <Bar dataKey="value" fill="#88BE5D" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
    </BarChart>
  );
};

