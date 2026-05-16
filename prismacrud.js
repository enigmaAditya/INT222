import dotenv from "dotenv";
dotenv.config(); // load .env
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// Create Customer
const createCustomer = async (name, email) => {
    const customer = await prisma.customer.create({
        data: { name, email },
    });
    console.log("Created:", customer);
};
// Get Customers
const getCustomers = async () => {
    const customers = await prisma.customer.findMany();
        console.log("All Customers:", customers);
};
// Update Customer
const updateCustomer = async (id, name) => {
    const customer = await prisma.customer.update({
        where: { id },
        data: { name },
    });
    console.log("Updated:", customer);
};
// Delete Customer
const deleteCustomer = async (id) => {
    const customer = await prisma.customer.delete({
        where: { id },
    });
    console.log("Deleted:", customer);
};
// Main Function
async function main() {
    await createCustomer("Krishna", "aditya@example.com","9304806108");
    await getCustomers();
    // await updateCustomer(2, "Ashish");
    // await deleteCustomer(1);
}
main()
.catch(console.error)
.finally(() => prisma.$disconnect());
