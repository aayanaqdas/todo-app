import Link from "next/link";

export function RedirectBtn() {
  return (
    <Link href={"/todo"}>
      <button className="px-5 py-3 mt-4 cursor-pointer rounded-lg bg-blue-600 hover:bg-blue-900 text-white text-center">
        Todo app
      </button>
    </Link>
  );
}
