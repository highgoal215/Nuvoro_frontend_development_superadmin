"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Link } from "@heroui/link";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import {
  ChevronDown,
  CircleCheck,
  CircleDollarSign,
  Eye,
  MonitorSmartphone,
  Search,
  Undo2,
  UserCircle2,
  Users,
} from "lucide-react";

import MyInput from "@/components/my-input";

interface Issue {
  id: string;
  type: "Bug" | "Dispute";
  status: "In Progress" | "Open";
}

interface Ticket {
  id: string;
  category: "Technical" | "Billing";
  status: "Open" | "In Progress";
}

interface KnowledgeBaseItem {
  title: string;
  category: "Technical" | "Billing" | "Account";
  link: string;
}

const initialIssues: Issue[] = [
  { id: "#ISS-001", type: "Bug", status: "In Progress" },
  { id: "#ISS-002", type: "Dispute", status: "Open" },
];

const initialTickets: Ticket[] = [
  { id: "#TKT-001", category: "Technical", status: "Open" },
  { id: "#TKT-002", category: "Billing", status: "In Progress" },
];

const knowledgeBaseItems: Record<string, KnowledgeBaseItem[]> = {
  Technical: [
    { title: "API Documentation", category: "Technical", link: "#" },
    { title: "Integration Guide", category: "Technical", link: "#" },
    { title: "Error Codes", category: "Technical", link: "#" },
  ],
  Billing: [
    { title: "Pricing Plans", category: "Billing", link: "#" },
    { title: "Payment Methods", category: "Billing", link: "#" },
    { title: "Invoicing", category: "Billing", link: "#" },
  ],
  Account: [
    { title: "Account Settings", category: "Account", link: "#" },
    { title: "Security", category: "Account", link: "#" },
    { title: "Profile Management", category: "Account", link: "#" },
  ],
};

