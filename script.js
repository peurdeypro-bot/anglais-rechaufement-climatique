const chartButtons = document.querySelectorAll(".chart-tab");
const chartBars = [...document.querySelectorAll("[data-chart-bar]")];
const chartValues = [...document.querySelectorAll("[data-chart-value]")];
const chartLabels = [...document.querySelectorAll("[data-chart-label]")];
const chartTitle = document.querySelector("#chart-title");
const chartDescription = document.querySelector("#chart-description");
const chartHeading = document.querySelector("[data-chart-heading]");
const chartCaption = document.querySelector("[data-chart-caption]");
const chartFootnote = document.querySelector("[data-chart-footnote]");

const chartDetails = {
    temperature: {
        heading: "Température mondiale",
        title: "Hausse de la température mondiale",
        description: "La température moyenne mondiale était environ 1,1 degré Celsius plus élevée entre 2011 et 2020 qu’entre 1850 et 1900.",
        caption: "Écart de température moyen par rapport à 1850–1900.",
        footnote: "Chaque barre montre une moyenne sur la période indiquée.",
        ticks: ["1.5", "1.0", "0.5", "0"],
        values: [0, 0.6, 1.1],
        labels: ["1850–1900", "1981–2000", "2011–2020"],
        maximum: 1.5,
        unit: "°C",
    },
    sealevel: {
        heading: "Niveau de la mer",
        title: "Hausse du niveau de la mer",
        description: "La vitesse moyenne de la montée du niveau de la mer a augmenté, passant de 1,3 millimètre par an à 3,7 millimètres par an.",
        caption: "Vitesse moyenne de la montée du niveau de la mer, en millimètres par an.",
        footnote: "Chaque barre représente la moyenne de la période indiquée.",
        ticks: ["3.75", "2.5", "1.25", "0"],
        values: [1.3, 1.9, 3.7],
        labels: ["1901–1971", "1971–2006", "2006–2018"],
        maximum: 3.75,
        unit: " mm/an",
    },
};

function renderChart(selectedChart) {
    const details = chartDetails[selectedChart];

    if (!details) {
        return;
    }

    chartButtons.forEach((button) => {
        const isSelected = button.dataset.chart === selectedChart;
        button.classList.toggle("is-active", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
    });

    chartTitle.textContent = details.title;
    chartDescription.textContent = details.description;
    chartHeading.textContent = details.heading;
    chartCaption.firstChild.textContent = `${details.caption} `;
    chartFootnote.textContent = details.footnote;
    document.querySelectorAll("[data-tick]").forEach((tick, index) => {
        tick.textContent = details.ticks[index];
    });

    details.values.forEach((value, index) => {
        const barHeight = value / details.maximum * 150;
        const barY = 185 - barHeight;
        chartBars[index].setAttribute("y", String(barY));
        chartBars[index].setAttribute("height", String(barHeight));
        chartValues[index].textContent = `${value.toFixed(1)}${details.unit}`;
        chartValues[index].setAttribute("y", String(barY - 10));
        chartLabels[index].textContent = details.labels[index];
    });
}

chartButtons.forEach((button) => {
    button.addEventListener("click", () => renderChart(button.dataset.chart));
});

renderChart("sealevel");

const progressBar = document.querySelector(".reading-progress span");

function updateReadingProgress() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
}

window.addEventListener("scroll", updateReadingProgress, { passive: true });
window.addEventListener("resize", updateReadingProgress);
updateReadingProgress();
