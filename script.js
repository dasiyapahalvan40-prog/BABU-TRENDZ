// script.js - सिर्फ Loader हटाने के लिए

document.addEventListener('DOMContentLoaded', function() {
    
    // Loader को 1.5 सेकंड बाद हटा दो
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 1500);

    console.log("✅ Babu Trend
