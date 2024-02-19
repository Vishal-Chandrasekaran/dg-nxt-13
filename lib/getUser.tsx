export default async function getUser(userId: string) {

    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

    //This is the right approach whenever you are not handling the non-existant params
    // if(!res.ok) throw new Error('failed to fetch the data');
    if(!res.ok) return undefined

    return res.json();
};