import type { Metadata } from "next";
import { NoirShell } from "@/components/noir/noir-shell";
import { ContactBlock } from "@/components/noir/contact-block";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ethan Rogers — design technologist and front-end engineer based in Seattle, WA.",
};

export default function ContactPage() {
  return (
    <NoirShell>
      <main>
        <ContactBlock full />
      </main>
    </NoirShell>
  );
}
