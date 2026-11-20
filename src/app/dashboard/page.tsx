import type { Metadata } from "next";
import { getProjects } from "@/lib/projects-service";
import { toDashProject } from "@/lib/dashboard-data";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";


export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Ethan Rogers, Inc. — the portfolio as an enterprise analytics console: impact KPIs, project records, career timeline, and an AI copilot.",
};

export default async function DashboardPage() {
  const projects = (await getProjects()).map(toDashProject);
  return <DashboardShell projects={projects} />;
}
