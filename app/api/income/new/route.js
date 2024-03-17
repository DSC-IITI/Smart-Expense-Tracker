import Income from "../../../../models/income";
import { connectToDB } from "../../../../utils/database";

export const POST = async (request) => {
    const { name,amount, date,   userId} = await request.json();

    try {
        await connectToDB();
        const newIncome = new Income({ creator: userId,name,amount, date  });

        await newIncome.save();
        return new Response(JSON.stringify(newIncome), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Income", { status: 500 });
    }
}