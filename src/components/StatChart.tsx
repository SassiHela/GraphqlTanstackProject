"use client";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function StatsChart({ data, color }: any) {
  return (
    <BarChart width={600} height={300} data={data}>
      <Bar dataKey="value" fill={color} />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
    </BarChart>
  );
}
