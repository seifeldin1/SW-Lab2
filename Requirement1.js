
var inventoryItem = [], transactions = [], categories = [], customerFieldsRegistory = {};

function doStuff(action, newItem) {
    if (["add", "edit", "remove"].includes(action)) {
        if (action === "add") {
            addItem(newItem)
        } else if (action === "edit" && inventoryItem[newItem[0]]) {
            editItem(inventoryItem[newItem[0]])
        } else if (action === "remove" && inventoryItem[newItem[0]]) {
            removeItem(inventoryItem[newItem[0]])
        }
        console.log("=== Dashboard ===\nItems: " + inventoryItem.length
             + "\nTotal: $" + inventoryItem.reduce((tot, x) => tot 
             + x.quantity * x.price, 0).toFixed(2) 
             + "\nCats: " + categories.join(', '));
    }
    if (["Sale", "Restock"].includes(action)) {
        for (let k of inventoryItem) {
            if (k.name === newItem[0]) {
                if (action === "Sale" && k.quantity >= newItem[1]) {
                    sell(newItem)
                } else if (action === "Restock") {
                    k.quantity += newItem[1];
                    transactions.push({ type: "restock", itm: k, quantityR: newItem[1], d: new Date() });
                    console.log(`Restocked ${newItem[1]} ${k.unt} of ${k.n}`);
                }
                break;
            }
        }
    }
    if (action === "search") console.log(inventoryItem.filter(x => [x.n, x.cat, x.price].some(v => v.toString().toLowerCase().includes(newItem[0].toLowerCase()))));
    if (action === "viewItem") console.log("=== Inv ===", inventoryItem);
    if (action === "exportAll") console.log("CSV:\n" + ["Name,Category,Quantity,Price,Unit,AddedAt"].concat(inventoryItem.map(x => Object.values(x).join(','))).join('\n'));
    if (action === "viewAllTransactions") console.log("Transactions:\n", transactions);
    if (action === "vwIAg") console.log(inventoryItem.map(x => `${x.n}: ${Math.floor((new Date() - new Date(x.added)) / (1000 * 60 * 60 * 24))}d`).join('\n'));
    if (action === "Import") newItem[0].forEach(x => doStuff("add", [x.n, x.cat, x.quantity, x.price, x.unit]));
    // if (action === "addFld" && !customerFieldsRegistory[newItem[0]]) customerFieldsRegistory[newItem[0]] = null;
    // if (action === "udCFld") inventoryItem.find(x => x.n === newItem[0])?.customerFields[newItem[1]] = newItem[2];
}

function addItem(newItem){
    var item = {
         name: newItem[0], 
         category: newItem[1], 
         quantity: newItem[2], 
         price: newItem[3], 
         units: newItem[4], 
         date: new Date(), 
         customerFields: newItem[5] || {} 
        };
    inventoryItem.push(item);
    if (!categories.includes(newItem[1])) categories.push(newItem[1]);
    transactions.push({ 
        type: "add", 
        item 
    });
}

function editItem(item){
    transactions.push({ 
        type: "edit", 
        old: inventoryItem[item[0]], 
        new: b.slice(1) 
    });
    inventoryItem[item[0]] = { 
        ...inventoryItem[item[0]], 
        name: item[1], 
        category: item[2], 
        quantity: item[3], 
        price: item[4], 
        units: item[5], 
        customerFields: item[6] || {} 
    };
}

function removeItem(item){
    transactions.push({ 
        type: "delete", 
        item: inventoryItem[item[0]] 
    });
    inventoryItem.splice(item[0], 1);
}

function sell(item){
    for (let k of inventoryItem) {
        if (k.name === item[0]) {
    k.quantity -= item[1];
    transactions.push({ type: "sale", item: k, quantity: item[1], date: new Date() });
    console.log(`Sold ${item[1]} ${k.units} of ${k.name}`);}}
}

function viewInventory ()
{
    console.log("=== Inv ===", inventoryItem);

}

addItem(["laptop", "electronics", 12 , 10 , 20])
sell(["laptop", 7])

viewInventory();