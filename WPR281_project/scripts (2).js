// Example courses data
const courses = [
    {
        title: "WPR281",
        code: "WPR281",
        duration: "6 Months",
        description: "A course focused on web programming.",
        modules: [
            { name: "Introduction to Web Development", lecturer: "Dr. Adams", venue: "Room 101", guide: "assets/study-guide.pdf", video: "https://www.youtube.com/watch?v=video1" },
            { name: "Advanced JavaScript", lecturer: "Dr. Lee", venue: "Room 102", guide: "assets/study-guide.pdf", video: "https://www.youtube.com/watch?v=video2" }
        ],
        startDate: new Date('2024-09-01'),
        image: "assets/course-image1.jpg"
        
    },
    {
        title: "PRG281",
        code: "PRG281",
        duration: "6 Months",
        description: "An in-depth programming course.",
        modules: [
            { name: "Programming Basics", lecturer: "Dr. Carter", venue: "Room 201", guide: "assets/study-guide.pdf", video: "https://www.youtube.com/watch?v=video3" },
            { name: "Object-Oriented Programming", lecturer: "Dr. Jones", venue: "Room 202", guide: "assets/study-guide.pdf", video: "https://www.youtube.com/watch?v=video4" }
        ],
        startDate: new Date('2024-10-01'),
        image: "assets/course-image2.jpg"
    },
    {
        title: "LPR281",
        code: "LPR281",
        duration: "6 Months",
        description: "Logic programming and algorithms.",
        modules: [
            { name: "Logic Programming Basics", lecturer: "Dr. Wilson", venue: "Room 301", guide: "assets/study-guide.pdf", video: "https://www.youtube.com/watch?v=video5" },
            { name: "Advanced Algorithms", lecturer: "Dr. Miller", venue: "Room 302", guide: "assets/study-guide.pdf", video: "https://www.youtube.com/watch?v=video6" }
        ],
        startDate: new Date('2024-11-01'),
        image: "assets/course-image3.jpg"
    },
    {
        title: "MAT281",
        code: "MAT281",
        duration: "6 Months",
        description: "A comprehensive course on mathematics and statistics.",
        modules: [
            { name: "Mathematical Foundations", lecturer: "Dr. Wilson", venue: "Room 401", guide: "assets/study-guide.pdf", video: "https://www.youtube.com/watch?v=video7" },
            { name: "Statistics and Data Analysis", lecturer: "Dr. Thompson", venue: "Room 402", guide: "assets/study-guide.pdf", video: "https://www.youtube.com/watch?v=video8" }
        ],
        startDate: new Date('2024-12-01'),
        image: "assets/course-image4.jpg"
    }
];

let enrolledCourses = [];

// Search and Display Courses
document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = '';

    const filteredCourses = courses.filter(course => course.title.toLowerCase().includes(query));
    
    if (filteredCourses.length === 0) {
        courseList.innerHTML = '<p>No courses found.</p>';
    } else {
        filteredCourses.forEach(course => {
            const courseElem = document.createElement('div');
            courseElem.className = 'course';
            courseElem.innerHTML = `
                <img src="${course.image}" alt="${course.title}">
                <h3>${course.title}</h3>
                <p>Code: ${course.code}</p>
                <p>Duration: ${course.duration}</p>
                <p>${course.description}</p>
                <button onclick="viewCourseDetails('${course.title}')">View Details</button>
                <button onclick="enrollCourse('${course.title}')">Enroll</button>
            `;
            courseList.appendChild(courseElem);
        });
    }
});

// Automatically trigger the search on page load
window.onload = () => {
    document.getElementById('search-button').click();
};

// View course details
function viewCourseDetails(title) {
    const course = courses.find(c => c.title === title);
    const detailsSection = document.getElementById('course-details');
    const enrollmentForm = document.getElementById('enrollment-form');

    detailsSection.innerHTML = `
        <h2>${course.title}</h2>
        <p><strong>Code:</strong> ${course.code}</p>
        <p><strong>Duration:</strong> ${course.duration}</p>
        <img src="${course.image}" alt="${course.title}">
        <h3>Modules:</h3>
        <ul>
            ${course.modules.map(module => `
                <li>
                    <strong>${module.name}</strong><br>
                    Lecturer: ${module.lecturer}<br>
                    Venue: ${module.venue}<br>
                    <a href="${module.guide}" download>Download Study Guide</a><br>
                    <a href="${module.video}" target="_blank">Watch Video</a><br>
                    <button onclick="markCompleted('${module.name}', '${course.title}')">Mark as Completed</button>
                </li>
            `).join('')}
        </ul>
        <button onclick="printCourse()">Print Course</button>
    `;

    detailsSection.style.display = 'block';
    enrollmentForm.style.display = 'none';

    // Smooth scroll to course details section
    detailsSection.scrollIntoView({ behavior: 'smooth' });
}

