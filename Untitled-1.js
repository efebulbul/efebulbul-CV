(function(){
    const STORAGE_KEY = "site-theme"; // 'light' | 'dark'
    const root = document.documentElement;
  
    function getInitialTheme(){
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "light" || saved === "dark") return saved;
      } catch(_) {}
      return root.getAttribute("data-theme") === "light" ? "light" : "dark";
    }
  
    function applyTheme(theme){
      root.setAttribute("data-theme", theme);
      root.style.colorScheme = theme === "dark" ? "dark" : "light";
  
      const btn = document.getElementById("theme-toggle");
      if (!btn) return;
      btn.setAttribute("aria-pressed", String(theme === "dark"));
      const icon = btn.querySelector(".theme-icon");
      const text = btn.querySelector(".theme-text");
      if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
      if (text) text.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
    }
  
    let current = getInitialTheme();
    applyTheme(current);
  
    // Script'i HTML'in sonunda çağırırsan DOM hazır; harici dosyaysa <script src="theme.js" defer></script> kullan
    const btn = document.getElementById("theme-toggle");
    if (btn){
      btn.addEventListener("click", () => {
        current = current === "dark" ? "light" : "dark";
        try { localStorage.setItem(STORAGE_KEY, current); } catch(_) {}
        applyTheme(current);
      });
    }
  })();
  