"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceArea,
} from "recharts";

// Fake analytics data - Monthly only, without LinkedIn
const monthlyData = [
  { name: "Jan", instagram: 1400, shop: 800, youtube: 580 },
  { name: "Feb", instagram: 1200, shop: 1000, youtube: 500 },
  { name: "Mar", instagram: 1700, shop: 1200, youtube: 600 },
  { name: "Apr", instagram: 1500, shop: 900, youtube: 700 },
  { name: "May", instagram: 2100, shop: 1500, youtube: 800 },
  { name: "Jun", instagram: 1800, shop: 1700, youtube: 700 },
  { name: "Jul", instagram: 2500, shop: 2000, youtube: 900 },
];

// AI-predicted data (showing growth) - without LinkedIn
const aiPredictedData = [
  ...monthlyData,
  {
    name: "Aug",
    instagram: 2800,
    shop: 2300,
    youtube: 980,
    predicted: true,
  },
  {
    name: "Sep",
    instagram: 3200,
    shop: 2600,
    youtube: 1100,
    predicted: true,
  },
];

// AI-optimized order data (showing what happens if you reorder links as suggested by AI)
const aiOptimizedOrder = [
  { name: "Jan", instagram: 1400, shop: 800, youtube: 580 },
  { name: "Feb", instagram: 1200, shop: 1000, youtube: 500 },
  { name: "Mar", instagram: 1700, shop: 1200, youtube: 600 },
  { name: "Apr", instagram: 1500, shop: 900, youtube: 700 },
  { name: "May", instagram: 2100, shop: 1500, youtube: 800 },
  { name: "Jun", instagram: 2000, shop: 1900, youtube: 800 }, // Improved with AI ordering
  { name: "Jul", instagram: 2900, shop: 2300, youtube: 1050 }, // Improved with AI ordering
];

// Color configuration for the chart with transparency for a more modern look
const colors = {
  instagram: "rgba(225, 48, 108, 0.75)", // Instagram pink/purple
  shop: "rgba(76, 175, 80, 0.7)", // Shop green
  youtube: "rgba(255, 0, 0, 0.7)", // YouTube red
};

