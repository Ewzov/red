(() => {
  const costDisplay = document.getElementById("costDesc");

  const formatCurrency = (num) =>
    new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    })
      .format(num)
      .replace("₽", "₽");

  function animateCostChange(element, newValue) {
    const duration = 600;
    const startValue =
      parseFloat(element.textContent.replace(/[^0-9.-]+/g, "")) || 0;
    const startTime = performance.now();

    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue =
        startValue + (newValue - startValue) * easeOutCubic(progress);
      element.textContent = `Итого: ${formatCurrency(currentValue)}`;
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function calculateTotal() {
    const radioGroups = ["name", "form", "m"];
    let allSelected = true;

    radioGroups.forEach((group) => {
      if (!document.querySelector(`input[name="${group}"]:checked`)) {
        allSelected = false;
        document
          .querySelector(`input[name="${group}"]`)
          .closest(".Style, .forma, .ploshad")
          .querySelector("h4").style.color = "red";
      } else {
        document
          .querySelector(`input[name="${group}"]`)
          .closest(".Style, .forma, .ploshad")
          .querySelector("h4").style.color = "";
      }
    });

    if (!allSelected) {
      costDisplay.textContent = "Выберите варианты во всех разделах!!!!!!!!!";
      costDisplay.style.color = "red";
      return;
    }

    const selectedOptions = document.querySelectorAll(
      'input[type="radio"]:checked'
    );
    let total = 0;

    selectedOptions.forEach((option) => {
      total += parseFloat(option.dataset.cost) || 0;
    });

    costDisplay.style.color = "";
    animateCostChange(costDisplay, total);
  }

  document.querySelector(".button-r").addEventListener("click", function (e) {
    e.preventDefault();
    calculateTotal();
  });

  costDisplay.textContent = "Итого: 0 ₽";
})();
