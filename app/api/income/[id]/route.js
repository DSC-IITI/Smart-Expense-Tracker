import Income from "@/models/income";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const income = await Income.findById(params.id).populate("creator")
        if (!income) return new Response("Income Not Found", { status: 404 });

        return new Response(JSON.stringify(income), { status: 200 })

    } catch (error) {
        return new Response
        ("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const {name,date,amount} = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingIncome = await Income.findById(params.id);

        if (!existingIncome) {
            return new Response("Income not found", { status: 404 });
        }
        existingIncome.name=name;
        existingIncome.amount=amount;
        existingIncome.date=date;
    
             
        

        await existingIncome.save();

        return new Response("Successfully updated the Income", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Income", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    
    try {
        await connectToDB();
        
        // Find the prompt by ID and remove it
        await Income.findByIdAndDelete(params.id);
        console.log(params.id);
        return new Response("Income deleted successfully", { status: 200 });
       
    } catch (error) {
        return new Response("Error deleting income", { status: 500 });
    }
};