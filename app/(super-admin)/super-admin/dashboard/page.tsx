"use client";

import dynamic from "next/dynamic";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Image } from "@heroui/image";
import { AlertTriangle, Megaphone, UserPlus } from "lucide-react";

import UserManagementIcon from "@/assets/icon/user-management.svg";
import ActiveListeningIcon from "@/assets/icon/active-listening.svg";
import RevenueIcon from "@/assets/icon/revenue.svg";
import SystemHealthIcon from "@/assets/icon/system-health.svg";

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
    stroke: { curve: "straight" as const, width: 2 },
    markers: {
      size: 4,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
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
      data: [3000, 4000, 3500, 5000, 4900, 6000, 7000],
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

const systemPerformanceData = {
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
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
      name: "System Performance",
      data: [65, 72, 45, 56, 30, 47, 55],
    },
  ],
};

export default function SuperAdminDashboard() {
  return (
    <div className="relative flex-1 space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-6 pt-4 lg:pt-6">
        <Card className="p-6" radius="sm">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
              <Image
                src={UserManagementIcon.src}
                className="w-5 h-5"
                alt="total users"
              />
            </div>
            <p className="text-2xl font-bold">10,000</p>
            <p className="text-sm text-gray-500">
              Talents: 7,000 | Organizations: 2,000 | Educators: 1,000
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-600">
                Active Listings
              </h3>
              <Image
                src={ActiveListeningIcon.src}
                className="w-5 h-5 rounded-none"
                alt="active listings"
              />
            </div>
            <p className="text-2xl font-bold">500</p>
            <p className="text-sm text-gray-500">
              Jobs: 300 | Projects: 150 | Courses: 50
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-600">
                Platform Revenue
              </h3>
              <Image src={RevenueIcon.src} className="w-5 h-5" alt="revenue" />
            </div>
            <p className="text-2xl font-bold">$50,000</p>
            <p className="text-sm text-gray-500">
              Subscriptions: $30,000 | Commissions: $15,000 | Ads: $5,000
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-600">
                System Health
              </h3>
              <Image
                src={SystemHealthIcon.src}
                className="w-5 h-5"
                alt="system-health"
              />
            </div>
            <p className="text-2xl font-bold">99.9%</p>
            <p className="text-sm text-gray-500">
              Server Status: Healthy | Error Rate: 0.1%
            </p>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 px-4 lg:px-6">
        <Button
          className="flex items-center gap-2 bg-black text-white"
          radius="sm"
          startContent={<UserPlus className="h-4 w-4" />}
        >
          Add/Remove Users
        </Button>
        <Button
          className="flex items-center gap-2 bg-black text-white"
          radius="sm"
          startContent={<AlertTriangle className="h-4 w-4" />}
        >
          Resolve Issues
        </Button>
        <Button
          className="flex items-center gap-2 bg-black text-white"
          radius="sm"
          startContent={<Megaphone className="h-4 w-4" />}
        >
          Send Announcement
        </Button>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6 px-4 lg:px-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <div className="h-[320px] flex items-center justify-center text-gray-500 w-full">
            <Chart
              options={userGrowthChartData.options}
              series={userGrowthChartData.series}
              type="area"
              height={320}
            />
          </div>
        </Card>

        <Card className="p-6">
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

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">System Performance</h3>
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            <Chart
              options={{
                ...systemPerformanceData.options,
                legend: {
                  ...systemPerformanceData.options.legend,
                  position: "bottom" as const,
                },
              }}
              // options={systemPerformanceData.options}
              series={systemPerformanceData.series}
              type="bar"
              height={300}
            />
          </div>
        </Card>
      </div>

      {/* Status Footer */}
      <div className="absolute bottom-0 flex flex-row w-full gap-8 p-2 lg:p-4 border-t-[0.5px] border-gray-200 justify-between items-center text-sm text-gray-500 mt-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          All Systems Operational
        </div>
        <p>Last updated: 5 minutes ago</p>
        <div className="flex flex-1 justify-end">
          <p>
            <b>Need help?</b>
          </p>
        </div>
      </div>
    </div>
  );
}
