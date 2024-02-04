"use client";
import { Toaster, toast } from "react-hot-toast";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const postBlog = async ({
  item,
  cups,
  amount,
}: {
  item: string;
  cups: string;
  amount: string;
}) => {
  const res = fetch("http://localhost:3000/api/blog", {
    method: "POST",
    body: JSON.stringify({ item, cups, amount }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

const AddItem = () => {
  const router = useRouter();
  const itemRef = useRef<HTMLInputElement | null>(null);
  const cupsRef = useRef<HTMLInputElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      itemRef.current?.value &&
      cupsRef.current?.value &&
      amountRef.current?.value
    ) {
      toast.loading("Sending Request", { id: "1" });
      await postBlog({
        item: itemRef.current?.value,
        cups: cupsRef.current?.value,
        amount: amountRef.current?.value,
      });
      toast.success("Item Added Succesfully", { id: "1" });
      router.push("/");
    }
  };
  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4 ">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold  p-3 ">Add Items</p>
          <form onSubmit={handleSubmit}>
            <input
              ref={itemRef}
              placeholder="Enter Item"
              type="text"
              className="rounded-md px-4 py-2 my-2 w-full"
            />
            <input
              ref={cupsRef}
              placeholder="Enter no of Cups"
              type="text"
              className="rounded-md px-4 py-2 my-2 w-full"
            />
            <input
              ref={amountRef}
              placeholder="Enter Amount"
              type="text"
              className="rounded-md px-4 py-2 my-2 w-full"
            />
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItem;
