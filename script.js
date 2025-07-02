// Structure des rubriques par catégorie
const categories = {
    "conditions-emploi": [
        { title: "Le statut", pdf: "documents/LE-STATUT.pdf" },
        { title: "Le recrutement", pdf: "documents/LE-RECRUTEMENT.pdf" },
        { title: "Le contrat", pdf: "documents/LE-CONTRAT.pdf" },
        { title: "La rupture du contrat", pdf: "documents/LA-RUPTURE-DU-CONTRAT.pdf" },
        { title: "La suspension et la procédure disciplinaire", pdf: "documents/LA-SUSPENSION-ET-LA-PROCEDURE-DISCIPLINAIRE.pdf" }
    ],
    "exercice-fonctions": [
        { title: "Les obligations de service", pdf: "documents/LES-OBLIGATIONS-DE-SERVICE.pdf" },
        { title: "Les missions", pdf: "documents/LES-MISSIONS.pdf" },
        { title: "Le cumul d’activité", pdf: "documents/LE-CUMUL-D-ACTIVITE.pdf" },
        { title: "L’évaluation professionnelle", pdf: "documents/EVALUATION-PROFESSIONNELLE.pdf" },
        { title: "Les éléments de rémunération", pdf: "documents/LES-ELEMENTS-DE-REMUNERATION.pdf" },
        { title: "Les heures supplémentaires", pdf: "documents/HEURES-SUPPLEMENTAIRES.pdf" }
    ],
    "absences": [
        { title: "Les congés légaux", pdf: "documents/LES-CONGES.pdf" },
        { title: "Les autorisations d’absences", pdf: "documents/LES-AUTORISATIONS-D-ABSENCE.pdf" },
        { title: "La justification des absences", pdf: "documents/LA-JUSTIFICATION-DES-ABSENCES.pdf" }
    ],
    "demarches-admin": [
        { title: "L’acte du C.A.", pdf: "documents/ACTE-CA.pdf" },
        { title: "La déclaration préalable à l’embauche", pdf: "documents/DPAE.pdf" },
        { title: "La prise en compte des dépenses dans le budget", pdf: "documents/DEPENSES-BUDGET.pdf" }
    ]
};

// Charger le PDF et les liens de la catégorie dans details.html
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pdfPath = urlParams.get("pdf");
    const title = urlParams.get("title");
    const category = urlParams.get("category");

    if (pdfPath && title) {
    // Mettre à jour le titre
    document.getElementById("rubrique-title").innerText = decodeURIComponent(title);
    
    // Afficher le PDF avec ajustement
    const pdfEmbed = document.getElementById("pdf-embed");
    pdfEmbed.src = pdfPath + '#view=FitH&toolbar=0'; // Ajuste à la largeur, cache la barre d'outils
    
    // Configurer le bouton de téléchargement
    const downloadBtn = document.getElementById("download-btn");
    downloadBtn.href = pdfPath;
    downloadBtn.download = pdfPath.split("/").pop();
        // Générer les liens vers les autres documents de la catégorie
        if (category && categories[category]) {
            const relatedLinksList = document.getElementById("related-links-list");
            categories[category].forEach(item => {
                if (item.pdf !== pdfPath) { // Exclure le PDF actuel
                    const li = document.createElement("li");
                    const a = document.createElement("a");
                    a.href = `details.html?pdf=${item.pdf}&title=${encodeURIComponent(item.title)}&category=${category}`;
                    a.textContent = item.title;
                    li.appendChild(a);
                    relatedLinksList.appendChild(li);
                }
            });
        }
    } else {
        document.getElementById("pdf-viewer").innerHTML = "<p>Erreur : Aucun PDF spécifié.</p>";
    }
    document.querySelector('.top-button a').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
});
});