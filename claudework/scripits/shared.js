/* Shared nav + footer injection
   Usage: <script src="shared.js" data-page="home"></script>
   Renders into [data-slot="nav"] and [data-slot="footer"]. */

(function () {
  const script = document.currentScript;
  const page = (script && script.dataset.page) || "";

  const links = [
    { id: "home",       href: "index.html",        zh: "首页",     en: "Index" },
    { id: "activities", href: "activities.html",   zh: "活动",     en: "Activities" },
    { id: "gallery",    href: "gallery.html",      zh: "相册",     en: "Gallery" },
    { id: "videos",     href: "videos.html",       zh: "影像",     en: "Videos" },
    { id: "about",      href: "about.html",        zh: "班级",     en: "About" },
    { id: "people",     href: "people.html",       zh: "人物",     en: "People" },
    { id: "contact",    href: "contact.html",      zh: "联系",     en: "Contact" },
  ];

  function render() {
    const navSlot = document.querySelector("[data-slot='nav']");
    if (navSlot) {
      navSlot.outerHTML = `
        <header class="nav">
          <div class="nav-inner">
            <a class="brand" href="index.html">
              <span class="brand-mark">8A&nbsp;·&nbsp;194</span>
              <span class="brand-name">HKU&nbsp;PKU&nbsp;EMBA</span>
              <span class="brand-num">联&nbsp;合&nbsp;培&nbsp;养&nbsp;·&nbsp;CLASS&nbsp;ARCHIVE</span>
            </a>
            <nav class="nav-links">
              ${links.map(l => `<a href="${l.href}" class="${l.id === page ? "active" : ""}">
                <span>${l.zh}</span>
                <span style="margin-left:8px;color:var(--ink-3);font-size:9px;">${l.en}</span>
              </a>`).join("")}
            </nav>
            <div class="nav-cta">
              <span class="nav-time" id="navTime"></span>
            </div>
          </div>
        </header>`;
      tickClock();
      setInterval(tickClock, 30 * 1000);
    }

    const footSlot = document.querySelector("[data-slot='footer']");
    if (footSlot) {
      footSlot.outerHTML = `
        <footer class="footer">
          <div class="footer-inner">
            <div class="footer-mast">
              <div class="mast-title serif">HKU&nbsp;PKU&nbsp;EMBA · 8A-194 班级档案馆</div>
              <div class="mast-sub">Digital Archive — Established 2026</div>
              <p style="margin-top:24px;max-width:42ch;color:var(--ink-3);font-size:0.9375rem;">
                港大 8A · 北大 194 联合培养，35 位同学。<br/>
                把零散的活动记忆，整理成可浏览、可传播、可长期沉淀的档案。
              </p>
            </div>
            <div>
              <h4>站点</h4>
              <ul>
                ${links.slice(0,4).map(l=>`<li><a href="${l.href}">${l.zh} · ${l.en}</a></li>`).join("")}
              </ul>
            </div>
            <div>
              <h4>档案</h4>
              <ul>
                ${links.slice(4).map(l=>`<li><a href="${l.href}">${l.zh} · ${l.en}</a></li>`).join("")}
              </ul>
            </div>
            <div>
              <h4>联系</h4>
              <ul>
                <li><a href="mailto:archive@hkupku8a194.com">archive@hkupku8a194.com</a></li>
                <li><a href="contact.html">编辑部 · Editorial</a></li>
                <li><a href="contact.html">公众号「8A-194 班」</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© 2025–2026 · HKU-PKU EMBA 8A-194 · 内部档案，仅供本班师生与友人</span>
            <span>hkupku8a194.com · v1.1 · 2026.05</span>
          </div>
        </footer>`;
    }
  }

  function tickClock() {
    const el = document.getElementById("navTime");
    if (!el) return;
    const d = new Date();
    const tz = "HK";
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    el.textContent = `${tz} ${hh}:${mm}`;
  }

  // Reveal-on-scroll
  function setupReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(el => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(el => io.observe(el));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => { render(); setupReveal(); });
  } else {
    render(); setupReveal();
  }

  // Apply persisted theme
  try {
    const t = localStorage.getItem("emba8a-theme");
    if (t === "bold") document.documentElement.setAttribute("data-theme", "bold");
  } catch (e) {}
})();