export default function Support() {
  const [issueTypeFilter, setIssueTypeFilter] = useState<string>("All Types");
  const [issueStatusFilter, setIssueStatusFilter] =
    useState<string>("All Status");
  const [ticketCategoryFilter, setTicketCategoryFilter] =
    useState<string>("All Categories");
  const [ticketStatusFilter, setTicketStatusFilter] =
    useState<string>("All Status");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getStatusChip = (status: string) => {
    const statusConfig = {
      "In Progress": { color: "warning", variant: "flat" },
      Open: { color: "success", variant: "flat" },
    };
    const config = statusConfig[status as keyof typeof statusConfig];

    return (
      <Chip
        className="capitalize"
        color={config.color as any}
        size="sm"
        variant={config.variant as any}
      >
        {status}
      </Chip>
    );
  };

  const getTypeChip = (type: string) => {
    const typeColors = {
      Bug: "danger",
      Dispute: "warning",
      Technical: "primary",
      Billing: "secondary",
    };

    return (
      <Chip
        className="capitalize"
        color={typeColors[type as keyof typeof typeColors] as any}
        size="sm"
        variant="flat"
      >
        {type}
      </Chip>
    );
  };

  const renderActionButtons = (type: "issue" | "ticket") => {
    if (type === "issue") {
      return (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="light"
            startContent={<CircleCheck size={16} />}
          >
            Resolve
          </Button>
          <Button size="sm" variant="light" startContent={<Users size={16} />}>
            Assign
          </Button>
          <Button size="sm" variant="light" startContent={<Eye size={16} />}>
            View
          </Button>
        </div>
      );
    }

    return (
      <div className="flex gap-2">
        <Button size="sm" variant="light" startContent={<Undo2 size={16} />}>
          Respond
        </Button>
        <Button size="sm" variant="light" startContent={<Eye size={16} />}>
          View
        </Button>
      </div>
    );
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="mx-4 lg:mx-6 mt-4 lg:mt-6 p-6 rounded-lg bg-white border">
        <div className="flex flex-row justify-between items-center w-full mb-6">
          <h2 className="text-xl font-semibold">Reported Issues</h2>
          <div className="flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="h-[42px] bg-white border min-w-36 flex flex-row justify-between"
                  variant="bordered"
                  radius="sm"
                  endContent={<ChevronDown size={16} />}
                >
                  {issueTypeFilter}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Issue Types"
                onAction={(key) => setIssueTypeFilter(key as string)}
              >
                <DropdownItem key="All Types">All Types</DropdownItem>
                <DropdownItem key="Bug">Bug</DropdownItem>
                <DropdownItem key="Dispute">Dispute</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="h-[42px] bg-white border min-w-36 flex flex-row justify-between"
                  variant="bordered"
                  radius="sm"
                  endContent={<ChevronDown size={16} />}
                >
                  {issueStatusFilter}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Issue Status"
                onAction={(key) => setIssueStatusFilter(key as string)}
              >
                <DropdownItem key="All Status">All Status</DropdownItem>
                <DropdownItem key="Open">Open</DropdownItem>
                <DropdownItem key="In Progress">In Progress</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <Table aria-label="Issues table" removeWrapper>
          <TableHeader>
            <TableColumn>Issue ID</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {initialIssues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>{issue.id}</TableCell>
                <TableCell>{getTypeChip(issue.type)}</TableCell>
                <TableCell>{getStatusChip(issue.status)}</TableCell>
                <TableCell>{renderActionButtons("issue")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mx-4 lg:mx-6 mt-4 lg:mt-6 p-6 rounded-lg bg-white border">
        <div className="flex flex-row justify-between items-center w-full mb-6">
          <h2 className="text-xl font-semibold">Support Tickets</h2>
          <div className="flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="h-[42px] bg-white border min-w-36 flex flex-row justify-between"
                  variant="bordered"
                  radius="sm"
                  endContent={<ChevronDown size={16} />}
                >
                  {ticketCategoryFilter}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Ticket Categories"
                onAction={(key) => setTicketCategoryFilter(key as string)}
              >
                <DropdownItem key="All Categories">All Categories</DropdownItem>
                <DropdownItem key="Technical">Technical</DropdownItem>
                <DropdownItem key="Billing">Billing</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="h-[42px] bg-white border min-w-36 flex flex-row justify-between"
                  variant="bordered"
                  radius="sm"
                  endContent={<ChevronDown size={16} />}
                >
                  {ticketStatusFilter}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Ticket Status"
                onAction={(key) => setTicketStatusFilter(key as string)}
              >
                <DropdownItem key="All Status">All Status</DropdownItem>
                <DropdownItem key="Open">Open</DropdownItem>
                <DropdownItem key="In Progress">In Progress</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <Table aria-label="Support tickets table" removeWrapper>
          <TableHeader>
            <TableColumn>Ticket ID</TableColumn>
            <TableColumn>Category</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {initialTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{getTypeChip(ticket.category)}</TableCell>
                <TableCell>{getStatusChip(ticket.status)}</TableCell>
                <TableCell>{renderActionButtons("ticket")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mx-4 lg:mx-6 mt-4 lg:mt-6 p-6 rounded-lg bg-white border">
        <h2 className="text-xl font-semibold mb-4">Knowledge Base</h2>
        <MyInput
          className="h-[42px] w-full"
          placeholder="Search documentation and FAQs..."
          type="text"
          variant="bordered"
          radius="sm"
          isClearable
          value={searchQuery}
          startContent={<Search className="text-gray-400" size={20} />}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="mt-4 lg:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card radius="sm" className="p-1">
            <CardHeader className="flex gap-3">
              <MonitorSmartphone size={24} />
              <div className="flex flex-col">
                <p className="text-md font-semibold">Technical</p>
              </div>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2">
                {knowledgeBaseItems.Technical.map((item, index) => (
                  <li key={index}>
                    <Link href={item.link} className="text-foreground-700">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <Card radius="sm" className="p-1">
            <CardHeader className="flex gap-3">
              <CircleDollarSign size={24} />
              <div className="flex flex-col">
                <p className="text-md font-semibold">Billing</p>
              </div>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2">
                {knowledgeBaseItems.Billing.map((item, index) => (
                  <li key={index}>
                    <Link href={item.link} className="text-foreground-700">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <Card radius="sm" className="p-1">
            <CardHeader className="flex gap-3">
              <UserCircle2 size={24} />
              <div className="flex flex-col">
                <p className="text-md font-semibold">Account</p>
              </div>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2">
                {knowledgeBaseItems.Account.map((item, index) => (
                  <li key={index}>
                    <Link href={item.link} className="text-foreground-700">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
