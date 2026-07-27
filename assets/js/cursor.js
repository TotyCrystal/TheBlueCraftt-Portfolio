// ========== CUSTOM CURSOR – ISS SATELLITE ==========
document.addEventListener('DOMContentLoaded', function () {
    const cursor = document.createElement('div');
    cursor.id = 'iss-cursor';
    cursor.innerHTML = `
        <div class="core">
            <div class="solar left"></div>
            <div class="solar right"></div>
            <div class="antenna"></div>
        </div>
        <div class="glow"></div>
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function (e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Hide when leaving window
    document.addEventListener('mouseleave', function () {
        cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
        cursor.style.opacity = '1';
    });
});