// Mark module as completed
function markCompleted(moduleName, courseTitle) {
    if (!enrolledCourses.find(c => c.title === courseTitle)) {
        alert('You need to enroll in this course to mark modules as completed.');
        return;
    }

    const completedList = document.getElementById('completed-list');
    const existing = document.querySelector(`#completed-list li[data-module="${moduleName}"]`);
    
    if (!existing) {
        const li = document.createElement('li');
        li.textContent = moduleName;
        li.dataset.module = moduleName;
        li.className = 'completed';
        completedList.appendChild(li);
    }
}

// Print course details
function printCourse() {
    const detailsHtml = document.getElementById('course-details').innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Course</title>');
    printWindow.document.write('<style>body { font-family: Arial, sans-serif; margin: 20px; } h1 { color: #0056b3; }</style>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(detailsHtml);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}

// Enroll course
function enrollCourse(title) {
    const course = courses.find(c => c.title === title);
    const enrollmentForm = document.getElementById('enrollment-form');

    enrollmentForm.innerHTML = `
        <h2>Enroll in ${course.title}</h2>
        <form id="enroll-form" onsubmit="return validateEnrollmentForm(event, '${course.title}')">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required>
            <button type="submit">Submit Enrollment</button>
        </form>
    `;

    document.getElementById('course-details').style.display = 'none';
    enrollmentForm.style.display = 'block';

    // Smooth scroll to enrollment form section
    enrollmentForm.scrollIntoView({ behavior: 'smooth' });
}

// Validate enrollment form and handle submission
function validateEnrollmentForm(event, courseTitle) {
    event.preventDefault();

    const form = document.getElementById('enroll-form');
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();

    // Simple validation
    if (!name || !email || !phone.match(/^\d{10}$/)) {
        alert('Please provide valid details.');
        return false;
    }

    // Enroll the course if validation passes
    enrolledCourses.push(courses.find(c => c.title === courseTitle));

    const countdownDate = courses.find(c => c.title === courseTitle).startDate;
    const timeDiff = countdownDate - new Date();
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    alert(`Thank you for enrolling in ${courseTitle}, ${name}! The course starts in ${daysLeft} days.`);

    form.reset();
    document.getElementById('enrollment-form').style.display = 'none';
    displayEnrolledCourses();

    // Smooth scroll to Available Courses section
    document.getElementById('available-courses').scrollIntoView({ behavior: 'smooth' });

    return false; // Prevent default form submission
}

// Display enrolled courses
function displayEnrolledCourses() {
    const availableCoursesSection = document.getElementById('available-courses');
    availableCoursesSection.innerHTML = `
        <h2>Enrolled Courses</h2>
        ${enrolledCourses.length === 0 ? '<p>No courses enrolled.</p>' : enrolledCourses.map(course => `
            <div class="course">
                <h3>${course.title}</h3>
                <p>Code: ${course.code}</p>
                <p>Duration: ${course.duration}</p>
                <p>${course.description}</p>
                <h4>Modules:</h4>
                <ul>
                    ${course.modules.map(module => `
                        <li>
                            <strong>${module.name}</strong><br>
                            Lecturer: ${module.lecturer}<br>
                            Venue: ${module.venue}<br>
                            <a href="${module.guide}" download>Download Study Guide</a><br>
                            <a href="${module.video}" target="_blank">Watch Video</a><br>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('')}
    `;
    availableCoursesSection.style.display = 'block';
}

// Toggle sidebar
document.getElementById('toggle-sidebar').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('main');
    const sidebarNav = document.getElementById('sidebar-nav');

    if (sidebar.style.width === '60px') {
        sidebar.style.width = '200px';
        main.style.marginLeft = '200px';
        sidebarNav.style.display = 'block'; // Show sidebar items
    } else {
        sidebar.style.width = '60px';
        main.style.marginLeft = '60px';
        sidebarNav.style.display = 'none'; // Hide sidebar items
    }
});

// Automatically trigger the search on page load
window.onload = () => {
    document.getElementById('search-button').click();
};
