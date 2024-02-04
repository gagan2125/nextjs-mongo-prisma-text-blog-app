import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("Database Connection Successfull");
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { item, cups, amount } = await req.json();
    await main();
    const post = await prisma.post.create({ data: { item, cups, amount } });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
