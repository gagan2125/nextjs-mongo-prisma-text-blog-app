import { NextResponse } from "next/server";
import prisma from "@/prisma";

const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("Database Connection Successful");
  } catch (error) {
    console.error("Database Connection Failed:", error);
    throw new Error("Database Connection Failed");
  }
};

const disconnectFromDatabase = async () => {
  await prisma.$disconnect();
  console.log("Disconnected from Database");
};

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await connectToDatabase();
    const id = req.url.split("/blog/")[1];
    const post = await prisma.post.findFirst({
      where: {
        id,
      },
    });
    if (!post)
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await disconnectFromDatabase();
  }
};

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    await connectToDatabase();
    const id = req.url.split("/blog/")[1];
    const { item, cups, amount } = await req.json();
    const post = await prisma.post.update({
      data: { item, cups, amount },
      where: { id },
    });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await disconnectFromDatabase();
  }
};

export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    await connectToDatabase();
    const id = req.url.split("/blog/")[1];
    const post = await prisma.post.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await disconnectFromDatabase();
  }
};
