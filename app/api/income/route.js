import Income from "../../../models/income";
import { connectToDB } from "../../../utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const income = await Income.find({}).populate('creator')

        return new Response(JSON.stringify(income), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all income", { status: 500 })
    }
} 