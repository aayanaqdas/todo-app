"use client";
import { Todo } from "@/components/todoList";
import Link from "next/link";

export default function TodoPage() {
  return (
    <div className=" p-4 min-h-screen bg-gray-900 ">
      <Link href={"/"} className="text-white">
        Go back
      </Link>
      <Todo />
    </div>
  );
}
