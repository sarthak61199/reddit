"use client";

import AccountSettings from "@/components/account-settings";
import UserContent from "@/components/user-content";
import { Tabs, Tab } from "@heroui/react";

function Page() {
  return (
    <div className="container mx-auto py-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      <Tabs aria-label="Account settings tabs" isVertical={true}>
        <Tab key="settings" title="Settings">
          <AccountSettings />
        </Tab>
        <Tab key="posts" title="Posts">
          <UserContent type="posts" />
        </Tab>
        <Tab key="comments" title="Comments">
          <UserContent type="comments" />
        </Tab>
        <Tab key="likes" title="Likes">
          <UserContent type="likes" />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Page;
