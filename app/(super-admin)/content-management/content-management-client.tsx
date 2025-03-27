"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import {
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Card, CardBody } from "@heroui/card";
import {
  ChevronDown,
  Clock,
  Edit2,
  Eye,
  FileText,
  Filter,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Pagination } from "@heroui/pagination";
import { Tooltip } from "@heroui/tooltip";
import { cn } from "@heroui/theme";
import {} from "@heroui/modal";

import MyInput from "@/components/my-input";
import Content_AddRole from "@/components/Modals/Content_Addmodal";

interface ContentItem {
  id: string;
  title: string;
  type: "Job" | "Course" | "Project" | "News";
  author: string;
  status: "Published" | "Draft" | "Pending";
  lastUpdated: string;
}

interface StatCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const initialContent: ContentItem[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    type: "Job",
    author: "John Smith",
    status: "Published",
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    title: "Web Design Course",
    type: "Course",
    author: "Sarah Johnson",
    status: "Draft",
    lastUpdated: "2024-01-14",
  },
];

export default function ContentManagementClient() {
  const [content, setContent] = useState<ContentItem[]>(initialContent);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<Selection>(new Set(["all"]));
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<Selection>(new Set([]));

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContentForEdit, setSelectedContentForEdit] =
    useState<ContentItem | null>(null);
  const [contentToDelete, setContentToDelete] = useState<ContentItem | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAddContent = (contentData: {
    Title: string;
    Type: string;
    Author: string;
    Status: string;
    Lastupdated: string;
  }) => {
    const newContent: ContentItem = {
      id: Date.now().toString(),
      title: contentData.Title,
      type: contentData.Type as "Job" | "Course" | "Project" | "News",
      author: contentData.Author,
      status: contentData.Status as "Published" | "Draft" | "Pending",
      lastUpdated: contentData.Lastupdated,
    };
    setContent([...content, newContent]);
  };

  const handleEditContent = (contentData: {
    Title: string;
    Type: string;
    Author: string;
    Status: string;
    Lastupdated: string;
  }) => {
    if (selectedContentForEdit) {
      setContent(
        content.map((item) =>
          item.id === selectedContentForEdit.id
            ? {
                ...item,
                title: contentData.Title,
                type: contentData.Type as "Job" | "Course" | "Project" | "News",
                author: contentData.Author,
                status: contentData.Status as "Published" | "Draft" | "Pending",
                lastUpdated: contentData.Lastupdated,
              }
            : item
        )
      );
    }
  };

  const handleDeleteContent = (contentId: string) => {
    setContent(content.filter((item) => item.id !== contentId));
    setIsDeleteModalOpen(false);
    setContentToDelete(null);
  };

  const openEditModal = (item: ContentItem) => {
    setSelectedContentForEdit(item);
    setIsModalOpen(true);
  };

  const openDeleteModal = (item: ContentItem) => {
    setContentToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const resetForm = () => {
    setSelectedContentForEdit(null);
    setContentToDelete(null);
  };

  const stats: StatCard[] = [
    {
      title: "Total Content",
      value: "2,431",
      icon: <FileText className="text-blue-500" size={24} />,
      color: "bg-blue-50",
    },
    {
      title: "Pending Approval",
      value: "42",
      icon: <Clock className="text-yellow-500" size={24} />,
      color: "bg-yellow-50",
    },
    {
      title: "Published",
      value: "1,890",
      icon: <FileText className="text-green-500" size={24} />,
      color: "bg-green-50",
    },
    {
      title: "Total Views",
      value: "245K",
      icon: <Eye className="text-purple-500" size={24} />,
      color: "bg-purple-50",
    },
  ];

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      Array.from(selectedType).includes("all") ||
      Array.from(selectedType).includes(item.type);

    return matchesSearch && matchesType;
  });

  const pages = Math.ceil(filteredContent.length / rowsPerPage);
  const items = filteredContent.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getStatusChip = (status: string) => {
    const statusConfig = {
      Published: { color: "success", variant: "flat" },
      Draft: { color: "warning", variant: "flat" },
      Pending: { color: "primary", variant: "flat" },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || {
      color: "default",
      variant: "flat",
    };

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
      Job: "primary",
      Course: "secondary",
      Project: "success",
      News: "warning",
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

  return (
    <div className="relative flex-1 space-y-6">
      <div className="flex flex-row justify-end w-full px-4 lg:px-6 pt-4 lg:pt-6">
        <Button
          className="bg-black text-white h-[42px]"
          radius="sm"
          startContent={<Plus className="h-4 w-4" />}
          onPress={() => {
            resetForm();
            setIsModalOpen(true);
          }}
        >
          Add New Content
        </Button>
      </div>

      {/* Add/Edit Content Modal */}
      <Content_AddRole
        isOpen={isModalOpen}
        mode={selectedContentForEdit ? "edit" : "add"}
        role={
          isDeleteModalOpen
            ? contentToDelete
              ? {
                  id: contentToDelete.id,
                  Title: contentToDelete.title,
                  Type: contentToDelete.type,
                  Author: contentToDelete.author,
                  Status: contentToDelete.status,
                  lastUpdated: contentToDelete.lastUpdated,
                }
              : undefined
            : selectedContentForEdit
              ? {
                  id: selectedContentForEdit.id,
                  Title: selectedContentForEdit.title,
                  Type: selectedContentForEdit.type,
                  Author: selectedContentForEdit.author,
                  Status: selectedContentForEdit.status,
                  lastUpdated: selectedContentForEdit.lastUpdated,
                }
              : undefined
        }
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) resetForm();
        }}
        onSubmit={selectedContentForEdit ? handleEditContent : handleAddContent}
        isDeleteModalOpen={isDeleteModalOpen}
        onDeleteModalChange={setIsDeleteModalOpen}
        onDelete={handleDeleteContent}
      />

      <div className="px-4 lg:px-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-3 border bg-white" radius="sm">
              <CardBody className="flex flex-row items-center gap-4">
                <div className={`${stat.color} p-3 rounded-lg bg-white`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-between w-full px-4 lg:px-6">
        {/* Navigation */}
        <div className="flex gap-4 mb-6">
          <Button className="bg-black text-white" radius="sm">
            All Content
          </Button>
          <Button variant="light" radius="sm">
            Jobs
          </Button>
          <Button variant="light" radius="sm">
            Projects
          </Button>
          <Button variant="light" radius="sm">
            Courses
          </Button>
          <Button variant="light" radius="sm">
            News
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4 flex-1">
            <MyInput
              id="search"
              className="h-[42px] w-60"
              classNames={{
                innerWrapper: cn("pl-8"),
              }}
              type="text"
              placeholder="Search content..."
              variant="bordered"
              radius="sm"
              isClearable
              startContent={
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              }
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              className="h-[42px] bg-white border min-w-36 flex flex-row justify-between"
              variant="bordered"
              radius="sm"
              startContent={<Filter size={20} />}
              endContent={<ChevronDown size={20} />}
            >
              Filters
            </Button>
          </div>
        </div>
      </div>
      <div className="px-4 lg:px-6">
        {/* Content Table */}
        <Table
          aria-label="Content table"
          selectionMode="multiple"
          selectedKeys={selectedRows}
          bottomContent={
            <div className="flex justify-between items-center">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" size="sm">
                    {rowsPerPage} per page
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Rows per page"
                  onAction={(key) => setRowsPerPage(Number(key))}
                >
                  <DropdownItem key="10">10 per page</DropdownItem>
                  <DropdownItem key="20">20 per page</DropdownItem>
                  <DropdownItem key="50">50 per page</DropdownItem>
                </DropdownMenu>
              </Dropdown>
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
          onSelectionChange={setSelectedRows}
        >
          <TableHeader>
            <TableColumn>Title</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Author</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Last Updated</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{getTypeChip(item.type)}</TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>{getStatusChip(item.status)}</TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Tooltip content="Edit">
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        onPress={() => openEditModal(item)}
                      >
                        <Edit2 size={18} />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Delete" color="danger">
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        color="danger"
                        onPress={() => openDeleteModal(item)}
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
      </div>
    </div>
  );
}
