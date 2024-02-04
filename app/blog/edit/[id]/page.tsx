"use client";
import { Toaster, toast } from "react-hot-toast";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type UpdateBlogParams = {
  item: string;
  cups: string;
  amount: string;
  id: string;
};
const updateBlog = async (data: UpdateBlogParams) => {
  const res = fetch(`http://localhost:3000/api/blog/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({
      item: data.item,
      cups: data.cups,
      amount: data.amount,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};
const deleteBlog = async (id: string) => {
  const res = fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};
const getBlogId = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();
  return data.post;
};

const EditItem = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  console.log(params.id);
  const itemRef = useRef<HTMLInputElement | null>(null);
  const cupsRef = useRef<HTMLInputElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    toast.loading("Fetching Item Details", { id: "1" });
    getBlogId(params.id)
      .then((data) => {
        if (itemRef.current && cupsRef.current && amountRef.current) {
          (itemRef.current.value = data.item),
            (cupsRef.current.value = data.cups),
            (amountRef.current.value = data.amount);
          toast.success("Fetching Complete", { id: "1" });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Fetching Item", { id: "1" });
      });
  }, [params.id]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      itemRef.current?.value &&
      cupsRef.current?.value &&
      amountRef.current?.value
    ) {
      toast.loading("Sending Request", { id: "1" });
      await updateBlog({
        item: itemRef.current?.value,
        cups: cupsRef.current?.value,
        amount: amountRef.current?.value,
        id: params.id,
      });
      toast.success("Item Added Succesfully", { id: "1" });
      router.push("/");
    }
  };
  const handleDelete = async () => {
    toast.loading("Deleting Item", { id: "2" });
    await deleteBlog(params.id);
    toast.success("Item Deleted", { id: "2" });
    router.push("/");
  };

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4 ">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold  p-3 ">Edit Item</p>
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
            <div className="flex justify-between">
              <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                Update
              </button>
            </div>
          </form>
          <button
            onClick={handleDelete}
            className="font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto mt-2 hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default EditItem;
