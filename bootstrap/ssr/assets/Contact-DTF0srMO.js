import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppLayout } from "./AppLayout-CUsP7URF.js";
import { Head } from "@inertiajs/react";
import "@heroicons/react/24/outline";
import "react";
function Contact() {
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Contact" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white text-black", children: [
      /* @__PURE__ */ jsx("section", { className: "flex min-h-[40vh] w-full items-center justify-center border-b border-black px-4 py-16 md:px-8 lg:px-16", children: /* @__PURE__ */ jsx("div", { className: "mx-auto flex max-w-3xl flex-col items-center text-center", children: /* @__PURE__ */ jsx("h1", { className: "text-5xl font-black uppercase tracking-tighter md:text-6xl", children: "Get In Touch" }) }) }),
      /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-4xl px-4 py-16 md:px-8 lg:px-16", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-12 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-8 border-b border-black pb-3 text-xs font-bold uppercase tracking-widest", children: "Contact Information" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-2", children: "Email" }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "mailto:hello@example.com",
                  className: "text-gray-700 hover:text-black underline underline-offset-2 transition-colors",
                  children: "hello@example.com"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-2", children: "Phone" }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "tel:+1234567890",
                  className: "text-gray-700 hover:text-black underline underline-offset-2 transition-colors",
                  children: "+1 (234) 567-890"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-2", children: "Address" }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
                "123 Design Street",
                /* @__PURE__ */ jsx("br", {}),
                "Creative City, CC 12345"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-12", children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-6 border-b border-black pb-3 text-xs font-bold uppercase tracking-widest", children: "Follow Us" }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: ["Instagram", "Twitter", "Facebook"].map((social, index) => /* @__PURE__ */ jsx(
              "a",
              {
                href: "#",
                className: "inline-flex items-center justify-center border border-black px-4 py-2 text-sm font-medium uppercase tracking-wide text-black transition-colors duration-150 hover:bg-black hover:text-white",
                children: social
              },
              index
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-8 border-b border-black pb-3 text-xs font-bold uppercase tracking-widest", children: "Send Us a Message" }),
          /* @__PURE__ */ jsxs("form", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "label",
                {
                  htmlFor: "name",
                  className: "block mb-2 text-sm font-medium uppercase tracking-wide text-gray-700",
                  children: "Name"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  id: "name",
                  className: "w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "label",
                {
                  htmlFor: "email",
                  className: "block mb-2 text-sm font-medium uppercase tracking-wide text-gray-700",
                  children: "Email"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  id: "email",
                  className: "w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "label",
                {
                  htmlFor: "message",
                  className: "block mb-2 text-sm font-medium uppercase tracking-wide text-gray-700",
                  children: "Message"
                }
              ),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "message",
                  rows: 6,
                  className: "w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "w-full bg-black text-white text-sm font-medium uppercase tracking-wide px-6 py-3 transition-colors duration-150 hover:bg-gray-900",
                children: "Send Message"
              }
            )
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Contact as default
};
