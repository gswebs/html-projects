document.addEventListener("DOMContentLoaded", () => {

  const observers = {};

  function observe(el, threshold = 0.25) {
    if (!observers[threshold]) {
      observers[threshold] = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("gactive");

            if (entry.target.classList.contains("g-scroll-rotate")) {
              startScrollRotate(entry.target);
            }

            if (entry.target.classList.contains("gsap-text-zoom")) {
              startTextZoom(entry.target);
            }

            observer.unobserve(entry.target);
          }
        });
      }, { threshold });
    }

    observers[threshold].observe(el);
  }

  document.querySelectorAll(".gbox, .gsap-text-zoom, .g-scroll-rotate")
    .forEach(el => {
      const threshold = parseFloat(el.dataset.threshold) || 0.25;
      observe(el, threshold);
    });

  /* ========== IMAGE ROTATION ========== */

  function startScrollRotate(el) {

    function onScroll() {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;

      const distance = elementCenter - viewportCenter;
      const maxDistance = viewportHeight / 2;

      let progress = Math.min(Math.abs(distance) / maxDistance, 1);
      let rotate = 0;

      if (distance < 0) {
        rotate = -45 * progress;
      } else {
        rotate = 45 * progress;
      }

      el.style.transform = `rotate(${rotate}deg)`;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ========== TEXT ZOOM EFFECT ========== */

  function startTextZoom(el) {

    function onScroll() {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;

      const distance = viewportCenter - elementCenter;

      if (distance > 0) {
        const maxDistance = viewportHeight / 2;
        let progress = Math.min(distance / maxDistance, 1);

        const scale = 1 + progress; // 2 → 1
        el.style.transform = `scale(${scale})`;
      } else {
        el.style.transform = "scale(1)";
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

});

// --- POPUP LOGIC (Outside DOMContentLoaded to stay global) ---
const popupData = [
  { title: "In-Lab Synthesis and Controlled Harvesting", desc: "Peptides are synthesized internally using validated cell culture and yeast-based expression systems. Growth parameters, expression windows, and harvest timing are controlled to ensure structural integrity, sequence fidelity, and batch uniformity." },
  { title: "Analytical Identity and Purity Testing", desc: "Each batch undergoes analytical verification to confirm molecular identity, purity, and composition against predefined specifications prior to qualification for release." },
  { title: "Endotoxin (LPS) Testing and Contamination Control", desc: "Endotoxin (LPS) levels are measured as part of the quality control process to ensure contamination remains within established laboratory thresholds appropriate for controlled research and performance applications." },
  { title: "Batch Traceability and Qualification-Based Release", desc: "Production data, analytical results, and quality documentation are maintained at the batch level. Material is released only upon meeting all predefined synthesis and testing criteria; non-conforming batches are rejected." }
];

function openPopup(index) {
    const modal = document.getElementById("gModal");
    const content = document.querySelector(".g-modal-content");
    const loader = document.querySelector(".g-modal-loader");

    if (!modal || !content || !loader) return;

    // Set modal content
    document.getElementById("modalTitle").innerText = popupData[index].title;
    document.getElementById("modalDescription").innerText = popupData[index].desc;

    // Show modal & loader
    modal.classList.add("show");
    loader.style.display = "block";
    content.style.opacity = 0; // hide content initially

    // Simulate loading (e.g., 800ms)
    setTimeout(() => {
        loader.style.display = "none";  // hide loader
        content.style.opacity = 1;       // show content
        content.style.transform = "scale(1) translateY(0)";
    }, 800);
}

function closePopup() {
    const modal = document.getElementById("gModal");
    const content = document.querySelector(".g-modal-content");

    if (!modal || !content) return;

    modal.classList.remove("show");
    content.style.opacity = 0; // reset content opacity
    content.style.transform = "scale(0.8) translateY(30px)";
}

// Close on outside click
window.addEventListener("click", function(event) {
  const modal = document.getElementById("gModal");
  if (event.target === modal) {
    closePopup();
  }
});