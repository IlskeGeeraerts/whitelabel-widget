(function () {
  var script = document.currentScript;
  var widgetId = script.getAttribute("data-widget-id");

  if (!widgetId) {
    console.error("Whitelabel Widget: Missing data-widget-id");
    return;
  }

  var CONFIG_URL =
    "https://script.google.com/macros/s/AKfycbxPdomkVE0TmliurP5jyVO1VawFuApUNkFy4h7Zi2K0gyQYqPDMCWDm0esmUo5ngRXf/exec?widget_id=" +
    widgetId;

  fetch(CONFIG_URL)
    .then(function (res) {
      return res.json();
    })
    .then(function (config) {
      if (config.error) {
        console.error("Whitelabel Widget:", config.error);
        return;
      }
      createWidget(config);
    });

  function createWidget(config) {
    // Floating button
    var button = document.createElement("div");
    button.innerText = config.button_text || "Open";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.background = config.primary_color || "#2563EB";
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
    overlay.style.background = "rgba(0,0,0,0.5)";
    overlay.style.display = "none";
    overlay.style.zIndex = "999998";

    // Modal
    var modal = document.createElement("div");
    modal.style.background = "#fff";
    modal.style.width = "90%";
    modal.style.maxWidth = "420px";
    modal.style.margin = "10% auto";
    modal.style.borderRadius = "12px";
    modal.style.padding = "20px";
    modal.style.fontFamily = "Arial, sans-serif";
    modal.style.position = "relative";

    // Close button
    var close = document.createElement("div");
    close.innerText = "✕";
    close.style.position = "absolute";
    close.style.top = "10px";
    close.style.right = "12px";
    close.style.cursor = "pointer";
    close.style.fontSize = "18px";

    // Title
    var title = document.createElement("h3");
    title.innerText = config.modal_title || "Welcome";
    title.style.marginTop = "0";

    modal.appendChild(close);
    modal.appendChild(title);

    // Content
    if (config.embed_type === "iframe") {
      var iframe = document.createElement("iframe");
      iframe.src = config.cta_link;
      iframe.style.width = "100%";
      iframe.style.height = "400px";
      iframe.style.border = "none";
      modal.appendChild(iframe);
    } else {
      var cta = document.createElement("a");
      cta.innerText = config.button_text || "Continue";
      cta.href = config.cta_link;
      cta.target = "_blank";
      cta.style.display = "block";
      cta.style.marginTop = "20px";
      cta.style.textAlign = "center";
      cta.style.background = config.primary_color || "#2563EB";
      cta.style.color = "#fff";
      cta.style.padding = "12px";
      cta.style.borderRadius = "8px";
      cta.style.textDecoration = "none";
      modal.appendChild(cta);
    }

    overlay.appendChild(modal);
    document.body.appendChild(button);
    document.body.appendChild(overlay);

    button.onclick = function () {
      overlay.style.display = "block";
    };

    close.onclick = overlay.onclick = function () {
      overlay.style.display = "none";
    };
  }
})();
