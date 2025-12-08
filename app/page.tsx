"use client";

import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";

export default function Home() {
  const [selectedApp, setSelectedApp] = useState("analytics");

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar selectedApp={selectedApp} onSelectApp={setSelectedApp} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Dashboard selectedApp={selectedApp} />
        </main>
      </div>
    </div>
  );
}
