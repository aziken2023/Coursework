// Define the Course class
export class Course {
  constructor(name, price, remaining, details, location, rating, image) {
    this.name = name;
    this.price = price;
    this.remaining = remaining;
    this.details = details;
    this.location = location;
    this.rating = rating;
    this.image = image; // New property for image
  }
}

// Define the Cart class
export class Cart {
  constructor() {
    this.items = [];
  }

  addToCart(course) {
    if (course.remaining > 0) {
      this.items.push({ name: course.name, price: course.price });
      course.remaining--;
    }
  }

  removeFromCart(item, availableCourses) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      const course = availableCourses.find(c => c.name === item.name);
      if (course) {
        course.remaining++;
      }
    }
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  checkout() {
    alert(`Thank you for your purchase! Total: £${this.getTotalPrice()}`);
    this.items = [];
  }
}

// Create a list of available courses
export const availableCourses = [
  new Course("Math", 90, 10, "Learn advanced mathematical concepts.", "London", 4, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU6IytLppQoeoLy-TpLAUuJr0jwI21Q3GXug&s"),
  new Course("Science", 100, 10, "Explore physics, chemistry, and biology.", "Manchester", 3, "https://img.freepik.com/free-vector/colorful-science-objects-icons-vector-set_1308-131708.jpg?w=360"),
  new Course("History", 110, 10, "Understand key historical events.", "Birmingham", 5, "https://www.euroschoolindia.com/wp-content/uploads/2023/07/how-to-learn-history.jpg"),
  new Course("English", 120, 10, "Improve your reading and writing skills.", "Edinburgh", 4, "https://www.fpacademy.co.in/blog/wp-content/uploads/2022/09/How-to-Learn-English-Speaking-at-Home-960x540-1.jpg"),
  new Course("Computer Science", 130, 10, "Master programming languages.", "Bristol", 5, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRApVv2baGsCsW3O-KeaWxJEEsMdyNnAsdUYQ&s"),
  new Course("IET", 140, 10, "Explore the Engineering world.", "Nottingham", 4, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVBhIYUai2Xfb2cTxeEI3KIpLY-b4WNGG9cA&s"),
  new Course("Debate Club", 150, 10, "Show your talents in our Debate society.", "Liverpool", 3, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZD-Wll7Zqy7NWRNeJuIoIqSEz6arK7hS1dA&s"),
  new Course("Economics", 160, 10, "Increase your knowledge of the economic world.", "Cardiff", 5, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNfF1cl0B_Elwhcqbk5jrLaQz1LemQ7Mgu5w&s"),
  new Course("Fishing Club", 170, 10, "Enjoy fishing in our beautiful lakes and ponds.", "Glasgow", 4, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdQlrB26BSAj6nEI8wscI1Csza1YwePqtUSA&s"),
  new Course("Astronomy", 180, 10, "Learn about our solar system in our astronomy classes.", "Leicester", 5, "https://www.astronomy.com/uploads/2023/09/Astronomy-Home-Page-Image.png"),
];
