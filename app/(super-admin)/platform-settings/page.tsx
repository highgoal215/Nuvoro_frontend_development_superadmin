"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Switch } from "@heroui/switch";
import { Pencil, Plus } from "lucide-react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const apiUsageChartData = {
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
      name: "User Growth",
      data: [150, 280, 275, 270, 140, 150, 200],
    },
  ],
};

export default function PlatformSettings() {
  const [features, setFeatures] = useState({
    jobPostings: true,
    projectCollaboration: true,
    messaging: false,
  });

  const handleFeatureToggle = (feature: keyof typeof features) => {
    setFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-4 lg:mx-6 mt-4 lg:mt-6">
        {/* Subscription Plans */}
        <Card radius="sm" className="p-3">
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Subscription Plans</h2>
              <Button
                size="sm"
                className="bg-black text-white border"
                variant="bordered"
                radius="sm"
              >
                Edit Plans
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Basic Plan</span>
                <span className="font-semibold">$29/mo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pro Plan</span>
                <span className="font-semibold">$99/mo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Enterprise Plan</span>
                <span className="font-semibold">Custom</span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Commission Rates */}
        <Card radius="sm" className="p-3">
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Commission Rates</h2>
              <Button
                size="sm"
                className="bg-black text-white border"
                variant="bordered"
                radius="sm"
              >
                Edit Rates
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Standard Rate</span>
                <span className="font-semibold">5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Premium Rate</span>
                <span className="font-semibold">10%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Partner Rate</span>
                <span className="font-semibold">15%</span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* API Usage */}
        <Card radius="sm" className="p-3">
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">API Usage</h2>
              <Button
                size="sm"
                className="bg-black text-white border"
                variant="bordered"
                radius="sm"
              >
                View Details
              </Button>
            </div>
            <Chart
              options={apiUsageChartData.options}
              series={apiUsageChartData.series}
              type="line"
              height={300}
            />
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-4 lg:mx-6 mt-4 lg:mt-6">
        {/* Feature Toggles */}
        <Card radius="sm" className="p-3">
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Feature Toggles</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Job Postings</span>
                <Switch
                  isSelected={features.jobPostings}
                  onValueChange={() => handleFeatureToggle("jobPostings")}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Project Collaboration</span>
                <Switch
                  isSelected={features.projectCollaboration}
                  onValueChange={() =>
                    handleFeatureToggle("projectCollaboration")
                  }
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Messaging</span>
                <Switch
                  isSelected={features.messaging}
                  onValueChange={() => handleFeatureToggle("messaging")}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Email Templates */}
        <Card radius="sm" className="p-3">
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Email Templates</h2>
              <Button
                size="sm"
                className="bg-black text-white border"
                variant="bordered"
                radius="sm"
              >
                Edit Templates
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Welcome Email</span>
                <Button isIconOnly size="sm" variant="light">
                  <Pencil size={16} />
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Password Reset</span>
                <Button isIconOnly size="sm" variant="light">
                  <Pencil size={16} />
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Order Confirmation</span>
                <Button isIconOnly size="sm" variant="light">
                  <Pencil size={16} />
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Integrations */}
        <Card radius="sm" className="p-3">
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Integrations</h2>
              <Button
                size="sm"
                className="bg-black text-white border"
                variant="bordered"
                radius="sm"
                startContent={<Plus size={16} />}
              >
                Add New
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Image
                    src="https://cdn.worldvectorlogo.com/logos/stripe-4.svg"
                    alt="Stripe"
                    className="w-5 h-5 rounded-none"
                  />
                  <span className="text-gray-600">Stripe</span>
                </div>
                <Chip color="success" size="sm">
                  Connected
                </Chip>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Image
                    src="https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg"
                    alt="Slack"
                    className="w-5 h-5 rounded-none"
                  />
                  <span className="text-gray-600">Slack</span>
                </div>
                <Chip color="success" size="sm">
                  Connected
                </Chip>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Image
                    src="https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg"
                    alt="Google Analytics"
                    className="w-5 h-5 rounded-none"
                  />
                  <span className="text-gray-600">Google Analytics</span>
                </div>
                <Chip variant="flat" size="sm">
                  Disconnected
                </Chip>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="flex justify-end gap-2 mx-4 lg:mx-6 mt-4 lg:mt-6">
        <Button
          className="bg-white text-black border"
          variant="bordered"
          radius="sm"
        >
          Reset Changes
        </Button>
        <Button
          className="bg-black text-white border"
          variant="bordered"
          radius="sm"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
