import Expense from "@/models/expense";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    const { name,amount, date,   userId} = await request.json();

    try {
        await connectToDB();
        const newExpense = new Expense({ creator: userId,name,amount, date  });

        await newExpense.save();
        return new Response(JSON.stringify(newExpense), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Expense", { status: 500 });
    }
}