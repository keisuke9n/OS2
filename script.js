function calculateMetrics() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const wc = parseFloat(document.getElementById('wc').value);

    if (height && weight) {
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        updateIndicator('bmi', bmi, 18.5, 24.9, 'bmiBar');
    }

    if (height && weight && wc) {
        const absi = calculateABSI(height, weight, wc);
        updateIndicator('absi', absi, 0.07, 0.081, 'absiBar');

        const bri = calculateBRI(height, wc);
        updateIndicator('bri', bri, 1.0, 2.0, 'briBar');
    }

    document.getElementById('results').style.display = 'block';
}

function calculateABSI(height, weight, wc) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const wcInMeters = wc / 100;
    return wcInMeters / (Math.pow(bmi, 2/3) * Math.pow(heightInMeters, 1/2));
}

function calculateBRI(height, wc) {
    const heightInMeters = height / 100;
    const innerValue = 1 - Math.pow((wc / (Math.PI * height)), 2);
    return (innerValue >= 0) ? (364.2 - 365.5 * Math.sqrt(innerValue)) : NaN;
}

function updateIndicator(id, value, normalLow, normalHigh, barId) {
    document.getElementById(id).textContent = `${id.toUpperCase()}: ${value.toFixed(2)}`;
    const bar = document.getElementById(barId);
    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    const position = (value - normalLow) / (normalHigh - normalLow) * 100;
    indicator.style.left = `${Math.min(Math.max(position, 0), 100)}%`;
    indicator.style.backgroundColor = (value >= normalLow && value <= normalHigh) ? 'green' : 'red';
    bar.innerHTML = ''; // Clear previous indicators
    bar.appendChild(indicator);
}
