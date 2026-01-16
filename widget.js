(function () {
  // 1. Get widget_id from script tag
  var currentScript = document.currentScript;
  var widgetId = currentScript.getAttribute("data-widget-id");

  if (!widgetId) {
    console.error("Whitelabel Widget: Missing data-widget-id");
    return;
  }

  // 2. CONFIG API URL (your Google Apps Script Web App)
  var CONFIG_URL =
    "https://script.google.com/macros/s/AKfycbxPdomkVE0TmliurP5jyVO1VawFuApUNkFy4h7Zi2K0gyQYqPDMCWDm0esmUo5ngRXf/exec?widget_id=" +
    widgetId;

  // 3. Fetch widget configuration
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
    })
    .catch(function (err) {
      console.error("Whitelabel Widget Error:", err);
    });

  // 4. Create the widget UI
  function createWidget(config) {
    // Floating button
    var button = document.createElement("div");
    button.innerText = config.button_text || "Open";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.background = config.primary_color || "#2563EB";
    button.style.color = "#ffffff";
    button.style.padding = "14px 18px";
    button.style.borderRadius = "999px";
    button.style.fontFamily = "Arial, sans-serif";
    button.style.fontSize = "14px";
    button.style.cursor = "pointer";
    button.style.boxShadow = "0 8px 20px rgba(0,0,0,0.25)";
    button.style.zIndex = "999999";

    button.onclick = function () {
      window.open(config.cta_link, "_blank");
    };

    document.body.appendChild(button);
  }
})();
