(function () {
  var script = document.currentScript;
  var widgetId = script.getAttribute("data-widget-id");

  if (!widgetId) {
    console.error("Whitelabel Widget: Missing data-widget-id");
    return;
  }

  var CONFIG_URL =
    "https://script.google.com/macros/s/AKfycbxPdomkVE0TmliurP5jyVO1VawFuApUNkFy4h7Zi2K0gyQYqPDMCWDm0esmUo5ngRXf/exec?widget_id=" +
    encodeURIComponent(widgetId);

  fetch(CONFIG_URL)
    .then(function (res) {
      return res.json();
    })
    .then(function (config) {
      if (config.error) {
        console.error("Whitelabel Widget:", config.error);
        return;
      }

      // ✅ DOMAIN LOCKING (allow all if empty)
      var allowed = (config.allowed_domains || "").trim();
      if (allowed) {
        var host = (window.location.hostname || "").toLowerCase();
        var allowedList = allowed
          .split(",")
          .map(function (d) {
            return d.trim().toLowerCase();
          })
          .filter(Boolean);

        if (allowedList.indexOf(host) === -1) {
          console.warn("Whitelabel Widget blocked on:", host, "Allowed:", allowedList);
          return;
        }
      }

      createWidget(config);
    })
    .catch(function (err) {
      console.error("Whitelabel Widget Error:", err);
    });

  function createWidget(config) {
    var primary = config.primary_color || "#2563EB";

    // Floating button
    var button = document.createElement("div");
    button.innerText = config.button_text || "Open";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.background = primary;
    button.style.color = "#fff";
    button.style.padding = "14px 18px";
    button.style.borderRadius = "999px";
    button.style.cursor = "pointer";
    button.style.fontFamily = "Arial, sans-serif";
    button.style.zIndex = "999999";
    button.style.boxShadow = "0 8px 20px rgba(0,0,0,0.25)";

    // Overlay
    var overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.55)";
    overlay.style.display = "none";
    overlay.style.zIndex = "999998";

    // Modal
    var modal = document.createElement("div");
    modal.style.background = "#fff";
    modal.style.width = "92%";
    modal.style.maxWidth = "520px";
    modal.style.margin = "8% auto";
    modal.style.borderRadius = "14px";
    modal.style.padding = "18px";
    modal.style.fontFamily = "Arial, sans-serif";
    modal.style.position = "relative";
    modal.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";

    // Close button
    var close = document.createElement("div");
    close.innerText = "✕";
    close.style.position = "absolute";
    close.style.top = "10px";
    close.style.right = "12px";
    close.style.cursor = "pointer";
    close.style.fontSize = "18px";
    close.style.lineHeight = "18px";
    close.style.padding = "6px 8px";
    close.style.borderRadius = "8px";

    // Header row (logo + business name)
    var header = document.createElement("div");
    header.style.display = "flex";
    header.style.alignItems = "center";
    header.style.gap = "10px";
    header.style.marginBottom = "10px";

    // Logo (optional)
    if (config.logo_url && String(config.logo_url).trim()) {
      var logo = document.createElement("img");
      logo.src = String(config.logo_url).trim();
      logo.alt = (config.business_name || "Logo");
      logo.style.width = "40px";
      logo.style.height = "40px";
      logo.style.objectFit = "contain";
      logo.style.borderRadius = "10px";
      header.appendChild(logo);
    }

    // Business name (optional)
    var biz = document.createElement("div");
    biz.style.fontWeight = "700";
    biz.style.fontSize = "16px";
    biz.style.color = "#111827";
    biz.innerText = config.business_name ? String(config.business_name) : "";
    header.appendChild(biz);

    // Title
    var title = document.createElement("h3");
    title.innerText = config.modal_title || "Welcome";
    title.style.margin = "10px 0 0 0";
    title.style.fontSize = "18px";

    modal.appendChild(close);
    if ((config.logo_url && String(config.logo_url).trim()) || (config.business_name && String(config.business_name).trim())) {
      modal.appendChild(header);
    }
    modal.appendChild(title);

    // Content
    if (String(config.embed_type).toLowerCase() === "iframe") {
      var iframe = document.createElement("iframe");
      iframe.src = config.cta_link || "";
      iframe.style.width = "100%";
      iframe.style.height = "460px";
      iframe.style.border = "none";
      iframe.style.marginTop = "12px";
      iframe.style.borderRadius = "10px";
      modal.appendChild(iframe);
    } else {
      var cta = document.createElement("a");
      cta.innerText = config.button_text || "Continue";
      cta.href = config.cta_link || "#";
      cta.target = "_blank";
      cta.rel = "noopener";
      cta.style.display = "block";
      cta.style.marginTop = "16px";
      cta.style.textAlign = "center";
      cta.style.background = primary;
      cta.style.color = "#fff";
      cta.style.padding = "12px";
      cta.style.borderRadius = "10px";
      cta.style.textDecoration = "none";
      cta.style.fontWeight = "700";
      modal.appendChild(cta);
    }

    overlay.appendChild(modal);
    document.body.appendChild(button);
    document.body.appendChild(overlay);

    button.onclick = function () {
      overlay.style.display = "block";
    };

    close.onclick = function (e) {
      e.stopPropagation();
      overlay.style.display = "none";
    };

    overlay.onclick = function () {
      overlay.style.display = "none";
    };

    modal.onclick = function (e) {
      e.stopPropagation();
    };
  }
})();
