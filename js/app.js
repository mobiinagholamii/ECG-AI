// ===================================
// ECG AI - Main JavaScript
// ===================================


// 1. Upload Elements

const ecgFileInput = document.getElementById("ecg-file");
const fileNameDisplay = document.getElementById("file-name");
const uploadBox = document.querySelector(".upload-box");
const removeFileButton = document.getElementById("remove-file");


// 2. Visualization Elements

const waitingState = document.getElementById("waiting-state");
const waitingTitle = waitingState.querySelector("h3");
const waitingText = waitingState.querySelector("p");
const monitorFileName = document.getElementById("monitor-file-name");

const analysisButton = document.querySelector(".analysis-btn");
const analysisStatus = document.querySelector(".analysis-status");



// 3. Allowed File Formats

const allowedExtensions = [
    "csv",
    "txt",
    "dat",
    "pdf",
    "jpg",
    "jpeg",
    "png"
];


// 4. Update Visualization Status

function updateVisualization(title, message) {

    waitingState.hidden = false;

    waitingTitle.textContent = title;
    waitingText.textContent = message;

    waitingState.classList.toggle(
        "signal-ready",
        title === "Signal Ready"
    );
}

// AI Analysis Status

function updateAnalysisStatus(isReady) {

analysisButton.disabled = !isReady;
analysisButton.textContent = "Start Analysis";
if (isReady) {
analysisStatus.innerHTML =
'<span class="status-indicator"></span> ECG File Ready';
} else {
analysisStatus.innerHTML =
'<span class="status-indicator"></span> Waiting for ECG File';
}

}

updateAnalysisStatus(false);

// 5. Handle Selected File

function handleFile(file) {

    // No file selected

    if (!file) {

        fileNameDisplay.textContent = "No file selected";
        removeFileButton.hidden = true;

        updateVisualization(
            "Waiting for ECG Signal",
            "Please upload an ECG file to visualize the signal."
        );
        updateAnalysisStatus(false);
        return;
    }


    // Check file format

    const fileExtension = file.name
        .split(".")
        .pop()
        .toLowerCase();


    if (!allowedExtensions.includes(fileExtension)) {

        fileNameDisplay.textContent = "Invalid file format!";

        ecgFileInput.value = "";
        removeFileButton.hidden = true;

        updateVisualization(
            "Invalid File",
            "Please select a supported ECG file."
        );

        return;
    }
    monitorFileName.textContent = "No file loaded";


    // Valid file selected

    fileNameDisplay.textContent =
        "Selected file: " + file.name;

    removeFileButton.hidden = false;
    monitorFileName.textContent = "File: " + file.name;


    // Update Visualization

    updateVisualization(
        "Signal Ready",
        "Your ECG file has been selected successfully."
    );
    updateAnalysisStatus(true);


    console.log("ECG File Selected:", file);

}


// 6. Choose File Event

ecgFileInput.addEventListener("change", function () {

    handleFile(this.files[0]);

});


// 7. Drag and Drop Events

["dragenter", "dragover", "dragleave", "drop"].forEach(
    eventName => {

        uploadBox.addEventListener(eventName, function (event) {

            event.preventDefault();
            event.stopPropagation();

        });

    }
);


// Drag Over

uploadBox.addEventListener("dragover", function () {

    uploadBox.classList.add("drag-over");

});


// Drag Leave

uploadBox.addEventListener("dragleave", function () {

    uploadBox.classList.remove("drag-over");

});


// Drop File

uploadBox.addEventListener("drop", function (event) {

    uploadBox.classList.remove("drag-over");

    const file = event.dataTransfer.files[0];

    if (file) {

        const dataTransfer = new DataTransfer();

        dataTransfer.items.add(file);

        ecgFileInput.files = dataTransfer.files;

        handleFile(file);

    }

});


// 8. Remove File Button

removeFileButton.addEventListener("click", function () {

    ecgFileInput.value = "";

    fileNameDisplay.textContent = "No file selected";
    monitorFileName.textContent = "No file loaded";

    removeFileButton.hidden = true;
    updateAnalysisStatus(false);


    updateVisualization(
        "Waiting for ECG Signal",
        "Please upload an ECG file to visualize the signal."
    );


    console.log("ECG File Removed");

});

// Start AI Analysis

analysisButton.addEventListener("click", function () {

if (!ecgFileInput.files.length) {
return;
}

analysisStatus.innerHTML =
'<span class="status-indicator"></span> Backend Connection Required';

analysisButton.textContent = "Waiting for Python";

analysisButton.disabled = true;

console.log("ECG file is ready for AI processing.");

});

// Start AI Analysis

analysisButton.addEventListener("click", function () {

if (!ecgFileInput.files.length) {
return;
}

analysisStatus.innerHTML =
'<span class="status-indicator"></span> Backend Connection Required';

analysisButton.textContent = "Waiting for Python";

analysisButton.disabled = true;

console.log("ECG file is ready for AI processing.");

});

// Get Started Button

const getStartedButton = document.querySelector(".start-btn");

if (getStartedButton) {
getStartedButton.addEventListener("click", function () {

document.getElementById("upload").scrollIntoView({
behavior: "smooth"
});

});
}