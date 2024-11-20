new Vue({
    el: "#app",
    data: {
        title: "Buy Tuition Online",
        availableCourses: [],
        cart: {
            items: [],
            addToCart(course) {
                if (course.remaining > 0) {
                    this.items.push({ image: course.image, name: course.name, details: course.details, price: course.price });
                    course.remaining--;
                }
            },
            removeFromCart(item, availableCourses) {
                const index = this.items.indexOf(item);
                if (index !== -1) {
                    this.items.splice(index, 1);
                    const course = availableCourses.find(c => c.name === item.name);
                    if (course) {
                        course.remaining++;
                    }
                }
            },
            getTotalPrice() {
                return this.items.reduce((total, item) => total + item.price, 0);
            },
            clear() {
                this.items = [];
            },
        },
        searchQuery: "",
        sortBy: "",
        showCart: false,
        showForm: false,
        form: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        nationality: "",
        postalCode: "",
        },
        countries: [
                    "United States", "Canada", "Mauritius", "United Kingdom", "Australia",
                    "India", "Nigeria", "China", "Japan", "Germany", "France"
        ],
    },
    computed: {
        filteredCourses() {
            return this.availableCourses.filter(course =>
                course.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        isCartEmpty() {
            return this.cart.items.length === 0;
        }
    },
    
    methods: {
        async fetchCourses() {
            try {
              const response = await fetch("http://localhost:3000/collections/lesson");
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              this.availableCourses = await response.json();
            } catch (error) {
              console.error("Error fetching courses:", error);
              alert("Failed to load courses. Please try again later.");
            }
        },
        addToCart(course) {
            this.cart.addToCart(course);
        },
        removeFromCart(item) {
            this.cart.removeFromCart(item, this.availableCourses);
        },
        checkout() {
            this.showForm = true;
            this.showCart = false;
        },
        submitForm() {
            alert("Checkout successful!");
            this.showForm = false;
            this.cart.clear();
        },
        searchCourses() {
        // Logic for the search button can be implemented here
        },
        sortCourses() {
        // Sorting logic based on `this.sortBy` can be implemented here
        },
    },
    async mounted() {
        await this.fetchCourses();
    },
});
    