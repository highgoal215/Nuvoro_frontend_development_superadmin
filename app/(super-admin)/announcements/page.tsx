"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Calendar, Pencil, Plus, Trash2 } from "lucide-react";
import { Card, CardBody } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Textarea } from "@heroui/input";
import MyInput from "@/components/my-input";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";

interface Announcement {
  id: string;
  dateSent: string;
  recipients: string;
  message: string;
  status: "sent" | "scheduled";
}

const initialAnnouncements: Announcement[] = [
  {
    id: "1",
    dateSent: "2024-02-20 09:00",
    recipients: "All Users",
    message: "Platform maintenance scheduled for next week...",
    status: "sent",
  },
  {
    id: "2",
    dateSent: "2024-02-19 14:30",
    recipients: "Talents",
    message: "New feature release announcement...",
    status: "scheduled",
  },
];

export default function Announcement() {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(initialAnnouncements);
  const [selectedRecipients, setSelectedRecipients] = useState("all-users");
  const [message, setMessage] = useState("");
  const [schedule, setSchedule] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAnnouncement: Announcement = {
      id: Math.random().toString(36).substr(2, 9),
      dateSent:
        schedule || new Date().toISOString().slice(0, 16).replace("T", " "),
      recipients: selectedRecipients === "all-users" ? "All Users" : "Talents",
      message: message,
      status: schedule ? "scheduled" : "sent",
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setMessage("");
    setSchedule("");
    setSelectedRecipients("all-users");
  };

  return (
    <div className="relative flex-1 space-y-6">
      <div className="flex flex-row justify-end items-center w-full px-4 lg:px-6 pt-4 lg:pt-6">
        <Button
          className="bg-black text-white h-[42px] border"
          radius="sm"
          startContent={<Plus className="h-4 w-4" />}
        >
          New Announcement
        </Button>
      </div>
      <div className="px-4 lg:px-6">
        {/* Create Announcement Form */}
        <Card radius="sm" className="p-3">
          <CardBody className="space-y-6">
            <h2 className="text-xl font-semibold">Create Announcement</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="recipients"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Recipients
                </label>
                <Select
                  id="recipients"
                  className="max-w-full"
                  variant="bordered"
                  radius="sm"
                  value={selectedRecipients}
                  onChange={(e) => setSelectedRecipients(e.target.value)}
                >
                  <SelectItem key="all-users">All Users</SelectItem>
                  <SelectItem key="talents">Talents</SelectItem>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  className="w-full"
                  placeholder="Enter your announcement message..."
                  variant="bordered"
                  radius="sm"
                  value={message}
                  minRows={3}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="schedule"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Schedule
                </label>
                <MyInput
                  id="schedule"
                  type="datetime-local"
                  radius="sm"
                  value={schedule}
                  placeholder="Select date and time"
                  onChange={(e) => setSchedule(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-black text-white border"
                  variant="bordered"
                  radius="sm"
                >
                  Schedule Announcement
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>

        {/* Announcement History */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Announcement History</h2>
          <Table aria-label="Announcement history table">
            <TableHeader>
              <TableColumn>Date Sent</TableColumn>
              <TableColumn>Recipients</TableColumn>
              <TableColumn>Message</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {announcements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell>{announcement.dateSent}</TableCell>
                  <TableCell>{announcement.recipients}</TableCell>
                  <TableCell className="max-w-md truncate">
                    {announcement.message}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={
                        announcement.status === "sent" ? "success" : "warning"
                      }
                      variant="flat"
                      size="sm"
                    >
                      {announcement.status === "sent" ? "Sent" : "Scheduled"}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Tooltip content="Edit">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onPress={() => console.log("Edit", announcement.id)}
                        >
                          <Pencil size={16} />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Delete" color="danger">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => {
                            setAnnouncements(
                              announcements.filter(
                                (a) => a.id !== announcement.id
                              )
                            );
                          }}
                        >
                          <Trash2 size={16} />
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
    </div>
  );
}
