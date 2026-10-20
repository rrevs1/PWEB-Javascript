const form = document.getElementById("registrationForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const course = document.getElementById("course").value;
    const college = document.getElementById("college").value.trim();
    const agreement = document.getElementById("agreement").checked;
    const errorIds = [
        "name-error",
        "address-error",
        "email-error",
        "password-error",
        "course-error",
        "college-error",
        "agreement-error"
    ];

    errorIds.forEach(function (id) {
        document.getElementById(id).textContent = "";
    });

    document.getElementById("success-message").style.display = "none";
    let isValid = true;

    if (name.length < 2) {
        document.getElementById("name-error").textContent =
            "Please enter your name.";
        isValid = false;
    }

    if (address.length < 5) {
        document.getElementById("address-error").textContent =
            "Please enter a valid address.";
        isValid = false;
    }

    const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        document.getElementById("email-error").textContent =
            "Please enter a valid email address.";
        isValid = false;
    }

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
        document.getElementById("password-error").textContent =
            "Use 8+ characters with uppercase, lowercase, number, and special character.";
        isValid = false;
    }

    if (course === "") {
        document.getElementById("course-error").textContent =
            "Please select your course.";
        isValid = false;
    }

    if (college.length < 2) {
        document.getElementById("college-error").textContent =
            "Please enter your college name.";
        isValid = false;
    }

    if (!agreement) {
        document.getElementById("agreement-error").textContent =
            "Please agree to the information above.";
        isValid = false;
    }

    if (isValid) {
        document.getElementById("success-message").style.display = "block";
    }
});

form.addEventListener("reset", function () {
    setTimeout(function () {
        document.querySelectorAll(".error").forEach(function (element) {
            element.textContent = "";
        });
        document.getElementById("success-message").style.display = "none";
    }, 0);
});
