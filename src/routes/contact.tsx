import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/PageHeader";
import { useShop } from "@/store/shop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Consultation — PD Paulandium" },
      {
        name: "description",
        content:
          "Book a design consultation, request a quote or visit the PD Paulandium studio in New Delhi.",
      },
      { property: "og:title", content: "Contact & Consultation — PD Paulandium" },
      {
        property: "og:description",
        content: "Book a design consultation or request a quote from the PD Paulandium studio.",
      },
    ],
  }),
  component: ContactPage,
});

const subjects = [
  "Furniture enquiry",
  "Modular kitchen",
  "Full interior project",
  "Service & repair",
  "Other",
];

function ContactPage() {
  const { addEnquiry } = useShop();
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    addEnquiry({
      name: String(f.get("name") ?? ""),
      email: String(f.get("email") ?? ""),
      phone: String(f.get("phone") ?? ""),
      subject: String(f.get("subject") ?? ""),
      message: String(f.get("message") ?? ""),
    });
    e.currentTarget.reset();
    setSent(true);
    toast.success("Thank you — the studio will call you within one working day.");
  }

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Book a consultation"
        description="Share a floor plan or just a rough idea. We will come back with a layout, a palette and an honest estimate."
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_360px]">
        <form onSubmit={onSubmit} className="rounded-lg border border-border bg-card p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Full name" required />
            <Field id="phone" label="Phone" type="tel" required />
            <Field id="email" label="Email" type="email" required className="sm:col-span-2" />
            <div className="sm:col-span-2">
              <Label htmlFor="subject">What can we help with?</Label>
              <select
                id="subject"
                name="subject"
                required
                className="mt-2 h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {subjects.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="message">Project details</Label>
              <Textarea id="message" name="message" rows={5} required className="mt-2" />
            </div>
          </div>
          <Button type="submit" variant="gold" size="lg" className="mt-7">
            Send enquiry
          </Button>
          {sent && (
            <p className="mt-4 text-sm text-success">
              Your enquiry has been logged with the studio.
            </p>
          )}
        </form>

        <aside className="h-max space-y-6 rounded-lg border border-border bg-card p-8">
          <Row icon={MapPin} title="Studio & workshop">
            PD Paulandium Studio, Industrial Area Phase II, New Delhi 110020
          </Row>
          <Row icon={Phone} title="Phone">
            +91 98100 00000
          </Row>
          <Row icon={Mail} title="Email">
            studio@pdpaulandium.com
          </Row>
          <Row icon={Clock} title="Open">
            Monday to Saturday, 10:00 – 19:00
          </Row>
        </aside>
      </div>
    </>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  className,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} required={required} className="mt-2" />
    </div>
  );
}

function Row({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof MapPin;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-accent" />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}
