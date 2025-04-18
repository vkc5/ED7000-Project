document.addEventListener('DOMContentLoaded', function () {
    const readMoreLinks = document.querySelectorAll('.read-more');
    const popupModal = document.getElementById('popup-modal');
    const ratingModal = document.getElementById('rating-modal');
    const thankYouMessage = document.getElementById('thank-you-message');
    const popupInfo = document.getElementById('popup-info');
    const popupImage = document.getElementById('popup-image');
    const closeBtns = document.querySelectorAll('.close');
    const submitFeedback = document.getElementById('submit-feedback');
    const feedbackTextarea = document.getElementById('feedback');
    const stars = document.querySelectorAll('.rating-stars i');
    const feedbackError = document.getElementById('feedback-error');

    // Added variables for filter 
    const filterIcon = document.getElementById('filter-icon');
    const filterPanel = document.getElementById('filter-panel');
    const priceFilter = document.getElementById('price-filter');
    const priceOutput = document.getElementById('price-output');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');  // Reset Button
    const locationFilter = document.getElementById('location-filter');
    const collegeGrid = document.querySelector('.college-grid');

    const maxPrice = 10000;  // Assuming 18,000 BD is the max value
    priceFilter.max = maxPrice;
    priceFilter.value = maxPrice; // Set the initial value to max
    priceOutput.textContent = `BD ${maxPrice}`; // Display initial price

    let hasRated = false; // To track if a star rating was made

    const universityData = {
        asu: {
            name: "CCNA",
            location: "Manama",
            telephone: "77900808",
            fees: 850,
            Level: "Intermediate",
            workingHours: "10 hours per week",
            website: "https://trainme.bh/cisco-certified-network-associate-ccna/",
            image: "../image/UniversityImages/Networking1.jpg"
        },
        bu: {
            name: "CompTIA Network+",
            location: "Online",
            telephone: "-",
            fees: 680,
            Level: "Beginner",
            workingHours: "8 hours per week",
            website: "https://www.comptia.org/certifications/network",
            image: "../image/UniversityImages/Networking2.png"
        },
        rcsi: {
            name: "Network Engineer Program",
            location: "Seef",
            telephone: "17816357",
            fees: 2500,
            Level: "Intermediate",
            workingHours: "12 weeks",
            website: "https://bahrain.generalassemb.ly/program-catalog",
            image: "../image/UniversityImages/Networking3.jpg"
        },
        bp: {
            name: "AWS Cloud Practitioner",
            location: "Adliya",
            telephone: "17746746",
            fees: 1140,
            Level: "Beginner",
            workingHours: "30 hours",
            website: "https://thinksmartgulf.com/courses/aws-cloud-practitioner/",
            image: "../image/UniversityImages/Networking4.png"
        },
        uob: {
            name: "CCNA (Routing & Switching)",
            location: "Online",
            telephone: "17535393",
            fees: 1700,
            Level: "Intermediate",
            workingHours: "80 Hours",
            website: "https://trainingplusbh.com/courses/ccna-routing-switching/",
            image: "../image/UniversityImages/Networking5.jpg"
        },
        bibf: {
            name: "Networking Basics (Cisco)",
            location: "Online",
            telephone: "-",
            fees: 0,
            Level: "Beginner",
            workingHours: "5 hours per week",
            website: "https://skillsforall.com/course/networking-basics",
            image: "../image/UniversityImages/Networking6.png"
        }
    };

    // Populate location dropdown dynamically
    function populateLocationFilter(data) {
        const uniqueLocations = [...new Set(Object.values(data).map(college => college.location))]; // Get unique locations
        uniqueLocations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationFilter.appendChild(option); // Add each location as an option
        });
    }

    // Function to render filtered colleges
    function renderColleges(filteredData) {
        collegeGrid.innerHTML = ''; // Clear existing colleges

        Object.keys(filteredData).forEach((key) => {
            const college = filteredData[key];
            const collegeItem = document.createElement('div');
            collegeItem.classList.add('college-item');
            collegeItem.setAttribute('data-location', college.location);
            collegeItem.setAttribute('data-fees', parseFloat(college.fees));
            collegeItem.setAttribute('data-type', college.Level);

            collegeItem.innerHTML = `
                <img src="${college.image}" alt="${college.name}">
                <h3>${college.name}</h3>
                <a href="#" class="read-more" data-info="${key}">Read More</a>
            `;
            collegeGrid.appendChild(collegeItem);
        });

        // Reassign "Read More" event listeners to the dynamically added college items
        const newReadMoreLinks = document.querySelectorAll('.read-more');
        newReadMoreLinks.forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                popupModal.classList.remove('move-left');
                const infoKey = link.getAttribute('data-info');
                const data = universityData[infoKey];
                if (data) {
                    popupImage.src = data.image;
                    popupInfo.innerHTML = `
                        <h2>Information Card</h2>
                        <p><strong>Location:</strong> ${data.location}</p>
                        <p><strong>Telephone:</strong> ${data.telephone}</p>
                        <p><strong>Level:</strong> ${data.Level}</p>
                        <p><strong>Fees:</strong>  ${data.fees} BD</p>
                        <p><strong>Duration:</strong> ${data.workingHours}</p>
                        <p><strong>Link to Website:</strong> <a href="${data.website}" target="_blank">${data.website}</a></p>
                        <a href="#" class="rate-me-button" id="rate-me-button">Rate Me</a>
                    `;
                    popupModal.style.display = 'flex';
                    setTimeout(() => {
                        popupModal.classList.add('show');
                    }, 10);
                }
            });
        });
    }

    renderColleges(universityData); // Initial render of all universities

    closeBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const parentModal = btn.closest('.popup-modal') || btn.closest('.rating-modal');
            parentModal.classList.remove('show');
            setTimeout(() => {
                parentModal.style.display = 'none';
                if (parentModal === ratingModal) {
                    setTimeout(() => {
                        popupModal.classList.remove('move-left');
                    }, 10);
                    resetRatingModal();
                }
            }, 500);
        });
    });

    document.addEventListener('click', function (event) {
        if (event.target && event.target.id === 'rate-me-button') {
            event.preventDefault();
            popupModal.classList.add('move-left');
            setTimeout(() => {
                ratingModal.style.display = 'block';
                setTimeout(() => {
                    ratingModal.classList.add('show');
                }, 10);
            }, 500);
        }
    });

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            stars.forEach((s, i) => {
                s.classList.toggle('selected', i <= index);
            });
            hasRated = true;
            feedbackError.style.display = 'none';
        });
    });

    submitFeedback.addEventListener('click', function () {
        const feedback = feedbackTextarea.value.trim();

        if (!hasRated && feedback === "") {
            feedbackError.style.display = 'block';
            return;
        }

        feedbackError.style.display = 'none';

        ratingModal.classList.remove('show');
        setTimeout(() => {
            ratingModal.style.display = 'none';
            thankYouMessage.style.display = 'block';
            setTimeout(() => {
                thankYouMessage.classList.add('show');
            }, 10);

            setTimeout(() => {
                thankYouMessage.classList.remove('show');
                setTimeout(() => {
                    thankYouMessage.style.display = 'none';
                    popupModal.classList.remove('move-left');
                    resetRatingModal();
                }, 500);
            }, 2000);
        }, 500);
    });

    function resetRatingModal() {
        hasRated = false;
        feedbackTextarea.value = "";
        stars.forEach((star) => star.classList.remove('selected'));
        feedbackError.style.display = 'none';
    }

    // Filter logic

    // Call function to populate location dropdown
    populateLocationFilter(universityData);

    filterIcon.addEventListener('click', function () {
        filterPanel.classList.toggle('open');
    });

    applyFiltersBtn.addEventListener('click', function () {
        const selectedLocation = locationFilter.value;
        const selectedPrice = parseFloat(priceFilter.value);
        const selectedType = document.querySelector('input[name="type"]:checked')?.value;

        const filteredData = Object.keys(universityData).filter(key => {
            const college = universityData[key];
            const matchesLocation = selectedLocation === "" || college.location === selectedLocation;
            const matchesPrice = parseFloat(college.fees) <= selectedPrice;
            const matchesType = !selectedType || college.Level === selectedType;
            return matchesLocation && matchesPrice && matchesType;
        }).reduce((obj, key) => {
            obj[key] = universityData[key];
            return obj;
        }, {});

        renderColleges(filteredData);
    });

    // Update the price filter value dynamically
    priceFilter.addEventListener('input', function () {
        priceOutput.textContent = `BD ${priceFilter.value}`;
    });

    // Reset filters
    resetFiltersBtn.addEventListener('click', function () {
        priceFilter.value = priceFilter.max; // Reset price range
        priceOutput.textContent = `BD ${priceFilter.max}`;
        locationFilter.value = ""; // Reset location filter
        document.querySelectorAll('input[name="type"]').forEach(input => input.checked = false); // Reset public/private filter
        renderColleges(universityData); // Re-render all colleges
    });
});

