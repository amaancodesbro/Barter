//const numbers = [5, 10, 15, 20];

//const result = numbers.find((number) => {
//    return number === 15;
//});

//-console.log(result);

const listings = [
    {
        id: 1,
        item: "iPhone 13"
    },
    {
        id: 2,
        item: "MacBook Air"
    }
];

const result = listings.find((listing) => {
    return listing.id === 2;
});

console.log(result);