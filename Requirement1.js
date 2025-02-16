
class Item {
    constructor(name, category, quantity, price, units, customerFields = {}) {
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
        this.units = units;
        this.date = new Date();
        this.customerFields = customerFields;
    }
}

class Store {
    constructor() {
        this.inventoryItems = [];
        this.transactions = [];
        this.categories = [];
        this.customerFieldsRegistry = {};
    }

    addItem(item) {
        const newItem = new Item(item.name, item.category, item.quantity, item.price, item.units, item.customerFields);
        this.inventoryItems.push(newItem);

        if (!this.categories.includes(item.category)) {
            this.categories.push(item.category);
        }

        this.transactions.push({ type: "add", item: newItem });
    }

    editItem(item) {
        const index = this.inventoryItems.findIndex(i => i.name === item.name);
        if (index !== -1) {
            const oldItem = this.inventoryItems[index];
            this.transactions.push({ type: "edit", old: oldItem, new: item });

            this.inventoryItems[index] = {
                ...oldItem,
                name: item.name,
                category: item.category,
                quantity: item.quantity,
                price: item.price,
                units: item.units,
                customerFields: item.customerFields || {}
            };
            console.log(`Item ${item.name} updated successfully.`);
        }
    }


    removeItem(item) {
        const index = this.inventoryItems.findIndex(i => i.name === item.name);
        if (index !== -1) {
            this.transactions.push({ type: "delete", item: this.inventoryItems[index] });
            this.inventoryItems.splice(index, 1);
            console.log(`Item ${item.name} removed successfully.`);
        }
    }


    sell(item) {
        for (let invItem of this.inventoryItems) {
            if (invItem.name === item.name && invItem.quantity >= item.quantity) {
                invItem.quantity -= item.quantity;
                this.transactions.push({ type: "sale", item: invItem, quantity: item.quantity, date: new Date() });
                console.log(`Sold ${item.quantity} ${invItem.units} of ${invItem.name}`);
            }
        }
    }

    restock(item) {
        for (let invItem of this.inventoryItems) {
            if (invItem.name === item.name) {
                invItem.quantity += item.quantity;
                this.transactions.push({ type: "restock", item: invItem, quantity: item.quantity, date: new Date() });
                console.log(`Restocked ${item.quantity} ${invItem.units} of ${invItem.name}`);
            }
        }
    }

    search(name) {
        console.log(this.inventoryItems.filter(item =>
            [item.name, item.category, item.price].some(val =>
                val.toString().toLowerCase().includes(name.toLowerCase())
            )
        ));
    }

    viewInventory() {
        console.log("=== Inventory ===", this.inventoryItems);
    }

    exportAll() {
        console.log("CSV:\n" + ["Name,Category,Quantity,Price,Unit,AddedAt"].concat(
            this.inventoryItems.map(item =>
                [item.name, item.category, item.quantity, item.price, item.units, item.date].join(',')
            )
        ).join('\n'));
    }

    viewAllTransactions() {
        console.log("Transactions:\n", this.transactions);
    }

    viewItemAge() {
        console.log(this.inventoryItems.map(item =>
            `${item.name}: ${Math.floor((new Date() - new Date(item.date)) / (1000 * 60 * 60 * 24))}d`
        ).join('\n'));
    }

    importItems(items) {
        items.forEach(item => this.addItem(item));
    }

    doStuff(action, item) {
        switch (action) {
            case "add":
                this.addItem(item);
                break;
            case "edit":
                this.editItem(item.index, item);
                break;
            case "remove":
                this.removeItem(item.index);
                break;
            case "Sale":
                this.sell(item);
                break;
            case "Restock":
                this.restock(item);
                break;
            case "search":
                this.search(item.query);
                break;
            case "viewItem":
                this.viewInventory();
                break;
            case "exportAll":
                this.exportAll();
                break;
            case "viewAllTransactions":
                this.viewAllTransactions();
                break;
            case "viewItemAge":
                this.viewItemAge();
                break;
            case "Import":
                this.importItems(item.items);
                break;
            default:
                console.log("Unknown action:", action);
        }
    }
}

const store = new Store();
store.doStuff("add", { name: "laptop", category: "electronics", quantity: 12, price: 10, units: "pcs" });
store.doStuff("Sale", { name: "laptop", quantity: 7 });
