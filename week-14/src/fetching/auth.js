import BASE_URL from "@/app/lib/baseUrl";

export async function findAllBooks() {
    try {

        const result = await fetch(`${BASE_URL}/books`, {
            method: "GET",
        })

        const data = await result.json();

        return data;
    } catch(err) {
        console.log(err);
        throw new Error(err.message || "Internal Server Error")
    }
}