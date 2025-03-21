"use client";

import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Pagination } from "@heroui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { cn } from "@heroui/theme";
import { Tooltip } from "@heroui/tooltip";
import { User } from "@heroui/user";
import {
  ChevronDown,
  Download,
  Edit2,
  History,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import MyInput from "@/components/my-input";

interface UserData {
  id: string;
  name: string;
  email: string;
  type: "Talent" | "Organization";
  status: "Active" | "Inactive";
  avatar: string;
}

const initialUsers: UserData[] = [
  {
    id: "1",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    type: "Talent",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    id: "2",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    type: "Organization",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=michael",
  },
];

export default function UserManagement() {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || user.type === selectedType;
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const pages = Math.ceil(filteredUsers.length / rowsPerPage);
  const items = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const getTypeChip = (type: string) => {
    return (
      <Chip
        className="capitalize"
        color={type === "Talent" ? "primary" : "secondary"}
        size="sm"
        variant="flat"
      >
        {type}
      </Chip>
    );
  };

  const getStatusChip = (status: string) => {
    return (
      <Chip
        className="capitalize"
        color={status === "Active" ? "success" : "danger"}
        size="sm"
        variant="flat"
      >
        {status}
      </Chip>
    );
  };

  return (
    <div className="relative flex-1 space-y-6">
      <div className="flex flex-row justify-between items-center w-full px-4 lg:px-6 pt-4 lg:pt-6">
        <Button
          className="bg-black text-white h-[42px]"
          radius="sm"
          startContent={<Plus className="h-4 w-4" />}
        >
          Add New Role
        </Button>
        <Button
          className="bg-white text-black h-[42px] border"
          radius="sm"
          startContent={<Download size={20} />}
        >
          Export Logs
        </Button>
      </div>
      <div className="px-4 lg:px-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4 flex-1">
            <MyInput
              id="search"
              className="h-[42px] w-60"
              classNames={{
                innerWrapper: cn("pl-8"),
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
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="h-[42px] bg-white border min-w-36 flex flex-row justify-between"
                  variant="bordered"
                  radius="sm"
                  endContent={<ChevronDown size={20} />}
                >
                  {selectedType === "all" ? "All Types" : selectedType}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Type selection"
                onAction={(key) => setSelectedType(key as string)}
              >
                <DropdownItem key="all">All Types</DropdownItem>
                <DropdownItem key="Talent">Talent</DropdownItem>
                <DropdownItem key="Organization">Organization</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="h-[42px] bg-white border min-w-36 flex flex-row justify-between"
                  variant="bordered"
                  radius="sm"
                  endContent={<ChevronDown size={20} />}
                >
                  {selectedStatus === "all" ? "All Status" : selectedStatus}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Status selection"
                onAction={(key) => setSelectedStatus(key as string)}
              >
                <DropdownItem key="all">All Status</DropdownItem>
                <DropdownItem key="Active">Active</DropdownItem>
                <DropdownItem key="Inactive">Inactive</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="px-4 lg:px-6">
        <Table
          aria-label="Users table"
          bottomContent={
            <div className="flex w-full justify-between items-center">
              <span className="text-small text-default-400">
                Showing {items.length} of {filteredUsers.length} users
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
            <TableColumn>Name</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <User
                    name={user.name}
                    avatarProps={{
                      src: user.avatar,
                      size: "sm",
                    }}
                  />
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getTypeChip(user.type)}</TableCell>
                <TableCell>{getStatusChip(user.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Tooltip content="Edit user">
                      <Button isIconOnly variant="light" size="sm">
                        <Edit2 size={18} />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Delete user" color="danger">
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        color="danger"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </Tooltip>
                    <Tooltip content="View history">
                      <Button isIconOnly variant="light" size="sm">
                        <History size={18} />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
