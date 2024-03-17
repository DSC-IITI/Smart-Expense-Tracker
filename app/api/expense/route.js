import Expense from "../../../models/expense";
import { connectToDB } from "../../../utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const expense = await Expense.find({}).populate('creator')

        return new Response(JSON.stringify(expense), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all expense", { status: 500 })
    }
} 