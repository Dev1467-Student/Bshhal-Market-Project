import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRef, useEffect, useState } from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { C as CurrencyFormatter } from "./CurrencyFormatter-Bo-PTyIu.js";
import { P as ProductRoute } from "./helpers-B7gCMt1w.js";
function DepartmentNavBar() {
  const { departments } = usePage().props;
  return /* @__PURE__ */ jsx("div", { className: "navbar bg-base-100 border-t min-h-4", children: /* @__PURE__ */ jsx("div", { className: "navbar-center hidden lg:flex", children: /* @__PURE__ */ jsx("ul", { className: "menu menu-horizontal menu-dropdown dropdown-hover px-1 z-20 py-0", children: departments.map((department) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("product.byDepartment", department.slug), children: department.name }) }, department.id)) }) }) });
}
function MobileMenu({
  isMenuOpen,
  toggleMenu,
  user,
  closeMenu
}) {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
        closeMenu();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, closeMenu]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        ref: buttonRef,
        onClick: toggleMenu,
        className: "lg:hidden text-gray-600 hover:text-gray-900",
        "aria-label": "Toggle menu",
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-6 w-6",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M4 6h16M4 12h16M4 18h16"
              }
            )
          }
        )
      }
    ),
    isMenuOpen && /* @__PURE__ */ jsxs(
      "ul",
      {
        ref: menuRef,
        className: "absolute top-16 left-0 z-40 w-52 bg-white border rounded-md shadow-lg p-2 space-y-2",
        children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              href: route("dashboard"),
              className: "block px-3 py-1 text-sm hover:text-purple-600",
              children: "Home"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              href: route("shop"),
              className: "block px-3 py-1 text-sm hover:text-purple-600",
              children: "Shop"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              href: "/about",
              className: "block px-3 py-1 text-sm hover:text-purple-600",
              children: "About"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              href: "/contact",
              className: "block px-3 py-1 text-sm hover:text-purple-600",
              children: "Contact"
            }
          ) }),
          !user && /* @__PURE__ */ jsxs("li", { className: "flex flex-col space-y-2 border-t border-gray-200 pt-2", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("login"),
                className: "btn btn-ghost btn-sm rounded-lg hover:bg-purple-700 hover:text-white",
                children: "Log in"
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("register"),
                className: "text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded-md",
                children: "Register"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function Logo() {
  return /* @__PURE__ */ jsx(Link, { href: "/", className: "flex-shrink-0", children: /* @__PURE__ */ jsx(
    "img",
    {
      src: "/images/logo-karthive-removebg.jpg",
      alt: "Karthive",
      className: "h-8 w-auto"
    }
  ) });
}
function DesktopNavLinks() {
  const links = [
    { name: "Home", routeName: "dashboard" },
    { name: "Shop", routeName: "shop" },
    { name: "About", routeName: "about" },
    { name: "Contact", routeName: "contact" }
  ];
  return /* @__PURE__ */ jsx("div", { className: "hidden lg:flex lg:space-x-6 justify-center flex-1", children: links.map(({ name, routeName }) => /* @__PURE__ */ jsx(
    Link,
    {
      href: route(routeName),
      className: "px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600",
      children: name
    },
    routeName
  )) });
}
function SearchBar() {
  const { keyword } = usePage().props;
  const searchForm = useForm({
    keyword: keyword || ""
  });
  const { url } = usePage();
  const onSubmit = (event) => {
    event.preventDefault();
    searchForm.get(url, {
      preserveScroll: true,
      preserveState: true
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "hidden lg:block max-w-md w-full", children: /* @__PURE__ */ jsxs("form", { onSubmit, className: "flex", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: searchForm.data.keyword,
        onChange: (e) => searchForm.setData("keyword", e.target.value),
        className: "flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-purple-500 focus:border-purple-500 text-sm",
        placeholder: "Search products..."
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        className: "px-3 py-2 bg-purple-600 text-white border border-l-0 border-purple-600 rounded-r-md hover:bg-purple-700 text-sm",
        children: /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "h-4 w-4" })
      }
    )
  ] }) });
}
function MobileSearch() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { keyword } = usePage().props;
  const searchForm = useForm({
    keyword: keyword || ""
  });
  const { url } = usePage();
  const onSubmit = (event) => {
    event.preventDefault();
    searchForm.get(url, {
      preserveScroll: true,
      preserveState: true
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "lg:hidden text-gray-600 hover:text-gray-900",
        onClick: () => setIsMobileSearchOpen((prev) => !prev),
        "aria-label": "Toggle mobile search",
        children: isMobileSearchOpen ? /* @__PURE__ */ jsx(XMarkIcon, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "h-5 w-5" })
      }
    ),
    isMobileSearchOpen && /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit,
        className: "absolute top-16 left-0 right-0 z-40 bg-white px-4 py-2 shadow-md flex items-center space-x-2",
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              autoFocus: true,
              value: searchForm.data.keyword,
              onChange: (e) => searchForm.setData("keyword", e.target.value),
              className: "flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-sm",
              placeholder: "Search products..."
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm",
              children: /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "h-4 w-4" })
            }
          )
        ]
      }
    )
  ] });
}
function ResponsiveNavLink({
  active = false,
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: `flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${active ? "border-indigo-400 bg-indigo-50 text-indigo-700 focus:border-indigo-700 focus:bg-indigo-100 focus:text-indigo-800 dark:border-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300 dark:focus:border-indigo-300 dark:focus:bg-indigo-900 dark:focus:text-indigo-200" : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:focus:border-gray-600 dark:focus:bg-gray-700 dark:focus:text-gray-200"} text-xs transition duration-150 ease-in-out focus:outline-none ${className}`,
      children
    }
  );
}
function AuthSection({ user }) {
  if (user) {
    return /* @__PURE__ */ jsxs("div", { className: "dropdown dropdown-end", children: [
      /* @__PURE__ */ jsx("div", { tabIndex: 0, className: "btn btn-ghost btn-circle avatar", children: /* @__PURE__ */ jsx("div", { className: "w-8 rounded-full ring ring-purple-600 ring-offset-1", children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: "User avatar",
          src: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        }
      ) }) }),
      /* @__PURE__ */ jsxs(
        "ul",
        {
          tabIndex: 0,
          className: "menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow",
          children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              ResponsiveNavLink,
              {
                href: route("profile.edit"),
                className: "justify-between",
                children: "Profile"
              }
            ) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ResponsiveNavLink, { href: "", children: "Settings" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ResponsiveNavLink, { method: "post", href: route("logout"), as: "button", children: "Log Out" }) })
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex lg:items-center lg:space-x-3", children: [
    /* @__PURE__ */ jsx(
      Link,
      {
        href: route("login"),
        className: "btn btn-ghost btn-sm rounded-lg hover:bg-purple-700 hover:text-white",
        children: "Log in"
      }
    ),
    /* @__PURE__ */ jsx(
      Link,
      {
        href: route("register"),
        className: "text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded-md",
        children: "Register"
      }
    )
  ] });
}
function MiniCartDropDown() {
  const { totalQuantity, totalPrice, miniCartItems } = usePage().props;
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "dropdown dropdown-end mr-5", children: [
    /* @__PURE__ */ jsx("div", { tabIndex: 0, role: "button", className: "btn btn-ghost btn-circle", children: /* @__PURE__ */ jsxs("div", { className: "indicator", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          className: "h-5 w-5",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
              d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "badge badge-sm indicator-item bg-purple-800 text-white", children: totalQuantity })
    ] }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        tabIndex: 0,
        className: "card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-[480px] shadow",
        children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold", children: [
            totalQuantity,
            " Items"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "my-1 max-h-[300px] overflow-auto", children: [
            miniCartItems.length === 0 && /* @__PURE__ */ jsx("div", { className: "py-2 text-gray-500 text-center", children: "You don't have any items yet." }),
            miniCartItems.map((item) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex gap-3 p-3 border-b items-start",
                children: [
                  /* @__PURE__ */ jsx(Link, { href: ProductRoute(item), children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: item.image,
                      alt: item.title,
                      className: "w-16 h-16 object-contain rounded"
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1", children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-1", children: /* @__PURE__ */ jsx(Link, { href: ProductRoute(item), children: item.title }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs text-gray-600", children: [
                      /* @__PURE__ */ jsxs("span", { children: [
                        "Quantity: ",
                        item.quantity
                      ] }),
                      /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(
                        CurrencyFormatter,
                        {
                          amount: item.quantity * item.price
                        }
                      ) })
                    ] })
                  ] })
                ]
              },
              item.id
            ))
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-lg font-semibold", children: [
            "Subtotal: ",
            /* @__PURE__ */ jsx(CurrencyFormatter, { amount: totalPrice })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "card-actions", children: /* @__PURE__ */ jsx(
            Link,
            {
              href: route("cart.index"),
              className: "btn bg-purple-800 text-white hover:bg-purple-700 btn-block",
              children: "View cart"
            }
          ) })
        ] })
      }
    )
  ] }) });
}
function RightSection({ user }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
    /* @__PURE__ */ jsx(SearchBar, {}),
    /* @__PURE__ */ jsx(MobileSearch, {}),
    /* @__PURE__ */ jsx(MiniCartDropDown, {}),
    /* @__PURE__ */ jsx(AuthSection, { user })
  ] });
}
function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { auth } = usePage().props;
  const { user } = auth;
  const closeMenu = () => setIsMenuOpen(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "shadow-sm border-b border-gray-200 bg-white sticky top-0 z-50", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx(
          MobileMenu,
          {
            isMenuOpen,
            toggleMenu: () => setIsMenuOpen(!isMenuOpen),
            closeMenu,
            user
          }
        ),
        /* @__PURE__ */ jsx(Logo, {})
      ] }),
      /* @__PURE__ */ jsx(DesktopNavLinks, {}),
      /* @__PURE__ */ jsx(RightSection, { user })
    ] }) }) }),
    /* @__PURE__ */ jsx(DepartmentNavBar, {})
  ] });
}
function AuthenticatedLayout({
  header,
  children
}) {
  const props = usePage().props;
  props.auth.user;
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const [successMessage, setSuccessMessage] = useState([]);
  const timeoutRefs = useRef(
    {}
  );
  useEffect(() => {
    if (props.success.message) {
      const newMessage = {
        ...props.success,
        id: props.success.time
        // use time as the unique identifier
      };
      setSuccessMessage((prevMessages) => [newMessage, ...prevMessages]);
      const timeoutId = setTimeout(() => {
        setSuccessMessage(
          (prevMessages) => prevMessages.filter((msg) => msg.id !== newMessage.id)
        );
        delete timeoutRefs.current[newMessage.id];
      }, 1e4);
      timeoutRefs.current[newMessage.id] = timeoutId;
    }
  }, [props.success]);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100 dark:bg-gray-900", children: [
    /* @__PURE__ */ jsx(NavBar, {}),
    props.error && /* @__PURE__ */ jsx("div", { className: "container mx-auto px-8 mt-8", children: /* @__PURE__ */ jsx("div", { className: "alert alert-error", children: props.error }) }),
    successMessage.length > 0 && /* @__PURE__ */ jsx("div", { className: "toast toast-top toast-end z-[1000] mt-16", children: successMessage.map((msg) => /* @__PURE__ */ jsx("div", { className: "alert alert-success text-white", children: /* @__PURE__ */ jsx("span", { children: msg.message }) }, msg.id)) }),
    /* @__PURE__ */ jsx("main", { children })
  ] });
}
export {
  AuthenticatedLayout as A
};
