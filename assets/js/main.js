/* ============================================================================
   main.js — behavior for the Deep Sea portfolio.

   Four concerns, each guarded so a page that lacks the relevant markup does
   nothing: navigation scroll state, the page-load reveal sequence, scroll
   reveals via IntersectionObserver, and the projects filter. All motion is
   gated by prefers-reduced-motion; reduced-motion visitors get the finished
   state immediately with no transitions.
   ============================================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Navigation: transparent -> surface on scroll --------------------- */
  function initNav() {
    var nav = document.querySelector(".nav");
    if (!nav) return;
    function onScroll() {
      if (window.scrollY > 8) nav.classList.add("nav--scrolled");
      else nav.classList.remove("nav--scrolled");
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- Page-load reveal sequence ---------------------------------------- */
  /* The .anim-item elements start hidden (see components.css). Adding
     .is-loaded to <body> lets the CSS transition run. Stagger comes from
     per-element inline transition-delay set here, grouped so the hero name,
     subhead, CTAs, and nav links cascade rather than crawl letter by letter. */
  function initLoadSequence() {
    if (reduceMotion) {
      document.body.classList.add("is-loaded");
      return;
    }
    var groups = [
      { sel: ".nav__link", base: 0, step: 40 },
      { sel: "[data-anim='name']", base: 80, step: 0 },
      { sel: "[data-anim='subhead']", base: 200, step: 0 },
      { sel: "[data-anim='cta']", base: 320, step: 60 }
    ];
    groups.forEach(function (g) {
      var nodes = document.querySelectorAll(g.sel);
      nodes.forEach(function (node, i) {
        node.style.transitionDelay = (g.base + i * g.step) + "ms";
      });
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.classList.add("is-loaded");
      });
    });
  }

  /* --- Scroll reveals --------------------------------------------------- */
  function initReveals() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* --- Projects filter (URL-param driven, no backend) ------------------- */
  function initFilter() {
    var bar = document.querySelector(".filter-bar");
    var grid = document.querySelector("[data-filterable]");
    if (!bar || !grid) return;
    var cards = grid.querySelectorAll(".project-card");
    var buttons = bar.querySelectorAll(".filter-bar__btn");

    function apply(tag) {
      cards.forEach(function (card) {
        var tags = (card.getAttribute("data-tags") || "").split(" ");
        var show = tag === "all" || tags.indexOf(tag) !== -1;
        card.classList.toggle("is-hidden", !show);
      });
      buttons.forEach(function (btn) {
        btn.classList.toggle("filter-bar__btn--active", btn.getAttribute("data-tag") === tag);
      });
    }

    function tagFromUrl() {
      var params = new URLSearchParams(window.location.search);
      return params.get("tag") || "all";
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var tag = btn.getAttribute("data-tag");
        var params = new URLSearchParams(window.location.search);
        if (tag === "all") params.delete("tag");
        else params.set("tag", tag);
        var next = window.location.pathname + (params.toString() ? "?" + params.toString() : "");
        history.replaceState(null, "", next);
        apply(tag);
      });
    });

    apply(tagFromUrl());
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initLoadSequence();
    initReveals();
    initFilter();
  });
})();
