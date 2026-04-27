const timeline = document.querySelector("#timeline");
const toggle = document.querySelector("#orderToggle");
const entries = timeline ? Array.from(timeline.querySelectorAll("[data-timeline-entry]")) : [];

let reversed = false;

toggle?.addEventListener("click", () => {
  reversed = !reversed;
  const ordered = reversed ? [...entries].reverse() : entries;
  ordered.forEach((entry) => timeline.append(entry));
  toggle.setAttribute("aria-pressed", String(reversed));
  toggle.textContent = reversed ? "Oldest first" : "Newest first";
});

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
  entries.forEach((entry) => entry.classList.add("is-visible"));
} else {
  entries.slice(0, 3).forEach((entry) => entry.classList.add("is-visible"));
  const observer = new IntersectionObserver(
    (observedEntries) => {
      observedEntries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { rootMargin: "-12% 0px -12% 0px", threshold: 0.12 },
  );

  entries.forEach((entry) => observer.observe(entry));
}
