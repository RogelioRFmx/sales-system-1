<template>
    <div class="product-list-container">
        <h1>Product List</h1>
        <table>
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.description }}</td>
                    <td>
                        <button class="btnEdit" @click="editProduct(product.id)">Edit</button>
                        <button class="btnDelete" @click="deleteProduct(product.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="showAddProduct = true">Add Product</button>
        <div class="productForm" v-if="showAddProduct || selectedProduct" >
            <input v-model="productForm.name" placeholder="Product Name" />
            <input v-model="productForm.price" placeholder="Price" />
            <textarea v-model="productForm.description" placeholder="Description"></textarea>
            <button @click="addProduct">Add</button>
            <button @click="updateProduct">Update</button>
            <button @click="cancel">Cancel</button>


        </div>
    </div>
</template>

<script>
    import { db } from '../firebaseConfig';
    import { collection, addDoc, getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';

    export default {
        name: 'ProductList',
        data() {
            return {
                products: [],
                showAddProduct: false,
                selectedProduct: null,
                productForm: {
                    name: '',
                    price: 0,
                    description: ''
                }
            };
        },
        async created() {
            await this.fetchProducts();
        },
        methods: {
            async fetchProducts() {
                const querySnapshot = await getDocs(collection(db, 'products'));
                this.products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                .sort((a, b) => a.id.localeCompare(b.id));
            },
            editProduct(id) {
                const product = this.products.find(product => product.id === id);
                this.productForm = { ...product };
                this.selectedProduct = id;
                this.showAddProduct = true;
            },
        }
    }

</script>