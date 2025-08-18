export const userData=async()=>{
    try {
        const res=await fetch("https://dummyjson.com/users");
        const data=await res.json();
        return data.users;
        
    } catch (error) {
        return error;
    }
}