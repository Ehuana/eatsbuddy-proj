<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="input-group w-50">
                <input type="text" v-model="searchQuery" class="form-control" placeholder="Search for recipes...">
            </div>
            <select v-model="sortOption" class="form-select w-auto">
                <option value="latest">Sort by Latest</option>
                <option value="popular">Sort by Popular</option>
                <option value="rating">Sort by Rating</option>
            </select>
        </div>
        <div class="row g-4">
            <RecipeItem v-for="recipe in filteredRecipes" :key="recipe.id" :recipe="recipe" />
        </div>
        <nav aria-label="Page navigation" class="mt-4">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">&laquo;</a>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">&raquo;</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
import RecipeItem from './RecipeItem.vue';

export default {
    components: {
        RecipeItem,
    },
    data() {
        return {
            searchQuery: '',
            sortOption: 'latest',
            currentPage: 1,
            recipes: [
                { id: 1, title: 'Amok Fish', description: 'A traditional Cambodian dish with coconut and spices.', image: require('@/assets/img/AmokFish.jpg'), popularity: 5, rating: 4.8, category: 'Main Course', author: 'Elite', date: 'June 20, 2019', authorImage: require('@/assets/img/person.png') },
                { id: 2, title: 'Beef Lok Lak', description: 'A flavorful stir-fried beef dish everyone loves.', image: require('@/assets/img/LokLak.jpg'), popularity: 4, rating: 4.5, category: 'Main Course', author: 'Piseth', date: 'July 01, 2019', authorImage: require('@/assets/img/person.png') },
                { id: 3, title: 'Num Banh Chok', description: 'Khmer noodles with green curry sauce.', image: require('@/assets/img/NBChok.jpg'), popularity: 3, rating: 4.6, category: 'Main Course', author: 'Veasna', date: 'September 19, 2019', authorImage: require('@/assets/img/person.png') },
                { id: 4, title: 'Kuy Teav', description: 'A popular Cambodian noodle soup.', image: require('@/assets/img/KuyTeav.jpg'), popularity: 2, rating: 4.3, category: 'Main Course', author: 'Thida', date: 'May 23, 2020', authorImage: require('@/assets/img/person.png') },
                { id: 5, title: 'Bai Sach Chrouk', description: 'Pork and rice dish with pickled vegetables.', image: require('@/assets/img/BSJruk.jpg'), popularity: 5, rating: 4.7, category: 'Main Course', author: 'Sokha', date: 'August 12, 2020', authorImage: require('@/assets/img/person.png') },
                { id: 6, title: 'Trey Chien Choun', description: 'Deep-fried fish with a tangy tamarind sauce.', image: require('@/assets/img/TCChoun.jpg'), popularity: 1, rating: 4.1, category: 'Main Course', author: 'Thida', date: 'August 12, 2020', authorImage: require('@/assets/img/person.png') },
                { id: 7, title: 'Cha Houy Teuk', description: 'A refreshing Cambodian dessert with coconut milk and jelly.', image: require('@/assets/img/CHTeuk.jpg'), popularity: 4, rating: 4.4, category: 'Dessert', author: 'Panha', date: 'October 23, 2020', authorImage: require('@/assets/img/person.png') },
                { id: 8, title: 'Prahok Ktis', description: 'A spicy dip made with fermented fish paste.', image: require('@/assets/img/PHKtis.jpg'), popularity: 3, rating: 4.5, category: 'Appetizer', author: 'Raksa', date: 'October 31, 2021', authorImage: require('@/assets/img/person.png') },
                { id: 9, title: 'Samlor Korko', description: 'A hearty soup with vegetables and fish.', image: require('@/assets/img/SKKo.jpg'), popularity: 2, rating: 4.2, category: 'Appetizer', author: 'Elite', date: 'November 09, 2021', authorImage: require('@/assets/img/person.png') },
                { id: 10, title: 'Bruschetta', description: 'Toasted bread topped with a fresh mix of vegies drizzled with olive oil and balsamic glaze.', image: require('@/assets/img/BSCHTA.jpg'), popularity: 1, rating: 4.0, category: 'Appetizer', author: 'Youim', date: 'December 25, 2021', authorImage: require('@/assets/img/person.png') },
                { id: 11, title: 'Bok Lahong', description: 'Green papaya salad with peanuts and dried shrimp.', image: require('@/assets/img/BLHong.jpg'), popularity: 5, rating: 4.9, category: 'Appetizer', author: 'Youim', date: 'January 01, 2022', authorImage: require('@/assets/img/person.png') },
                { id: 12, title: 'Kralan', description: 'Bamboo sticky rice cooked in a bamboo tube.', image: require('@/assets/img/Kralan.jpg'), popularity: 4, rating: 4.3, category: 'Dessert', author: 'Tey', date: 'February 14, 2022', authorImage: require('@/assets/img/person.png') },
                { id: 13, title: 'Sach Ko Ang', description: 'Grilled beef skewers with a tangy lime and pepper dipping sauce.', image: require('@/assets/img/SKAng.jpg'), popularity: 3, rating: 4.1, category: 'Dessert', author: 'Sa', date: 'February 15, 2022', authorImage: require('@/assets/img/person.png') },
                { id: 14, title: 'Mango Sticky Rice', description: 'Sweet sticky rice topped with fresh mango slices and drizzled with coconut milk.', image: require('@/assets/img/MSRice.jpg'), popularity: 2, rating: 4.4, category: 'Dessert', author: 'Piseth', date: 'March 01, 2022', authorImage: require('@/assets/img/person.png') },
                { id: 15, title: 'Trey Chha Kreung', description: 'Stir-fried fish with lemongrass and kroeung.', image: require('@/assets/img/TCKR.jpg'), popularity: 5, rating: 4.6, category: 'Main Course', author: 'Veasna', date: 'March 15, 2022', authorImage: require('@/assets/img/person.png') },
                { id: 16, title: 'Num Pang Sach', description: 'Lightly flamed bread with meat and veggie fillings.', image: require('@/assets/img/NPS.jpg'), popularity: 5, rating: 3.8, category: 'Dessert', author: 'Sa', date: 'April 01, 2022', authorImage: require('@/assets/img/person.png') },
                { id: 17, title: 'Num Pang Siv Mai', description: 'Num Pang Sach but with Siv Mai sauce to dip.', image: require('@/assets/img/NPSM.jpg'), popularity: 3, rating: 4.1, category: 'Dessert', author: 'Panha', date: 'April 15, 2022', authorImage: require('@/assets/img/person.png') },
                { id: 18, title: 'Somlor Machu Kroeung', description: 'A tangy Cambodian soup made with tamarind, lemongrass, and fish.', image: require('@/assets/img/SMKR.jpg'), popularity: 4, rating: 4.4, category: 'Dessert', author: 'HuyKheang', date: 'May 01, 2022', authorImage: require('@/assets/img/person.png') },
                { id: 19, title: 'Banana Blossom Salad', description: 'A refreshing salad made with banana blossoms, herbs, and a tangy dressing.', image: require('@/assets/img/BBSalad.jpg'), popularity: 3, rating: 4.5, category: 'Dessert', author: 'HuyKheang', date: 'July 23, 2022', authorImage: require('@/assets/img/person.png')  },
                { id: 20, title: 'Khmer Scallion Pancakes', description: 'Crispy pancakes with scallions, perfect as an appetizer or snack.', image: require('@/assets/img/KSPC.jpg'), popularity: 2, rating: 4.3, category: 'Dessert', author: 'Elite', date: 'September 01, 2024', authorImage: require('@/assets/img/person.png') },
            ]
        };
    },
    computed: {
        filteredRecipes() {
            let filtered = this.recipes.filter(recipe => recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
            if (this.sortOption === 'latest') {
                filtered = filtered.reverse();
            } else if (this.sortOption === 'popular') {
                filtered = filtered.sort((a, b) => b.popularity - a.popularity);
            } else if (this.sortOption === 'rating') {
                filtered = filtered.sort((a, b) => b.rating - a.rating);
            }

            const start = (this.currentPage - 1) * 9;
            const end = start + 9;
            return filtered.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.recipes.length / 9);
        }
    },
    methods: {
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        searchRecipes() {
            this.currentPage = 1;
        }
    },
    mounted() {
        AOS.init();
    }
};
</script>