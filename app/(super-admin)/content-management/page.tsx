"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ContentManagementClient = dynamic(
  () => import("./content-management-client"),
  { ssr: false },
);

export default function ContentManagement() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContentManagementClient />
    </Suspense>
  );
}
