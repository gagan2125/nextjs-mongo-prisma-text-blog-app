import prisma from "@/prisma";
import { NextResponse } from "next/server";

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
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await disconnectFromDatabase();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { item, cups, amount } = await req.json();
    await connectToDatabase();
    const post = await prisma.post.create({ data: { item, cups, amount } });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await disconnectFromDatabase();
  }
};
