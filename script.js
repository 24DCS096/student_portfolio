// Wait for the DOM to load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Handle form submission on the contact page
    const form = document.getElementById('contactForm');
    const fileInput = document.getElementById('fileUpload');
    const fileInfoDiv = document.getElementById('fileInfo');

    // On form submission (for file upload)
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission (i.e., page reload)

        const formData = new FormData(form); // Create a FormData object from the form
        const file = formData.get('fileUpload'); // Get the uploaded file

        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        // Display the name of the file to the user
        fileInfoDiv.innerHTML = `
            <p><strong>File selected:</strong> ${file.name}</p>
        `;

        // Optional: Use fetch to send the form data (including file) to the server for processing
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // Display the server response (e.g., success message)
            fileInfoDiv.innerHTML += `
                <p><strong>Server Response:</strong> ${data}</p>
            `;
        })
        .catch(error => {
            console.error('Error:', error);
            fileInfoDiv.innerHTML = `<p style="color: red;">Error uploading file.</p>`;
        });
    });

    // Optional: Add animation or effects on portfolio page
    const homeSection = document.querySelector('.home');
    if (homeSection) {
        // Example: Add a fade-in effect on page load
        homeSection.classList.add('fade-in');
    }
});
