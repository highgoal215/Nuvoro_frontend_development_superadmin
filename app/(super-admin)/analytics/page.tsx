"use client";

import dynamic from "next/dynamic";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import {
  ChartPie,
  DollarSign,
  Download,
  MoveDown,
  MoveUp,
  RefreshCw,
  Zap,
} from "lucide-react";

import UserManagementIcon from "@/assets/icon/user-management.svg";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const userGrowthChartData = {
  options: {
    chart: {
      type: "area" as const,
      background: "transparent",
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#333333"],
    stroke: { curve: "smooth" as const, width: 2 },
    markers: {
      size: 4,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: { style: { colors: "#717171" } },
    },
    yaxis: {
      labels: { style: { colors: "#717171" } },
    },
    grid: {
      borderColor: "#FFFFFF26",
      strokeDashArray: 4,
    },
    theme: { mode: "dark" as const },
  },
  series: [
    {
      name: "User Growth",
      data: [150, 280, 275, 270, 140, 150],
    },
  ],
};

const revenueChartData = {
  options: {
    chart: {
      background: "transparent",
      toolbar: { show: false },
    },
    labels: ["Subscriptions", "Commissions", "Ads"],
    colors: ["#333333", "#4b5563", "#6b7280"],
    legend: {
      position: "bottom",
      labels: {
        colors: "#717171",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(1) + "%";
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    theme: { mode: "dark" as const },
  },
  series: [30000, 15000, 5000],
};

const systemPerformanceChartData = {
  options: {
    chart: {
      type: "area" as const,
      background: "transparent",
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#333333"],
    stroke: { curve: "smooth" as const, width: 2 },
    markers: {
      size: 4,
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: { style: { colors: "#717171" } },
    },
    yaxis: {
      labels: { style: { colors: "#717171" } },
    },
    grid: {
      borderColor: "#FFFFFF26",
      strokeDashArray: 4,
    },
    theme: { mode: "dark" as const },
  },
  series: [
    {
      name: "System Performance",
      data: [850, 930, 900, 950, 1300, 1350, 1330],
    },
  ],
};

const apiUsageChartData = {
  options: {
    chart: {
      background: "transparent",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#333333"],
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
      labels: { style: { colors: "#717171" } },
    },
    yaxis: {
      labels: { style: { colors: "#717171" } },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + "%";
        },
      },
    },
    legend: {
      position: "bottom",
      labels: {
        colors: "#717171",
      },
    },
    grid: {
      borderColor: "#FFFFFF26",
      strokeDashArray: 4,
    },
    theme: { mode: "dark" as const },
  },
  series: [
    {
      name: "API Usage",
      data: [120, 200, 150, 80, 70, 110],
    },
  ],
};

interface StatCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  status: boolean;
  growth: number;
}

const stats: StatCard[] = [
  {
    title: "Total Users",
    value: "24,892",
    icon: (
      <Image
        src={UserManagementIcon.src}
        className="w-5 h-5"
        alt="total users"
      />
    ),
    status: true,
    growth: 12.5,
  },
  {
    title: "Active Sessions",
    value: "1,234",
    icon: <Zap size={20} />,
    status: true,
    growth: 8.2,
  },
  {
    title: "Revenue",
    value: "$89,432",
    icon: <DollarSign size={20} />,
    status: true,
    growth: 15.3,
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    icon: <ChartPie size={20} />,
    status: false,
    growth: 2.1,
  },
];

export default function Analytics() {
  return (
    <div className="relative flex-1 space-y-6">
      <div className="flex flex-row justify-end gap-4 w-full px-4 lg:px-6 pt-4 lg:pt-6">
        <Button
          className="bg-white text-black h-[42px] border"
          radius="sm"
          startContent={<Download className="h-4 w-4" />}
        >
          Export
        </Button>
        <Button
          className="bg-black text-white h-[42px]"
          radius="sm"
          startContent={<RefreshCw className="h-4 w-4" />}
        >
          Refresh
        </Button>
      </div>
      <div className="px-4 lg:px-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-3 border bg-white" radius="sm">
              <CardBody className="flex flex-col w-full gap-2">
                <div className="flex flex-row justify-between w-full">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                  </div>
                  <div className="flex items-center bg-black/10 p-3 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center gap-1">
                  {stat.status ? (
                    <MoveUp className="w-4 h-4" color="green" />
                  ) : (
                    <MoveDown className="w-4 h-4" color="red" />
                  )}
                  <p
                    className={`${stat.status ? "text-green-600" : "text-red-600"}`}
                  >
                    {stat.growth}% vs last month
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 px-4 lg:px-6">
        <Card className="col-span-1 p-6" radius="sm">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <div className="h-[320px] flex items-center justify-center text-gray-500 w-full">
            <Chart
              options={userGrowthChartData.options}
              series={userGrowthChartData.series}
              type="line"
              height={320}
            />
          </div>
        </Card>
        <Card className="col-span-1 p-6" radius="sm">
          <h3 className="text-lg font-semibold mb-4">Revenue Breakdown</h3>
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            <Chart
              options={{
                ...revenueChartData.options,
                legend: {
                  ...revenueChartData.options.legend,
                  position: "bottom" as const,
                },
              }}
              series={revenueChartData.series}
              type="pie"
              height={300}
            />
          </div>
        </Card>
        <Card className="col-span-1 p-6" radius="sm">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <div className="h-[320px] flex items-center justify-center text-gray-500 w-full">
            <Chart
              options={systemPerformanceChartData.options}
              series={systemPerformanceChartData.series}
              type="line"
              height={320}
            />
          </div>
        </Card>
        <Card className="col-span-1 p-6" radius="sm">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <div className="h-[320px] flex items-center justify-center text-gray-500 w-full">
            <Chart
              options={{
                ...apiUsageChartData.options,
                legend: {
                  ...apiUsageChartData.options.legend,
                  position: "bottom" as const,
                },
              }}
              series={apiUsageChartData.series}
              type="bar"
              height={320}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
