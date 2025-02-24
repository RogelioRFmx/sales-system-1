<template>
    <div class="create-order-container">
        <h1>Create Order</h1>
        <form @submit.prevent="submitOrder">
            <input v-model="newOrder.orderNumber" placeholder="Order Number" class="input-style" />

            <table class="product-selection-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Add</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in avaialbleProducts" :key="product.id">
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                        <td>
                            <input v-model="product.quantity" min="0" placeholder="Quantity" type="number" class="input-style" />
                        </td>
                        <td>
                            <button @click="addProductToOrder(product)" class="add-button" :disabled="isProductAdded(product)">Add</button>
                        </td>

                    </tr>
                </tbody>
            </table>
            <h2>Selected Products</h2>
            <ul>
                <li v-for="product in newOrder.products" :key="product.id">
                    {{ product.name }} - Quantity: {{ product.quantity }} - Total: {{ product.total }}
                    <button @click="removeProductFromOrder(product)" class="btn-remove-from-order">Remove</button>
                </li>
            </ul>
            <p><strong>Total Order: ${{ newOrder.total }}</strong></p>
            <button type="submit" class="btn-submit-order">Submit Order</button>
        </form>
    </div>
</template>

<script>
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default {
    data() {
        return {
            avaialbleProducts: [],
            newOrder: {
                orderNumber: '',
                products: [],
                total: 0
            }
        };
    },
    async created() {
        await this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            const querySnapshot = await getDocs(collection(db, 'products'));
            this.avaialbleProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), quantity: 0 }));
        },
        // Removed duplicate submitOrder method
        addProductToOrder(product) {
            if (product.quantity <= 0) {
            alert('Please enter a valid quantity.');
            return;
            }
            const productTotal = product.price * product.quantity;
            const productToAdd = { ...product, total: productTotal };
            this.newOrder.products.push(productToAdd);
            this.calculateOrderTotal();
        },
        calculateOrderTotal() {
            this.newOrder.total = this.newOrder.products.reduce((sum, product) => sum + product.total, 0);
        },
        removeProductFromOrder(product) {
            this.newOrder.products.splice(product.id, 1);
            this.calculatedOrderTotal();
        },
        isProductAdded(product) {
            return this.newOrder.products.some(p => p.id === product.id);
        },
        async submitOrder() {
            if(this.newOrder.products.length === 0) {
                alert('Please add products to the order.');
                return;
            }
            await addDoc(collection(db, 'orders'), this.newOrder);
            alert('Order submitted successfully.');
            this.newOrder = { orderNumber: '', products: [], total: 0 };
            await this.fetchProducts();
        }
        
    }
}
</script>

<style scoped>
.create-order-container {
    padding: 20px;
}
.input-style {
    padding: 5px;
    margin: 5px 0;
    width: 100%;
    box-sizing: border-box;
}

.product-selection-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

.product-selection-table th, .product-selection-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.add-button, .btn-remove-from-order, .btn-submit-order {
    padding: 5px 10px;
    margin: 5px;
    cursor: pointer;
}

.add-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

h1, h2 {
    margin: 10px 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin: 5px 0;
}
</style>