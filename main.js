


document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.querySelector('.navbar');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navbar.classList.toggle('show');
    });


    //This code adds functionality to toggle the mobile menu when the menu button
    //is clicked. It does this by toggling the active class on the mobile menu
    // button and the show class on the navigation menu. This provides a
    // better user experience by allowing users to open and close the mobile 
    //menu with a single click.






    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('show');
            mobileMenu.classList.remove('active');
        });
    });


    //This code ensures that when a navigation link within the mobile menu is 
    //clicked, the mobile menu is closed. It does this by removing the show class 
    //from the navbar element and the active class from the mobileMenu element. 
    //This provides a better user experience by automatically closing the mobile menu after a link is clicked.










    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

// This code enables smooth scrolling for anchor links on the page. 
// When an anchor link is clicked, it prevents the default jump behavior, 
//calculates the target position considering a fixed header offset, 
//and smoothly scrolls to the target section. 
//This provides a better user experience by making the navigation transitions smoother.







    // Image loading animation
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
}); 

// This JavaScript code selects all <img> elements on the page and adds an event listener 
//to each image to handle the load event. 
//When an image is fully loaded, it adds the loaded class to the image. 
//Additionally, if the image is already complete (cached), it immediately adds the loaded class.



