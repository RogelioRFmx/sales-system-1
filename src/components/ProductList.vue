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
                const querySnapshot = await getDoc(collection(db, 'products'));
                this.products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                .sort((a, b) => a.name.localeCompare(b.name));
            },
            editProduct(id) {
                const product = this.products.find(product => product.id === id);
                this.productForm = { ...product };
                this.selectedProduct = id;
                this.showAddProduct = true;
            },
            async deleteProduct(id) {
                await deleteDoc(doc(db, 'products', id));
                await this.fetchProducts();
            },
            async submitProduct() {
                if (this.selectedProduct) {
                    await updateDoc(doc(db, 'products', this.selectedProduct), this.productForm);
                } else {
                    await addDoc(collection(db, 'products'), this.productForm);
                }
                this.cancel();
                await this.fetchProducts();
            },
            cancel() {
                this.showAddProduct = false;
                this.selectedProduct = null;
                this.productForm = {
                    name: '',
                    price: 0,
                    description: ''
                };
            }
        }
    }

</script>

<style scoped>
.product-list-container {
    padding: 20px;
    max-width: 800px;
    margin: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f4f4f4;
}

button {
    margin-right: 5px;
    padding: 5px 10px;
    cursor: pointer;
}

.productForm {
    margin-top: 20px;
}

.productForm input, .productForm textarea {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

</style>