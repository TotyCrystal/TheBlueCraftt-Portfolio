// assets/js/loader.js - Enhanced Fast & Smooth Loader
document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementById("portfolio-loader")) {
        return;
    }

    var loaderHTML = `
    <div id="portfolio-loader">
        <div class="loader-content">
            <div class="loader-logo">TheBlueCraftt</div>
            <div class="loader-percentage">0%</div>
            <div class="loader-track">
                <div class="loader-progress"></div>
            </div>
            <div class="loader-status">Loading Experience...</div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML("afterbegin", loaderHTML);

    var loader = document.getElementById("portfolio-loader");
    var percentage = document.querySelector(".loader-percentage");
    var progressBar = document.querySelector(".loader-progress");
    var statusText = document.querySelector(".loader-status");

    if (!loader || !percentage || !progressBar) {
        return;
    }

    var statusMessages = [
        "Loading Experience...",
        "Warming up the code...",
        "Almost ready..."
    ];

    var progress = 0;
    var finished = false;
    var messageIndex = 0;

    function updateProgress() {
        if (finished) return;

        // Faster increments: 8-18% per step
        var increment = Math.floor(Math.random() * 11) + 8;
        progress = Math.min(progress + increment, 100);

        percentage.textContent = progress + "%";
        progressBar.style.width = progress + "%";

        // Update status messages
        if (progress > 30 && messageIndex === 0) {
            messageIndex = 1;
            statusText.textContent = statusMessages[1];
        } else if (progress > 70 && messageIndex === 1) {
            messageIndex = 2;
            statusText.textContent = statusMessages[2];
        }

        if (progress >= 100) {
            finished = true;
            percentage.textContent = "100%";
            progressBar.style.width = "100%";
            statusText.textContent = "Ready!";

            // Hide loader quickly
            setTimeout(function () {
                loader.classList.add("hide");
                setTimeout(function () {
                    if (loader.parentNode) {
                        loader.remove();
                    }
                }, 400);
            }, 300);
            return;
        }

        // Faster interval: 80ms instead of 120ms
        setTimeout(updateProgress, 80);
    }

    // Start the loader
    updateProgress();

    // Safety fallback: if the page loads slowly, force complete after 3s
    var safetyTimer = setTimeout(function () {
        if (!finished) {
            progress = 100;
            finished = true;
            percentage.textContent = "100%";
            progressBar.style.width = "100%";
            statusText.textContent = "Ready!";
            setTimeout(function () {
                loader.classList.add("hide");
                setTimeout(function () {
                    if (loader.parentNode) {
                        loader.remove();
                    }
                }, 400);
            }, 300);
        }
    }, 3000);

    // On full page load, ensure loader hides
    window.addEventListener("load", function () {
        clearTimeout(safetyTimer);
        if (!finished) {
            progress = 100;
            finished = true;
            percentage.textContent = "100%";
            progressBar.style.width = "100%";
            statusText.textContent = "Ready!";
            setTimeout(function () {
                loader.classList.add("hide");
                setTimeout(function () {
                    if (loader.parentNode) {
                        loader.remove();
                    }
                }, 400);
            }, 300);
        }
    });

});