//RegistrationForm
document.addEventListener("DOMContentLoaded", function () {
    const showRegistration = document.getElementById("showRegistration");
    const registrationForm = document.getElementById("registrationForm");
    const messageDiv = document.getElementById("message");
    const submitButton = registrationForm.querySelector('button[type="submit"]');
    const userNameElement = document.getElementById("userName");

    showRegistration.addEventListener("click", function (event) {
        event.preventDefault();
        registrationForm.style.display =
            registrationForm.style.display === "none" ? "block" : "none";
        //Call checkFormValidity() here to initially disable the button if fields are empty.
        checkFormValidity();
    });

    // Input field validation
    const inputFields = registrationForm.querySelectorAll(
        'input[type="text"], input[type="tel"], input[type="email"]'
    );
    inputFields.forEach((field) => {
        field.addEventListener("input", function () {
            validateField(this);
            checkFormValidity();
        });
    });

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();
        messageDiv.textContent = "";

        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var phoneNumber = document.getElementById("phoneNumber").value;
        var email = document.getElementById("email").value;

        if (checkFormValidity()) {
            messageDiv.textContent = "Registration successful!";
            submitButton.style.backgroundColor = "lightgreen";
            messageDiv.style.color = "darkgreen";

            handleRegistrationSuccess(firstName, lastName);
        } else {
            messageDiv.style.color = "red";
        }
        // Remove the form
        var formContainer = document.getElementById("registrationForm");
        formContainer.style.display = "none";

        // Remove the icon
        var getStartedButton = document.getElementById("showRegistration");
        if (getStartedButton) {
            getStartedButton.style.display = "none";
        }
    });

    function validateField(field) {
        const isValid = validateInput(field);
        field.style.backgroundColor = isValid ? "white" : "lightcoral";
    }

    function validateInput(field) {
        const id = field.id;
        const value = field.value;
        let isValid = true;

        switch (id) {
            case "firstName":
            case "lastName":
                isValid = value.length >= 3;
                break;
            case "phoneNumber":
                isValid = value.length === 8 && /^\d+$/.test(value);
                break;
            case "email":
                isValid = value.includes("@");
                break;
        }
        return isValid;
    }

    function checkFormValidity() {
        const allValid = Array.from(inputFields).every(validateInput);
        submitButton.disabled = !allValid;
        submitButton.style.backgroundColor = allValid ? "lightgreen" : "grey";
        return allValid;
    }

    // Call checkExistingUser() on page load
    checkExistingUser();
});

