import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";

export default function Contact() {
  return (
    <AppLayout>
      <Head title="Contact" />

      <div className="bg-white dark:bg-gray-950 text-black dark:text-white">
        {/* Hero */}
        <section className="flex min-h-[40vh] w-full items-center justify-center border-b border-black dark:border-gray-700 px-4 py-16 md:px-8 lg:px-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h1 className="text-5xl font-black uppercase tracking-tighter md:text-6xl">
              Get In Touch
            </h1>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mx-auto max-w-4xl px-4 py-16 md:px-8 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-2">

            {/* Contact Info */}
            <div>
              <h2 className="mb-8 border-b border-black dark:border-gray-700 pb-3 text-xs font-bold uppercase tracking-widest">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">Email</h3>
                  <p className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white underline underline-offset-2 transition-colors">
                    hello@example.com
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Phone</h3>
                  <p className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white underline underline-offset-2 transition-colors">
                    +1 (234) 567-890
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Address</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    123 Design Street<br />
                    Creative City, CC 12345
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="mb-6 border-b border-black dark:border-gray-700 pb-3 text-xs font-bold uppercase tracking-widest">
                  Follow Us
                </h2>
                <div className="flex gap-4">
                  {["Instagram", "Twitter", "Facebook"].map((social, index) => (
                    <a
                      key = { index }
                      href = "#"
                      className = "inline-flex items-center justify-center border border-black dark:border-gray-600 px-4 py-2 text-sm font-medium uppercase tracking-wide text-black dark:text-white transition-colors duration-150 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                    >
                    { social }
                    </a>
                  ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="mb-8 border-b border-black dark:border-gray-700 pb-3 text-xs font-bold uppercase tracking-widest">
              Send Us a Message
            </h2>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-white dark:bg-gray-900 border border-black dark:border-gray-600 text-black dark:text-white text-sm px-4 py-3 outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-white dark:bg-gray-900 border border-black dark:border-gray-600 text-black dark:text-white text-sm px-4 py-3 outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full bg-white dark:bg-gray-900 border border-black dark:border-gray-600 text-black dark:text-white text-sm px-4 py-3 outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black text-sm font-medium uppercase tracking-wide px-6 py-3 transition-colors duration-150 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white"
              >
                Send Message
              </button>
            </form>
          </div>
          </div>
        </section>
      </div >
    </AppLayout >
  );
}