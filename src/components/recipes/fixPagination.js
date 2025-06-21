// This file contains the code that fixes the pagination issue
// Add this watcher in RecipeList.vue setup() function

// Add watcher for page changes to trigger new data fetch
watch(currentPage, () => {
    fetchRecipeData();
});
