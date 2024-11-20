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
        removeFromCart(index, availableCourses) {
          const item = this.items[index];
          this.items.splice(index, 1);
          const course = availableCourses.find(c => c.name === item.name);
          if (course) {
            course.remaining++;
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
      sortBy: "", // for sorting criteria (name, price, etc.)
      sortOrder: "asc", // default to ascending order
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
        "India", "Nigeria", "China", "Japan", "Germany", "France",
      ],
    },
    computed: {
      filteredCourses() {
        let courses = this.availableCourses.filter(course =>
          course.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
  
        // Sorting logic
        if (this.sortBy) {
          courses.sort((a, b) => {
            let valueA = a[this.sortBy];
            let valueB = b[this.sortBy];
  
            // Handle string sorting (name, etc.)
            if (typeof valueA === "string") {
              valueA = valueA.toLowerCase();
              valueB = valueB.toLowerCase();
            }
  
            if (valueA < valueB) return this.sortOrder === "asc" ? -1 : 1;
            if (valueA > valueB) return this.sortOrder === "asc" ? 1 : -1;
            return 0;
          });
        }
  
        return courses;
      },
      isCartEmpty() {
        return this.cart.items.length === 0;
      },
      isFormComplete() {
        const form = this.form;
        return (
          /^[a-zA-Z]+$/.test(form.firstName) &&
          /^[a-zA-Z]+$/.test(form.lastName) &&
          /^[0-9]+$/.test(form.phone) &&
          form.email &&
          form.address &&
          form.dob &&
          form.nationality &&
          form.postalCode
        );
      },
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
      removeFromCart(index) {
        this.cart.removeFromCart(index, this.availableCourses);
      },
      checkout() {
        this.showForm = true;
        this.showCart = false;
      },
      submitForm() {
        // Collect the form data
        const orderData = {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          phone: this.form.phone,
          address: this.form.address,
          dob: this.form.dob,
          nationality: this.form.nationality,
          postalCode: this.form.postalCode,
          cartItems: this.cart.items, // Include the cart items if needed
        };
    
        // Send the data to the server using fetch
        fetch('http://localhost:3000/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData), // Convert the order data to JSON
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          alert('Your order has been placed!');
          this.showForm = false; // Close the form after submission
          this.cart.items = []; // Optionally clear the cart after the order is placed
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while placing your order.');
        });
      },
      searchCourses() {
        // Logic for the search button can be implemented here
      },
      sortCourses() {
        // Sorting logic based on `this.sortBy` and `this.sortOrder` can be implemented here
      },
    },
    async mounted() {
      await this.fetchCourses();
    },
  });
  