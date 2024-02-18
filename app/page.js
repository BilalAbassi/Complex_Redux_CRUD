import Inputs from "@/components/Inputs";
import UserDetails from "@/components/UserDetails";

export default function Home() {
  return (
    <div className="grid grid-cols-1 justify-items-center mt-10">
      <Inputs />
      <UserDetails />
    </div>
  );
}
