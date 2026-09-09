(function () {
  "use strict";

  const content = window.siteContent;

  if (!content) {
    console.error("content.js did not load. Check that content.js is included before main.js.");
    return;
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.textContent = value;
    });
  }

  function renderBasics() {
    setText('[data-bind="name"]', content.name);
    setText('[data-bind="shortName"]', content.shortName || initials(content.name));
    setText('[data-bind="title"]', content.title);
    setText('[data-bind="location"]', content.location);
    setText('[data-bind="tagline"]', content.tagline);
    setText('[data-bind="about"]', content.about);
    setText('[data-bind="education"]', content.education);

    document.querySelectorAll("[data-bind-href=\"linkedin\"]").forEach(function (el) {
      el.href = content.links.linkedin;
    });

    if (content.links.email) {
      setText('[data-bind="email"]', content.links.email);
      document.querySelectorAll("[data-bind-href=\"email\"]").forEach(function (el) {
        el.href = "mailto:" + content.links.email;
      });
    }

    if (content.links.whatsapp) {
      const wa = String(content.links.whatsapp).replace(/\D/g, "");
      setText('[data-bind="whatsapp"]', formatWhatsApp(content.links.whatsapp));
      document.querySelectorAll("[data-bind-href=\"whatsapp\"]").forEach(function (el) {
        el.href = "https://wa.me/" + wa;
      });
    }

    document.title = content.name + " — " + content.title;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Portfolio of " + content.name + " — " + content.title + "."
      );
    }
  }

  function formatWhatsApp(raw) {
    const digits = String(raw).replace(/\D/g, "");
    if (digits.length === 13 && digits.startsWith("55")) {
      return (
        "+55 " +
        digits.slice(2, 4) +
        " " +
        digits.slice(4, 9) +
        "-" +
        digits.slice(9)
      );
    }
    return "+" + digits;
  }

  function initials(name) {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (part) {
        return part[0];
      })
      .join("")
      .toUpperCase();
  }

  function renderSkills() {
    const list = document.querySelector('[data-bind-list="skills"]');
    if (!list || !content.skills) return;
    list.innerHTML = "";
    content.skills.forEach(function (skill) {
      const li = document.createElement("li");
      li.textContent = skill;
      list.appendChild(li);
    });
  }

  function formatDates(start, end) {
    if (start && end) return start + " – " + end;
    return start || end || "";
  }

  function renderExperiences() {
    const root = document.querySelector("[data-bind-experiences]");
    if (!root || !content.experiences) return;
    root.innerHTML = "";

    content.experiences.forEach(function (exp) {
      const li = document.createElement("li");
      li.className = "timeline-item";

      const role = document.createElement("h3");
      role.className = "timeline-role";
      role.textContent = exp.role;

      const meta = document.createElement("p");
      meta.className = "timeline-meta";

      const company = document.createElement("span");
      company.className = "timeline-company";
      company.textContent = exp.company;

      meta.appendChild(company);
      meta.appendChild(document.createTextNode(" · " + formatDates(exp.start, exp.end)));
      if (exp.location) {
        meta.appendChild(document.createTextNode(" · " + exp.location));
      }

      li.appendChild(role);
      li.appendChild(meta);

      if (exp.bullets && exp.bullets.length) {
        const ul = document.createElement("ul");
        ul.className = "timeline-bullets";
        exp.bullets.forEach(function (bullet) {
          const item = document.createElement("li");
          item.textContent = bullet;
          ul.appendChild(item);
        });
        li.appendChild(ul);
      }

      root.appendChild(li);
    });
  }

  function renderProjects() {
    const root = document.querySelector("[data-bind-projects]");
    if (!root || !content.projects) return;
    root.innerHTML = "";

    content.projects.forEach(function (project) {
      const li = document.createElement("li");
      li.className = "project-item";

      const left = document.createElement("div");
      const name = document.createElement("h3");
      name.className = "project-name";
      name.textContent = project.name;
      left.appendChild(name);

      if (project.period) {
        const period = document.createElement("p");
        period.className = "project-period";
        period.textContent = project.period;
        left.appendChild(period);
      }

      const right = document.createElement("div");
      const summary = document.createElement("p");
      summary.className = "project-summary";
      summary.textContent = project.summary;
      right.appendChild(summary);

      if (project.tech && project.tech.length) {
        const tech = document.createElement("ul");
        tech.className = "project-tech";
        tech.setAttribute("aria-label", "Technologies");
        project.tech.forEach(function (t) {
          const tli = document.createElement("li");
          tli.textContent = t;
          tech.appendChild(tli);
        });
        right.appendChild(tech);
      }

      li.appendChild(left);
      li.appendChild(right);
      root.appendChild(li);
    });
  }

  function initMotion() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = document.querySelectorAll(".reveal");

    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) {
        el.classList.add("is-visible");
      });
      const timeline = document.querySelector(".timeline");
      if (timeline) timeline.classList.add("is-drawn");
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          if (entry.target.id === "experience") {
            const timeline = entry.target.querySelector(".timeline");
            if (timeline) timeline.classList.add("is-drawn");
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initContactModal() {
    const modal = document.getElementById("contact-modal");
    if (!modal) return;

    let lastFocus = null;
    let openTimer = null;

    function getFocusable() {
      return Array.prototype.slice.call(
        modal.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      );
    }

    function openModal() {
      lastFocus = document.activeElement;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      window.requestAnimationFrame(function () {
        modal.classList.add("is-open");
      });
      const closeBtn = modal.querySelector(".contact-modal-close");
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
      window.clearTimeout(openTimer);
      openTimer = window.setTimeout(function () {
        modal.hidden = true;
        if (lastFocus && typeof lastFocus.focus === "function") {
          lastFocus.focus();
        }
      }, 280);
    }

    document.querySelectorAll("[data-open-contact]").forEach(function (el) {
      el.addEventListener("click", openModal);
    });

    modal.querySelectorAll("[data-close-contact]").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", function (event) {
      if (modal.hidden) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  renderBasics();
  renderSkills();
  renderExperiences();
  renderProjects();
  initMotion();
  initContactModal();
})();
