import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { usePage, Link } from "@inertiajs/react";
import { ShoppingBagIcon, UserCircleIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
const colors$1 = {
  // Neutrals
  black: "text-black",
  white: "text-white",
  gray: {
    500: "text-gray-500",
    600: "text-gray-600",
    700: "text-gray-700"
  },
  // Background variants (bg-* equivalents)
  bg: {
    black: "bg-black",
    white: "bg-white"
  },
  // Border variants (border-* equivalents)
  border: {
    black: "border-black",
    gray: {
      100: "border-gray-100",
      200: "border-gray-200",
      300: "border-gray-300"
    }
  }
};
const fontSize = {
  xs: "text-xs",
  // 0.75 rem  / 12 px
  sm: "text-sm",
  // 1 rem     / 16 px
  lg: "text-lg"
};
const fontWeight = {
  // 400
  medium: "font-medium",
  // 600
  bold: "font-bold"
};
const tracking = {
  // -0.05 em
  tight: "tracking-tight",
  //  0 em
  wide: "tracking-wide"
};
const typography$1 = {
  fontSize,
  fontWeight,
  tracking
};
const breakpoints$1 = {
  lg: "lg"
};
const theme = {
  colors: colors$1,
  typography: typography$1,
  breakpoints: breakpoints$1
};
const { colors, typography, breakpoints } = theme;
const navLinks = [
  { name: "Home", routeName: "dashboard" },
  { name: "Shop", routeName: "shop" },
  { name: "About", routeName: "about" },
  { name: "Contact", routeName: "contact" }
];
const footerLinks = [
  ...navLinks,
  { name: "Cart", routeName: "cart.index" }
];
function navLinkClass(active = false) {
  return [
    typography.fontSize.sm,
    typography.fontWeight.medium,
    typography.tracking.wide,
    "uppercase",
    active ? colors.black : colors.gray[600],
    "transition-colors hover:text-black"
  ].join(" ");
}
function AppLayout({ children }) {
  const { auth, appName, totalQuantity } = usePage().props;
  const user = auth.user;
  const currentUrl = usePage().url;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [currentUrl]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: [
        "flex min-h-screen flex-col",
        colors.bg.white,
        colors.black
      ].join(" "),
      children: [
        /* @__PURE__ */ jsxs(
          "header",
          {
            className: [
              "sticky top-0 z-50",
              colors.bg.white,
              colors.border.gray[200],
              "border-b"
            ].join(" "),
            children: [
              /* @__PURE__ */ jsx("div", { className: "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex h-16 items-center justify-between gap-4", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("dashboard"),
                    className: [
                      "flex shrink-0 items-center gap-2",
                      typography.fontSize.lg,
                      typography.fontWeight.bold,
                      typography.tracking.tight,
                      colors.black
                    ].join(" "),
                    children: appName
                  }
                ),
                /* @__PURE__ */ jsx(
                  "nav",
                  {
                    className: `hidden ${breakpoints.lg}:flex ${breakpoints.lg}:flex-1 ${breakpoints.lg}:justify-center`,
                    "aria-label": "Main navigation",
                    children: /* @__PURE__ */ jsx("ul", { className: "flex items-center gap-8", children: navLinks.map(({ name, routeName }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: route(routeName),
                        className: navLinkClass(
                          route().current(routeName) ?? false
                        ),
                        children: name
                      }
                    ) }, routeName)) })
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-4", children: [
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: route("cart.index"),
                      className: [
                        "relative inline-flex items-center justify-center border p-2",
                        colors.border.gray[300],
                        colors.gray[700],
                        "transition-colors hover:border-black hover:text-black"
                      ].join(" "),
                      "aria-label": `Cart, ${totalQuantity} items`,
                      children: [
                        /* @__PURE__ */ jsx(ShoppingBagIcon, { className: "h-5 w-5" }),
                        totalQuantity > 0 && /* @__PURE__ */ jsx(
                          "span",
                          {
                            className: [
                              "absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center border px-1",
                              typography.fontSize.xs,
                              typography.fontWeight.bold,
                              colors.bg.black,
                              colors.white,
                              colors.border.black
                            ].join(" "),
                            children: totalQuantity
                          }
                        )
                      ]
                    }
                  ),
                  user ? /* @__PURE__ */ jsxs("div", { className: "relative hidden lg:block", ref: userMenuRef, children: [
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setUserMenuOpen((open) => !open),
                        className: [
                          "inline-flex items-center gap-2 border px-3 py-2",
                          typography.fontSize.sm,
                          typography.fontWeight.medium,
                          colors.border.gray[300],
                          colors.gray[700],
                          "transition-colors hover:border-black hover:text-black"
                        ].join(" "),
                        "aria-expanded": userMenuOpen,
                        "aria-haspopup": "true",
                        children: [
                          /* @__PURE__ */ jsx(UserCircleIcon, { className: "h-5 w-5" }),
                          /* @__PURE__ */ jsx("span", { className: "max-w-[8rem] truncate", children: user.name })
                        ]
                      }
                    ),
                    userMenuOpen && /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: [
                          "absolute right-0 top-full z-50 mt-1 w-48 border",
                          colors.bg.white,
                          colors.border.gray[200]
                        ].join(" "),
                        children: [
                          /* @__PURE__ */ jsx(
                            Link,
                            {
                              href: route("profile.edit"),
                              className: [
                                "block border-b px-4 py-3",
                                typography.fontSize.sm,
                                colors.border.gray[100],
                                colors.gray[700],
                                "transition-colors hover:bg-gray-50 hover:text-black"
                              ].join(" "),
                              children: "Profile"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            Link,
                            {
                              href: route("logout"),
                              method: "post",
                              as: "button",
                              className: [
                                "block w-full px-4 py-3 text-left",
                                typography.fontSize.sm,
                                colors.gray[700],
                                "transition-colors hover:bg-gray-50 hover:text-black"
                              ].join(" "),
                              children: "Log out"
                            }
                          )
                        ]
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: `hidden ${breakpoints.lg}:flex ${breakpoints.lg}:items-center ${breakpoints.lg}:gap-3`,
                      children: [
                        /* @__PURE__ */ jsx(
                          Link,
                          {
                            href: route("login"),
                            className: [
                              "border px-4 py-2",
                              typography.fontSize.sm,
                              typography.fontWeight.medium,
                              typography.tracking.wide,
                              "uppercase",
                              colors.border.gray[300],
                              colors.gray[700],
                              "transition-colors hover:border-black hover:text-black"
                            ].join(" "),
                            children: "Log in"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          Link,
                          {
                            href: route("register"),
                            className: [
                              "border px-4 py-2",
                              typography.fontSize.sm,
                              typography.fontWeight.medium,
                              typography.tracking.wide,
                              "uppercase",
                              colors.bg.black,
                              colors.border.black,
                              colors.white,
                              "transition-colors hover:bg-gray-900"
                            ].join(" "),
                            children: "Register"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      className: [
                        `inline-flex items-center justify-center border p-2 ${breakpoints.lg}:hidden`,
                        colors.border.gray[300],
                        colors.gray[700],
                        "transition-colors hover:border-black hover:text-black"
                      ].join(" "),
                      onClick: () => setMobileOpen((open) => !open),
                      "aria-expanded": mobileOpen,
                      "aria-label": mobileOpen ? "Close menu" : "Open menu",
                      children: mobileOpen ? /* @__PURE__ */ jsx(XMarkIcon, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Bars3Icon, { className: "h-5 w-5" })
                    }
                  )
                ] })
              ] }) }),
              mobileOpen && /* @__PURE__ */ jsx(
                "div",
                {
                  className: [
                    `border-t ${breakpoints.lg}:hidden`,
                    colors.border.gray[200],
                    colors.bg.white
                  ].join(" "),
                  children: /* @__PURE__ */ jsx(
                    "nav",
                    {
                      className: "mx-auto w-full max-w-7xl px-4 py-4 sm:px-6",
                      "aria-label": "Mobile navigation",
                      children: /* @__PURE__ */ jsxs("ul", { className: "flex flex-col", children: [
                        navLinks.map(({ name, routeName }) => /* @__PURE__ */ jsx(
                          "li",
                          {
                            className: ["border-b", colors.border.gray[100]].join(" "),
                            children: /* @__PURE__ */ jsx(
                              Link,
                              {
                                href: route(routeName),
                                className: [
                                  "block py-3",
                                  navLinkClass(route().current(routeName) ?? false)
                                ].join(" "),
                                children: name
                              }
                            )
                          },
                          routeName
                        )),
                        user ? /* @__PURE__ */ jsxs(Fragment, { children: [
                          /* @__PURE__ */ jsx(
                            "li",
                            {
                              className: ["border-b", colors.border.gray[100]].join(" "),
                              children: /* @__PURE__ */ jsx(
                                Link,
                                {
                                  href: route("profile.edit"),
                                  className: [
                                    "block py-3",
                                    navLinkClass(route().current("profile.edit") ?? false)
                                  ].join(" "),
                                  children: "Profile"
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "li",
                            {
                              className: ["border-b", colors.border.gray[100]].join(" "),
                              children: /* @__PURE__ */ jsx(
                                Link,
                                {
                                  href: route("logout"),
                                  method: "post",
                                  as: "button",
                                  className: [
                                    "block w-full py-3 text-left",
                                    navLinkClass()
                                  ].join(" "),
                                  children: "Log out"
                                }
                              )
                            }
                          )
                        ] }) : /* @__PURE__ */ jsxs("li", { className: "flex flex-col gap-2 pt-4", children: [
                          /* @__PURE__ */ jsx(
                            Link,
                            {
                              href: route("login"),
                              className: [
                                "border px-4 py-3 text-center",
                                typography.fontSize.sm,
                                typography.fontWeight.medium,
                                typography.tracking.wide,
                                "uppercase",
                                colors.border.gray[300],
                                colors.gray[700]
                              ].join(" "),
                              children: "Log in"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            Link,
                            {
                              href: route("register"),
                              className: [
                                "border px-4 py-3 text-center",
                                typography.fontSize.sm,
                                typography.fontWeight.medium,
                                typography.tracking.wide,
                                "uppercase",
                                colors.bg.black,
                                colors.border.black,
                                colors.white
                              ].join(" "),
                              children: "Register"
                            }
                          )
                        ] })
                      ] })
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("main", { className: "flex-1", children }),
        /* @__PURE__ */ jsx(
          "footer",
          {
            className: [
              "border-t",
              colors.border.gray[200],
              colors.bg.white
            ].join(" "),
            children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: [
                        typography.fontSize.lg,
                        typography.fontWeight.bold,
                        typography.tracking.tight,
                        colors.black
                      ].join(" "),
                      children: appName
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: [
                        "mt-2 max-w-xs",
                        typography.fontSize.sm,
                        colors.gray[500]
                      ].join(" "),
                      children: "Curated products from independent vendors."
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("nav", { "aria-label": "Footer navigation", children: /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3", children: footerLinks.map(({ name, routeName }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route(routeName),
                    className: [
                      typography.fontSize.sm,
                      colors.gray[600],
                      "transition-colors hover:text-black"
                    ].join(" "),
                    children: name
                  }
                ) }, routeName)) }) })
              ] }),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: [
                    "mt-8 border-t pt-6",
                    typography.fontSize.xs,
                    typography.tracking.wide,
                    colors.border.gray[200],
                    colors.gray[500],
                    "uppercase"
                  ].join(" "),
                  children: [
                    "© ",
                    (/* @__PURE__ */ new Date()).getFullYear(),
                    " ",
                    appName,
                    ". All rights reserved."
                  ]
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
export {
  AppLayout as A
};
