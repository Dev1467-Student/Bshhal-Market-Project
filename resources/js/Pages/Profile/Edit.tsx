import AppLayout from "@/Layouts/AppLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import VendorDetails from "./Partials/VendorDetails";

export default function Edit({
  mustVerifyEmail,
  status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
  return (
    <AppLayout>
      <Head title="Profile" />

      <div className="bg-white dark:bg-gray-950 px-4 py-12 md:px-8 lg:px-16">

        {/* Page header */}
        <header className="mb-10 border-b border-black dark:border-gray-700 pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-black dark:text-white">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Manage your account settings and vendor details.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* Left — main forms */}
          <div className="space-y-6 md:col-span-2">

            <div className="border border-black dark:border-gray-700 bg-white dark:bg-gray-900 p-8">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                Profile Information
              </h2>
              <UpdateProfileInformationForm
                mustVerifyEmail={mustVerifyEmail}
                status={status}
                className="max-w-xl"
              />
            </div>

            <div className="border border-black dark:border-gray-700 bg-white dark:bg-gray-900 p-8">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                Update Password
              </h2>
              <UpdatePasswordForm className="max-w-xl" />
            </div>

            <div className="border border-black dark:border-gray-700 bg-white dark:bg-gray-900 p-8">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                Delete Account
              </h2>
              <DeleteUserForm className="max-w-xl" />
            </div>
          </div>

          {/* Right — vendor details */}
          <div className="border border-black dark:border-gray-700 bg-white dark:bg-gray-900 p-8 md:self-start">
            <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
              Vendor Details
            </h2>
            <VendorDetails />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}