// Colors for line strokes (more solid)
const strokeColors = {
  instagram: "rgba(225, 48, 108, 0.9)",
  shop: "rgba(76, 175, 80, 0.85)",
  youtube: "rgba(255, 0, 0, 0.85)",
};
const totalClicks = monthlyData.reduce(
  (sum, entry) => sum + entry.instagram + entry.shop + entry.youtube,
  0,
);
export default function LinkAnalyticsGraph() {
  const [chartType, setChartType] = useState("bar");
  const [showAIPredictions, setShowAIPredictions] = useState(false);

  // Select the appropriate data based on AI toggles (monthly data only)
  let data = monthlyData;

  // If showing AI predictions
  if (showAIPredictions) {
    data = aiPredictedData;
  }
  return (
    <Card className="w-full shadow-lg border-gray-100 bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Link Performance Analytics
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Track how your links are performing across platforms
            </CardDescription>
          </div>
          <div className="text-xs font-medium text-indigo-700 flex items-center">
            <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100 mr-2">
              Monthly Data
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <Tabs
            defaultValue="bar"
            value={chartType}
            onValueChange={setChartType}
            className="w-auto"
          >
            <TabsList className="grid grid-cols-2 h-8 bg-gray-100/70">
              <TabsTrigger
                value="bar"
                className="text-xs py-1 data-[state=active]:bg-white"
              >
                Bar Chart
              </TabsTrigger>
              <TabsTrigger
                value="line"
                className="text-xs py-1 data-[state=active]:bg-white"
              >
                Line Chart
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* AI Feature Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <Switch
                checked={showAIPredictions}
                onCheckedChange={setShowAIPredictions}
                id="ai-predictions"
                className="data-[state=checked]:bg-indigo-500"
              />
              <label
                htmlFor="ai-predictions"
                className="text-xs font-medium text-gray-700 flex items-center gap-1"
              >
                Show AI Predictions
                <Badge className="ml-1 bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
                  AI
                </Badge>
              </label>
            </div>
          </div>
        </div>

        <div className="mb-4 px-4 py-3 bg-indigo-50/70 border border-indigo-100 rounded-lg flex items-start gap-3">
          <div className="mt-0.5 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 flex-shrink-0">
            {showAIPredictions ? (
              <svg
                className="w-3.5 h-3.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-indigo-800">
              {showAIPredictions ? "AI Prediction" : "AI Recommendation"}
            </h3>
            <p className="text-xs text-indigo-700 mt-0.5">
              {showAIPredictions
                ? "Growth of +28% in 60 days"
                : "Placing Instagram link at the top of your profile could increase total clicks by 18%."}
            </p>
          </div>
        </div>

        <div className="h-80 mt-4 relative">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={data} barGap={2}>
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="rgba(240, 240, 240, 0.6)"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "rgba(107, 114, 128, 0.8)" }}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(229, 231, 235, 0.6)" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "rgba(107, 114, 128, 0.8)" }}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(229, 231, 235, 0.6)" }}
                  tickFormatter={(value) =>
                    value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)",
                    border: "1px solid rgba(229, 231, 235, 0.5)",
                    fontSize: "12px",
                    padding: "12px",
                  }}
                  formatter={(value, name, props) => {
                    const entry = props.payload;
                    const label = entry.predicted
                      ? [`${value} clicks (AI predicted)`, name]
                      : [`${value} clicks`, name];
                    return label;
                  }}
                  cursor={{ fill: "rgba(243, 244, 246, 0.3)" }}
                  labelFormatter={(label, payload) => {
                    const entry = payload[0]?.payload;
                    return entry?.predicted ? `${label} (Predicted)` : label;
                  }}
                />
                {showAIPredictions && (
                  <ReferenceArea
                    x1="Jul"
                    x2="Sep"
                    y1={0}
                    fill="rgba(79, 70, 229, 0.05)"
                    stroke="rgba(79, 70, 229, 0.3)"
                    strokeDasharray="3 3"
                  />
                )}
                <Bar
                  dataKey="instagram"
                  fill={colors.instagram}
                  name="Instagram"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="shop"
                  fill={colors.shop}
                  name="Shop Link"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="youtube"
                  fill={colors.youtube}
                  name="YouTube"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            ) : (
              <LineChart data={data}>
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="rgba(240, 240, 240, 0.6)"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "rgba(107, 114, 128, 0.8)" }}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(229, 231, 235, 0.6)" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "rgba(107, 114, 128, 0.8)" }}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(229, 231, 235, 0.6)" }}
                  tickFormatter={(value) =>
                    value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)",
                    border: "1px solid rgba(229, 231, 235, 0.5)",
                    fontSize: "12px",
                    padding: "12px",
                  }}
                  formatter={(value, name, props) => {
                    const entry = props.payload;
                    const label = entry.predicted
                      ? [`${value} clicks (AI predicted)`, name]
                      : [`${value} clicks`, name];
                    return label;
                  }}
                  cursor={{ stroke: "rgba(156, 163, 175, 0.2)" }}
                  labelFormatter={(label, payload) => {
                    const entry = payload[0]?.payload;
                    return entry?.predicted ? `${label} (Predicted)` : label;
                  }}
                />
                {showAIPredictions && (
                  <ReferenceArea
                    x1="Jul"
                    x2="Sep"
                    fill="rgba(79, 70, 229, 0.05)"
                    stroke="rgba(79, 70, 229, 0.3)"
                    strokeDasharray="3 3"
                  />
                )}
                <Line
                  type="monotone"
                  dataKey="instagram"
                  stroke={strokeColors.instagram}
                  strokeWidth={2.5}
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    return payload.predicted ? (
                      <svg
                        x={cx - 6}
                        y={cy - 6}
                        width={12}
                        height={12}
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke={strokeColors.instagram}
                          strokeWidth="2"
                          fill="white"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="4"
                          fill={strokeColors.instagram}
                        />
                      </svg>
                    ) : (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={4}
                        stroke="white"
                        strokeWidth={2}
                        fill={strokeColors.instagram}
                      />
                    );
                  }}
                  activeDot={{ r: 6, stroke: "white", strokeWidth: 2 }}
                  name="Instagram"
                />
                <Line
                  type="monotone"
                  dataKey="shop"
                  stroke={strokeColors.shop}
                  strokeWidth={2.5}
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    return payload.predicted ? (
                      <svg
                        x={cx - 6}
                        y={cy - 6}
                        width={12}
                        height={12}
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke={strokeColors.shop}
                          strokeWidth="2"
                          fill="white"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="4"
                          fill={strokeColors.shop}
                        />
                      </svg>
                    ) : (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={4}
                        stroke="white"
                        strokeWidth={2}
                        fill={strokeColors.shop}
                      />
                    );
                  }}
                  activeDot={{ r: 6, stroke: "white", strokeWidth: 2 }}
                  name="Shop Link"
                />
                <Line
                  type="monotone"
                  dataKey="youtube"
                  stroke={strokeColors.youtube}
                  strokeWidth={2.5}
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    return payload.predicted ? (
                      <svg
                        x={cx - 6}
                        y={cy - 6}
                        width={12}
                        height={12}
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke={strokeColors.youtube}
                          strokeWidth="2"
                          fill="white"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="4"
                          fill={strokeColors.youtube}
                        />
                      </svg>
                    ) : (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={4}
                        stroke="white"
                        strokeWidth={2}
                        fill={strokeColors.youtube}
                      />
                    );
                  }}
                  activeDot={{ r: 6, stroke: "white", strokeWidth: 2 }}
                  name="YouTube"
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-100 pt-4 gap-4">
        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
          {Object.entries({
            instagram: "Instagram",
            shop: "Shop Link",
            youtube: "YouTube",
          }).map(([key, label]) => (
            <div
              key={key}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-50/70 rounded-full"
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: colors[key as keyof typeof colors] }}
              ></div>
              <span className="text-xs font-medium text-gray-600">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-blue-50/50 px-4 py-2 rounded-full">
          <div className="w-2 h-2 rounded-full bg-blue-500/70"></div>
          <div className="text-xs font-medium text-blue-800">
            Total clicks: {totalClicks.toLocaleString()}
            {showAIPredictions && (
              <span className="ml-1 text-green-600">(+28% with AI)</span>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
