import { UserInfo } from "@/components/profile/UserInfo";

export function Profile() {
  return (
    <div className="w-full h-full flex flex-wrap items-stretch justify-center gap-2">
      <UserInfo className="bg-white rounded p-4 px-2 w-full lg:w-2/3 flex-shrink-0 h-auto" />
    </div>
  );
}
