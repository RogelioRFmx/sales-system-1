<template>
    <div class="orders-list-containers">
        <h1> Order List</h1>
        <table class="orders-table">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.productName }}</td>
                    <td>{{ order.price }}</td>
                    <td>{{ order.quantity }}</td>
                    <td>{{ order.total }}</td>
                    <td>
                        <button class="btnEdit" @click="editOrder(order.id)">Edit</button>
                        <button class="btnDelete" @click="deleteOrder(order.id)">Delete</button>
                    </td>
                </tr>
            </tbody>

        </table>
        <router-link to="/create-order" class="add-order-link">Add Order</router-link>

    </div>
</template>

<script>
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

export default {
    data() {
        return {
            orders: [],            
        };
    },
    async created() {
        await this.fetchOrders();
    },
    methods: {
        async fetchOrders() {
            const querySnapshot = await getDocs(collection(db, 'orders'));
            this.orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        },
        async deleteOrder(id) {
            await deleteDoc(doc(db, 'orders', id));
            await this.fetchOrders();
        },
        editOrder(id) {
            this.selectedOrder = this.orders.find(order => order.id === id);
        },
        
    }
}

</script>

<style scoped>
.orders-list-containers {
    padding: 20px;
}

.orders-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.orders-table th, .orders-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.orders-table th {
    background-color: #f2f2f2;
}

.btnEdit, .btnDelete {
    margin-right: 5px;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
}

.btnEdit {
    background-color: #4CAF50;
    color: white;
}

.btnDelete {
    background-color: #f44336;
    color: white;
}

.add-order-link {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 15px;
    background-color: #008CBA;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}
</style>