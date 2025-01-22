const mockRecipes = [
  {
    author: "Elite",
    course: "Main Course",
    cuisine: "Cambodian",
    difficulty: "Medium",
    id: "1",
    rating: 4.8,
    popularity: 216,
    title: "Amok Fish",
    description: "A traditional Cambodian dish with coconut and spices.",
    image: require("@/assets/img/AmokFish.jpg"),
    ingredients: ["Fish", "Coconut Milk", "Spices"],
    instructions:
      "Steam the fish in banana leaves with coconut milk and spices.",
    calories: 500,
    protein: 20,
    carbohydrates: 50,
    fat: 10,
    prepTime: 15,
    cookingTime: 45,
    servings: 4,
    chefsTips: "Use fresh fish for best results.",
    type: "STEAMED",
    date: "June 20, 2019",
  },
  {
    author: "Piseth",
    course: "Main Course",
    cuisine: "Cambodian",
    difficulty: "Easy",
    id: "2",
    rating: 4.5,
    popularity: 196,
    title: "Beef Lok Lak",
    description: "A flavorful stir-fried beef dish everyone loves.",
    image: require("@/assets/img/LokLak.jpg"),
    ingredients: ["Beef", "Garlic", "Pepper"],
    instructions: "Stir-fry beef with garlic and pepper.",
    calories: 600,
    protein: 30,
    carbohydrates: 40,
    fat: 20,
    prepTime: 10,
    cookingTime: 20,
    servings: 2,
    chefsTips: "Marinate the beef for at least 30 minutes.",
    type: "STIR FRIED",
    date: "July 01, 2019",
  },
  {
    author: "Veasna",
    course: "Main Course",
    cuisine: "Cambodian",
    difficulty: "Easy",
    id: "3",
    rating: 4.6,
    popularity: 146,
    title: "Num Banh Chok",
    description: "Khmer noodles with green curry sauce.",
    image: require("@/assets/img/NBChok.jpg"),
    ingredients: [
      "Rice noodles",
      "Fish paste",
      "Lemongrass",
      "Kaffir lime leaves",
      "Bean sprouts",
      "Cucumber",
      "Banana flower",
    ],
    instructions:
      "Prepare the green curry sauce, cook the rice noodles, and serve with fresh vegetables.",
    calories: 450,
    protein: 15,
    carbohydrates: 65,
    fat: 12,
    prepTime: 20,
    cookingTime: 30,
    servings: 4,
    chefsTips: "Use fresh herbs for the most authentic flavor.",
    type: "NOODLES",
    date: "September 19, 2019",
  },
  {
    author: "Thida",
    course: "Main Course",
    cuisine: "Cambodian",
    difficulty: "Medium",
    id: "4",
    rating: 4.3,
    popularity: 186,
    title: "Kuy Teav",
    description: "A popular Cambodian noodle soup.",
    image: require("@/assets/img/KuyTeav.jpg"),
    ingredients: [
      "Rice noodles",
      "Pork bones",
      "Shrimp",
      "Green onions",
      "Bean sprouts",
      "Herbs",
    ],
    instructions:
      "Prepare bone broth, cook noodles, and assemble with toppings.",
    calories: 380,
    protein: 22,
    carbohydrates: 55,
    fat: 8,
    prepTime: 25,
    cookingTime: 120,
    servings: 6,
    chefsTips: "Simmer the broth for at least 2 hours for best flavor.",
    type: "SOUP",
    date: "May 23, 2020",
  },
  {
    author: "Sokha",
    course: "Main Course",
    cuisine: "Cambodian",
    difficulty: "Easy",
    id: "5",
    rating: 4.7,
    popularity: 116,
    title: "Bai Sach Chrouk",
    description: "Pork and rice dish with pickled vegetables.",
    image: require("@/assets/img/BSJruk.jpg"),
    ingredients: [
      "Pork belly",
      "Garlic",
      "Soy sauce",
      "Rice",
      "Pickled vegetables",
      "Cucumber",
    ],
    instructions:
      "Marinate pork, grill until caramelized, serve with rice and pickled vegetables.",
    calories: 550,
    protein: 25,
    carbohydrates: 45,
    fat: 28,
    prepTime: 30,
    cookingTime: 25,
    servings: 4,
    chefsTips: "Slice the pork thinly for faster cooking.",
    type: "GRILLED",
    date: "August 12, 2020",
  },
  {
    author: "Thida",
    course: "Main Course",
    cuisine: "Cambodian",
    difficulty: "Medium",
    id: "6",
    rating: 4.1,
    title: "Trey Chien Choun",
    description: "Deep-fried fish with a tangy tamarind sauce.",
    image: require("@/assets/img/TCChoun.jpg"),
    ingredients: [
      "Whole fish",
      "Tamarind",
      "Palm sugar",
      "Fish sauce",
      "Garlic",
      "Shallots",
    ],
    instructions:
      "Clean fish, deep fry until crispy, prepare tamarind sauce, and serve.",
    calories: 420,
    protein: 28,
    carbohydrates: 25,
    fat: 24,
    prepTime: 20,
    cookingTime: 35,
    servings: 4,
    chefsTips: "Score the fish before frying for even cooking.",
    type: "FRIED",
    date: "August 12, 2020",
  },
  {
    author: "Panha",
    course: "Dessert",
    cuisine: "Cambodian",
    difficulty: "Easy",
    id: "7",
    rating: 4.4,
    title: "Cha Houy Teuk",
    description: "A refreshing Cambodian dessert with coconut milk and jelly.",
    image: require("@/assets/img/CHTeuk.jpg"),
    ingredients: [
      "Coconut milk",
      "Agar agar",
      "Palm sugar",
      "Pandan leaves",
      "Ice",
    ],
    instructions:
      "Prepare jelly, mix with coconut milk and palm sugar, serve chilled.",
    calories: 280,
    protein: 3,
    carbohydrates: 35,
    fat: 15,
    prepTime: 15,
    cookingTime: 20,
    servings: 6,
    chefsTips: "Use fresh coconut milk for best results.",
    type: "DESSERT",
    date: "October 23, 2020",
  },
  {
    author: "Raksa",
    course: "Appetizer",
    cuisine: "Cambodian",
    difficulty: "Medium",
    id: "8",
    rating: 4.5,
    title: "Prahok Ktis",
    description: "A spicy dip made with fermented fish paste.",
    image: require("@/assets/img/PHKtis.jpg"),
    ingredients: [
      "Prahok",
      "Pork mince",
      "Coconut milk",
      "Kroeung paste",
      "Chili",
    ],
    instructions:
      "Cook prahok with pork and coconut milk, season with kroeung paste.",
    calories: 320,
    protein: 18,
    carbohydrates: 15,
    fat: 22,
    prepTime: 15,
    cookingTime: 25,
    servings: 6,
    chefsTips: "Adjust the amount of prahok to taste.",
    type: "DIP",
    date: "October 31, 2021",
  },
  {
    author: "Elite",
    course: "Appetizer",
    cuisine: "Cambodian",
    difficulty: "Hard",
    id: "9",
    rating: 4.2,
    title: "Samlor Korko",
    description: "A hearty soup with vegetables and fish.",
    image: require("@/assets/img/SKKo.jpg"),
    ingredients: [
      "Fish",
      "Prahok",
      "Mixed vegetables",
      "Kroeung paste",
      "Rice",
    ],
    instructions: "Prepare broth, add vegetables and fish, season with prahok.",
    calories: 380,
    protein: 24,
    carbohydrates: 45,
    fat: 12,
    prepTime: 30,
    cookingTime: 60,
    servings: 8,
    chefsTips: "Use a variety of seasonal vegetables.",
    type: "SOUP",
    date: "November 09, 2021",
  },
  {
    author: "Youim",
    course: "Appetizer",
    cuisine: "Italian",
    difficulty: "Easy",
    id: "10",
    rating: 4,
    title: "Bruschetta",
    description:
      "Toasted bread topped with a fresh mix of tomatoes, basil, and garlic drizzled with olive oil and balsamic glaze.",
    image: require("@/assets/img/BSCHTA.jpg"),
    ingredients: [
      "Baguette",
      "Tomatoes",
      "Fresh basil",
      "Garlic",
      "Olive oil",
      "Balsamic glaze",
      "Salt",
      "Pepper",
    ],
    instructions:
      "Slice the baguette and toast the slices. In a bowl, mix diced tomatoes, chopped basil, minced garlic, olive oil, salt, and pepper. Top each toasted slice with the tomato mixture and drizzle with balsamic glaze.",
    calories: 150,
    protein: 3,
    carbohydrates: 18,
    fat: 8,
    prepTime: 15,
    cookingTime: 10,
    servings: 4,
    chefsTips:
      "Rub the toasted bread with a clove of garlic for extra flavor before adding the toppings.",
    type: "TOASTED",
    date: "December 25, 2021",
  },
  {
    author: "Youim",
    course: "Appetizer",
    cuisine: "Cambodian",
    difficulty: "Easy",
    id: "11",
    rating: 4.9,
    title: "Bok Lahong",
    description: "Green papaya salad with peanuts and dried shrimp.",
    image: require("@/assets/img/BLHong.jpg"),
    ingredients: [
      "Green papaya",
      "Dried shrimp",
      "Peanuts",
      "Lime",
      "Fish sauce",
      "Chili",
    ],
    instructions:
      "Shred papaya, pound ingredients together, mix with dressing.",
    calories: 220,
    protein: 12,
    carbohydrates: 25,
    fat: 10,
    prepTime: 20,
    cookingTime: 10,
    servings: 4,
    chefsTips: "Use unripe papaya for the right texture.",
    type: "SALAD",
    date: "January 01, 2022",
  },
  {
    author: "Tey",
    course: "Dessert",
    cuisine: "Cambodian",
    difficulty: "Medium",
    id: "12",
    rating: 4.3,
    title: "Kralan",
    description: "Bamboo sticky rice cooked in a bamboo tube.",
    image: require("@/assets/img/Kralan.jpg"),
    ingredients: [
      "Sticky rice",
      "Black beans",
      "Coconut milk",
      "Sugar",
      "Salt",
      "Bamboo tubes",
    ],
    instructions: "Mix ingredients, stuff in bamboo, roast over fire.",
    calories: 320,
    protein: 6,
    carbohydrates: 58,
    fat: 8,
    prepTime: 30,
    cookingTime: 45,
    servings: 6,
    chefsTips: "Soak the rice overnight for best results.",
    type: "DESSERT",
    date: "February 14, 2022",
  },
  {
    author: "Sa",
    course: "Dessert",
    cuisine: "Cambodian",
    difficulty: "Medium",
    id: "13",
    rating: 4.1,
    title: "Sach Ko Ang",
    description:
      "Grilled beef skewers with a tangy lime and pepper dipping sauce.",
    image: require("@/assets/img/SKAng.jpg"),
    ingredients: [
      "Beef",
      "Lemongrass",
      "Garlic",
      "Lime",
      "Black pepper",
      "Fish sauce",
    ],
    instructions: "Marinate beef, skewer, grill, serve with dipping sauce.",
    calories: 380,
    protein: 32,
    carbohydrates: 8,
    fat: 24,
    prepTime: 20,
    cookingTime: 15,
    servings: 4,
    chefsTips: "Use tender cuts of beef for best results.",
    type: "GRILLED",
    date: "February 15, 2022",
  },
  {
    author: "Piseth",
    course: "Dessert",
    cuisine: "Thai",
    difficulty: "Medium",
    id: "14",
    rating: 4.4,
    title: "Mango Sticky Rice",
    description:
      "Sweet sticky rice topped with fresh mango slices and drizzled with coconut milk.",
    image: require("@/assets/img/MSRice.jpg"),
    ingredients: [
      "Glutinous rice",
      "Fresh mango",
      "Coconut milk",
      "Sugar",
      "Salt",
      "Sesame seeds",
    ],
    instructions:
      "Cook the glutinous rice. In a saucepan, heat coconut milk, sugar, and salt until dissolved. Pour the mixture over the cooked rice and mix well. Let it sit for 15 minutes. Serve the sticky rice with fresh mango slices and a drizzle of the remaining coconut milk. Sprinkle with sesame seeds.",
    calories: 320,
    protein: 5,
    carbohydrates: 70,
    fat: 7,
    prepTime: 20,
    cookingTime: 20,
    servings: 4,
    chefsTips: "Use ripe and sweet mangoes for the best flavor.",
    type: "SWEET",
    date: "March 01, 2022",
  },
  {
    author: "Veasna",
    course: "Main Course",
    cuisine: "Cambodian",
    difficulty: "Medium",
    id: "15",
    rating: 4.6,
    title: "Trey Chha Kreung",
    description: "Stir-fried fish with lemongrass and kroeung.",
    image: require("@/assets/img/TCKR.jpg"),
    ingredients: [
      "Fish fillet",
      "Kroeung paste",
      "Lemongrass",
      "Kaffir lime leaves",
      "Chili",
    ],
    instructions: "Cut fish, stir-fry with kroeung and herbs.",
    calories: 350,
    protein: 28,
    carbohydrates: 12,
    fat: 22,
    prepTime: 15,
    cookingTime: 20,
    servings: 4,
    chefsTips: "Don't overcook the fish to maintain moisture.",
    type: "STIR FRIED",
    date: "March 15, 2022",
  },
  {
    author: "Sa",
    course: "Dessert",
    cuisine: "Cambodian",
    difficulty: "Easy",
    id: "16",
    rating: 3.8,
    title: "Num Pang Sach",
    description: "Lightly flamed bread with meat and veggie fillings.",
    image: require("@/assets/img/NPS.jpg"),
    ingredients: [
      "Baguette",
      "Pork",
      "Cucumber",
      "Carrots",
      "Cilantro",
      "Chili mayo",
    ],
    instructions: "Toast bread, layer with meat and vegetables, add sauce.",
    calories: 480,
    protein: 22,
    carbohydrates: 58,
    fat: 18,
    prepTime: 15,
    cookingTime: 10,
    servings: 2,
    chefsTips: "Toast the bread until crispy outside but soft inside.",
    type: "SANDWICH",
    date: "April 01, 2022",
  },
  {
    author: "Panha",
    course: "Dessert",
    cuisine: "Cambodian",
    difficulty: "Easy",
    id: "17",
    rating: 4.1,
    title: "Num Pang Siv Mai",
    description: "Num Pang Sach but with Siv Mai sauce to dip.",
    image: require("@/assets/img/NPSM.jpg"),
    ingredients: [
      "Baguette",
      "Ground pork",
      "Shrimp",
      "Siv Mai sauce",
      "Green onions",
      "Garlic",
    ],
    instructions:
      "Prepare Siv Mai filling, toast bread, assemble sandwich, serve with dipping sauce.",
    calories: 520,
    protein: 25,
    carbohydrates: 55,
    fat: 22,
    prepTime: 20,
    cookingTime: 15,
    servings: 2,
    chefsTips: "Make extra Siv Mai sauce for dipping.",
    type: "SANDWICH",
    date: "April 15, 2022",
  },
  {
    author: "HuyKheang",
    course: "Dessert",
    cuisine: "Cambodian",
    difficulty: "Hard",
    id: "18",
    rating: 4.4,
    title: "Somlor Machu Kroeung",
    description:
      "A tangy Cambodian soup made with tamarind, lemongrass, and fish.",
    image: require("@/assets/img/SMKR.jpg"),
    ingredients: [
      "Fish",
      "Tamarind",
      "Lemongrass",
      "Pineapple",
      "Water spinach",
      "Kroeung paste",
    ],
    instructions:
      "Prepare tamarind broth, cook fish and vegetables, season to taste.",
    calories: 310,
    protein: 22,
    carbohydrates: 35,
    fat: 12,
    prepTime: 25,
    cookingTime: 40,
    servings: 6,
    chefsTips: "Balance the sour and sweet flavors carefully.",
    type: "SOUP",
    date: "May 01, 2022",
  },
  {
    author: "HuyKheang",
    course: "Dessert",
    cuisine: "Cambodian",
    difficulty: "Medium",
    id: "19",
    rating: 4.5,
    title: "Banana Blossom Salad",
    description:
      "A refreshing salad made with banana blossoms, herbs, and a tangy dressing.",
    image: require("@/assets/img/BBSalad.jpg"),
    ingredients: [
      "Banana blossom",
      "Chicken",
      "Mint",
      "Basil",
      "Fish sauce",
      "Lime juice",
    ],
    instructions:
      "Slice banana blossom, cook chicken, mix with herbs and dressing.",
    calories: 280,
    protein: 18,
    carbohydrates: 25,
    fat: 15,
    prepTime: 30,
    cookingTime: 20,
    servings: 4,
    chefsTips: "Soak banana blossom in lemon water to prevent browning.",
    type: "SALAD",
    date: "July 23, 2022",
  },
  {
    author: "Elite",
    course: "Dessert",
    cuisine: "Cambodian",
    difficulty: "Easy",
    id: "20",
    rating: 4.3,
    title: "Khmer Scallion Pancakes",
    description:
      "Crispy pancakes with scallions, perfect as an appetizer or snack.",
    image: require("@/assets/img/KSPC.jpg"),
    ingredients: [
      "Rice flour",
      "Scallions",
      "Coconut milk",
      "Turmeric",
      "Bean sprouts",
      "Shrimp",
    ],
    instructions:
      "Mix batter, add scallions, fry until crispy, serve with dipping sauce.",
    calories: 350,
    protein: 12,
    carbohydrates: 42,
    fat: 18,
    prepTime: 15,
    cookingTime: 20,
    servings: 4,
    chefsTips: "Make sure the pan is very hot before adding the batter.",
    type: "FRIED",
    date: "September 01, 2024",
  },
];

export const fetchRecipe = async (recipeId) => {
  return mockRecipes.find((recipe) => recipe.id === recipeId);
};

export const getTrendingRecipes = (limit = 4) => {
  return mockRecipes
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
    .map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      rating: recipe.rating,
    }));
};
