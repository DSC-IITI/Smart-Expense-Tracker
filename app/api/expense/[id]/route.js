import Expense from "../../../../models/expense";
import { connectToDB } from "../../../../utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const expense = await Expense.findById(params.id).populate("creator")
        if (!expense) return new Response("Expense Not Found", { status: 404 });

        return new Response(JSON.stringify(expense), { status: 200 })

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
        const existingExpense = await Expense.findById(params.id);

        if (!existingExpense) {
            return new Response("Expense not found", { status: 404 });
        }
        existingExpense.name=name;
        existingExpense.amount=amount;
        existingExpense.date=date;
    
             
        

        await existingExpense.save();

        return new Response("Successfully updated the Expense", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Expense", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    
    try {
        await connectToDB();
        
        // Find the prompt by ID and remove it
        await Expense.findByIdAndDelete(params.id);
        console.log(params.id);
        return new Response("Expense deleted successfully", { status: 200 });
       
    } catch (error) {
        return new Response("Error deleting expense", { status: 500 });
    }
};