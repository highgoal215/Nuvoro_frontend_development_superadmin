"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { cn } from "@heroui/theme";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Avatar, AvatarGroup } from "@heroui/avatar";
import { ChevronDown, Edit, Plus, Search, Trash2 } from "lucide-react";

import MyInput from "@/components/my-input";

interface Role {
  id: string;
  name: string;
  description: string;
  members: {
    name: string;
    avatar: string;
  }[];
  lastModified: string;
}

const initialRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full system access with all permissions",
    members: [
      { name: "John Doe", avatar: "https://i.pravatar.cc/150?u=1" },
      { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=2" },
      { name: "Bob Johnson", avatar: "https://i.pravatar.cc/150?u=3" },
      { name: "John Doe", avatar: "https://i.pravatar.cc/150?u=1" },
      { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=2" },
      { name: "Bob Johnson", avatar: "https://i.pravatar.cc/150?u=3" },
    ],
    lastModified: "2 days ago",
  },
  {
    id: "2",
    name: "System Admin",
    description: "System configuration and maintenance access",
    members: [
      { name: "Alice Brown", avatar: "https://i.pravatar.cc/150?u=4" },
      { name: "Charlie Davis", avatar: "https://i.pravatar.cc/150?u=5" },
      { name: "Alice Brown", avatar: "https://i.pravatar.cc/150?u=4" },
      { name: "Charlie Davis", avatar: "https://i.pravatar.cc/150?u=5" },
    ],
    lastModified: "5 days ago",
  },
];

export default function RoleBasedAccessControl() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedRole === "all" || role.name === selectedRole),
  );

  const handleDelete = (id: string) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <div className="relative flex-1 space-y-6">
      <div className="flex flex-row justify-between items-center px-4 lg:px-6 pt-4 lg:pt-6">
        <div className="flex flex-row gap-4">
          <MyInput
            id="search"
            className="h-[42px]"
            classNames={{
              innerWrapper: cn("pl-8"),
            }}
            type="text"
            placeholder="Enter your email"
            variant="bordered"
            radius="sm"
            startContent={
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            }
            isClearable
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="h-[42px] bg-white border min-w-36 flex flex-row justify-between"
                variant="bordered"
                radius="sm"
                endContent={<ChevronDown className="min-h-4 min-w-4" />}
              >
                {selectedRole === "all" ? "All Roles" : selectedRole}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Role selection"
              onAction={(key) => setSelectedRole(key as string)}
            >
              <DropdownItem key="all">All Roles</DropdownItem>
              <DropdownItem key="Super Admin">Super Admin</DropdownItem>
              <DropdownItem key="System Admin">System Admin</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <Button
          className="bg-black text-white h-[42px]"
          radius="sm"
          startContent={<Plus className="h-4 w-4" />}
        >
          Add New Role
        </Button>
      </div>
      <div className="px-4 lg:px-6">
        <Table aria-label="Roles table">
          <TableHeader>
            <TableColumn>Role Name</TableColumn>
            <TableColumn>Description</TableColumn>
            <TableColumn>Members</TableColumn>
            <TableColumn>Last Modified</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {role.name === "Super Admin" ? (
                      <div className="p-2 bg-primary-100 rounded-full">
                        <svg
                          className="w-5 h-5 text-primary-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                      </div>
                    ) : (
                      <div className="p-2 bg-secondary-100 rounded-full">
                        <svg
                          className="w-5 h-5 text-secondary-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                    )}
                    {role.name}
                  </div>
                </TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  <AvatarGroup
                    isBordered
                    max={2}
                    total={role.members.length}
                    size="sm"
                  >
                    {role.members.map((member, index) => (
                      <Avatar key={index} src={member.avatar} size="sm" />
                    ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell>{role.lastModified}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Tooltip content="Edit role">
                      <Button isIconOnly variant="light" size="sm">
                        <Edit size={18} />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Delete role" color="danger">
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        color="danger"
                        onClick={() => handleDelete(role.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <p>
            Showing {filteredRoles.length} of {roles.length} roles
          </p>
          <div className="flex gap-2">
            <Button variant="flat" size="sm" isDisabled>
              Previous
            </Button>
            <Button variant="flat" size="sm" isDisabled>
              Next
            </Button>
          </div>
        </div>
      </div>
      <Button
        className="absolute bottom-4 right-4 bg-black text-white text-xl"
        radius="sm"
        isIconOnly
      >
        ?
      </Button>
    </div>
  );
}
