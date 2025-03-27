"use client";

import type { DateValue } from "@react-types/datepicker";
import { useState } from "react";
import {
  DateRangePicker,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
  User,
} from "@nextui-org/react";
import { CalendarCheck, ChevronDown, Download, Search } from "lucide-react";
import { RangeValue } from "@react-types/shared";
import { parseDate } from "@internationalized/date";
import MyInput from "@/components/my-input";

interface AuditLog {
  id: string;
  timestamp: string;
  adminName: string;
  email: string;
  action: "User Created" | "Permission Updated" | "User Deleted";
  details: string;
}

const initialLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: "2024-02-20 14:30:00",
    adminName: "John Smith",
    email: "admin@example.com",
    action: "User Created",
    details: "Created new user account (ID: 12345)",
  },
  {
    id: "2",
    timestamp: "2024-02-20 13:45:00",
    adminName: "Sarah Johnson",
    email: "sarah@example.com",
    action: "Permission Updated",
    details: "Modified user permissions for Group A",
  },
  {
    id: "3",
    timestamp: "2024-02-20 12:15:00",
    adminName: "Michael Brown",
    email: "michael@example.com",
    action: "User Deleted",
    details: "Deleted user account (ID: 12344)",
  },
];

export default function ActivityLogging() {
  const [dateValue, setDateValue] = useState<RangeValue<DateValue> | null>({
    start: parseDate("2024-04-01"),
    end: parseDate("2024-04-08"),
  });
  const [logs, setLogs] = useState<AuditLog[]>(initialLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAction, setSelectedAction] = useState<string>("all");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const [selectedRoleForEdit, setSelectedRoleForEdit] = useState<Role | null>(
  //   null
  // );
  // const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction =
      selectedAction === "all" || log.action === selectedAction;

    return matchesSearch && matchesAction;
  });

  const pages = Math.ceil(filteredLogs.length / rowsPerPage);
  const items = filteredLogs.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getActionChip = (action: string) => {
    switch (action) {
      case "User Created":
        return (
          <Chip color="success" size="sm">
            User Created
          </Chip>
        );
      case "Permission Updated":
        return (
          <Chip color="warning" size="sm">
            Permission Updated
          </Chip>
        );
      case "User Deleted":
        return (
          <Chip color="danger" size="sm">
            User Deleted
          </Chip>
        );
      default:
        return <Chip size="sm">{action}</Chip>;
    }
  };

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting logs...");
  };

  return (
    <div className="relative flex-1 space-y-6">
      <div className="flex justify-start items-center px-4 lg:px-6 pt-4 lg:pt-6">
        <div className="flex gap-4 flex-1">
          <DateRangePicker
            className="w-[248px]"
            classNames={{
              input: "text-sm",
              inputWrapper: "h-[42px] border bg-white",
            }}
            aria-label="Date range picker"
            radius="sm"
            variant="bordered"
            selectorIcon={
              <CalendarCheck className="min-w-4 min-h-4 w-4 h-4" size={16} />
            }
            // value={dateValue}
            onChange={setDateValue}
          />
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="h-[42px] bg-white border min-w-36 flex flex-row justify-between"
                variant="bordered"
                radius="sm"
                endContent={<ChevronDown className="min-h-4 min-w-4 w-4 h-4" />}
              >
                {selectedAction === "all" ? "All Actions" : selectedAction}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Action selection"
              onAction={(key) => setSelectedAction(key as string)}
            >
              <DropdownItem key="all">All Actions</DropdownItem>
              <DropdownItem key="User Created">User Created</DropdownItem>
              <DropdownItem key="Permission Updated">
                Permission Updated
              </DropdownItem>
              <DropdownItem key="User Deleted">User Deleted</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <MyInput
            id="search"
            className="h-[42px] w-60"
            classNames={{
              innerWrapper: "pl-8",
            }}
            type="text"
            placeholder="Search users..."
            variant="bordered"
            radius="sm"
            isClearable
            startContent={
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            }
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          className="bg-black text-white h-[42px]"
          radius="sm"
          startContent={<Download size={20} />}
          onPress={handleExport}
        >
          Export Logs
        </Button>
      </div>
      <div className="px-4 lg:px-6">
        <Table
          aria-label="Audit logs table"
          bottomContent={
            <div className="flex w-full justify-between items-center">
              <span className="text-small text-default-400">
                Showing {items.length} of {filteredLogs.length} logs
              </span>
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader>
            <TableColumn>Timestamp</TableColumn>
            <TableColumn>Admin Name</TableColumn>
            <TableColumn>Action</TableColumn>
            <TableColumn>Details</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>
                  <User
                    name={log.adminName}
                    description={log.email}
                    avatarProps={{
                      src: `https://i.pravatar.cc/150?u=${log.id}`,
                      size: "sm",
                    }}
                  />
                </TableCell>
                <TableCell>{getActionChip(log.action)}</TableCell>
                <TableCell>{log.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