function displayUserName(firstName, lastName) {
    var userNameElement = document.getElementById("userName");
    userNameElement.innerHTML = `Welcome, ${firstName} ${lastName}!`;
    userNameElement.style.display = "inline";
}

// Function to handle registration success and display welcome message
function handleRegistrationSuccess(firstName, lastName) {
    // Store user's name in local storage
    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("lastName", lastName);

    // Display the welcome message
    displayUserName(firstName, lastName);

    // Hide the registration form and icon
    registrationForm.style.display = "none";
    showRegistration.style.display = "none";
}

// Function to check for existing user and display welcome message on page load
function checkExistingUser() {
    const firstName = sessionStorage.getItem("firstName");
    const lastName = sessionStorage.getItem("lastName");
    if (firstName && lastName) {
        handleRegistrationSuccess(firstName, lastName);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');

    // Toggle the dropdown on click
    dropdownToggle.addEventListener('click', function (event) {
        event.preventDefault();
        dropdown.classList.toggle('open');
    });

    // Close the dropdown when clicking outside
    document.addEventListener('click', function (event) {
        if (!dropdown.contains(event.target) && dropdown.classList.contains('open')) {
            dropdown.classList.remove('open');
        }
    });
});

// Get all counter elements
const counters = document.querySelectorAll('.counter');

// Function to check if the element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

// Listen for the scroll event
window.addEventListener('scroll', () => {
    counters.forEach(counter => {
        if (isInViewport(counter) && !counter.classList.contains('visible')) {
            // Add 'visible' class to trigger animation
            counter.classList.add('visible');
            // Optionally, start the counting animation if necessary
            startCounting(counter.querySelector('.number'));
        }
    });
});

// Function to start counting animation (same as previous)
function startCounting(counterElement) {
    const target = parseInt(counterElement.dataset.target);
    let current = 0;

    const timer = setInterval(() => {
        const step = target / 100;
        current += step;
        counterElement.textContent = Math.round(current);

        if (current >= target) {
            clearInterval(timer); // Stop counting when target is reached
        }
    }, 16);
}

// Select all event cards
const eventCards = document.querySelectorAll('.event-card');

// Create an Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the animation class when the card is in the viewport
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the card is visible
});

// Observe each event card
eventCards.forEach(card => observer.observe(card));
