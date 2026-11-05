/**
 * Booking Engine & Airbnb Redirection for Vila Flor
 * Official listing: https://www.airbnb.com.br/rooms/1133096153786064159
 * Maximum capacity: 8 guests
 */

(function () {
  'use strict';

  const AIRBNB_BASE_URL = 'https://www.airbnb.com.br/rooms/1133096153786064159';
  const MAX_GUESTS = 8;
  const MIN_GUESTS = 1;

  function initBookingWidget() {
    const forms = document.querySelectorAll('.booking-form');
    if (!forms.length) return;

    // Helper to format Date to YYYY-MM-DD
    const formatDate = (date) => {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    };

    // Calculate default dates: 14 days from today for 5 nights
    const today = new Date();
    const defaultCheckIn = new Date();
    defaultCheckIn.setDate(today.getDate() + 14);

    const defaultCheckOut = new Date();
    defaultCheckOut.setDate(defaultCheckIn.getDate() + 5);

    const minDateStr = formatDate(today);

    forms.forEach((form) => {
      const checkInInput = form.querySelector('[name="checkin"]');
      const checkOutInput = form.querySelector('[name="checkout"]');
      const guestsInput = form.querySelector('[name="guests"]');
      const nightsBadge = form.querySelector('.nights-count');
      const errorMsg = form.querySelector('.booking-error');
      const submitBtn = form.querySelector('button[type="submit"]');

      if (checkInInput) {
        checkInInput.min = minDateStr;
        if (!checkInInput.value) checkInInput.value = formatDate(defaultCheckIn);
      }

      if (checkOutInput) {
        const nextDay = new Date(defaultCheckIn);
        nextDay.setDate(nextDay.getDate() + 1);
        checkOutInput.min = formatDate(nextDay);
        if (!checkOutInput.value) checkOutInput.value = formatDate(defaultCheckOut);
      }

      function updateNightsAndValidation() {
        if (!checkInInput || !checkOutInput) return true;

        const inVal = checkInInput.value;
        const outVal = checkOutInput.value;

        if (errorMsg) errorMsg.textContent = '';

        if (!inVal || !outVal) {
          if (nightsBadge) nightsBadge.textContent = 'Selecione as datas';
          return false;
        }

        const inDate = new Date(inVal + 'T12:00:00');
        const outDate = new Date(outVal + 'T12:00:00');

        // Check if outDate > inDate
        const diffMs = outDate.getTime() - inDate.getTime();
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays <= 0) {
          if (errorMsg) errorMsg.textContent = 'A data de check-out deve ser posterior ao check-in.';
          if (nightsBadge) nightsBadge.textContent = 'Data inválida';
          return false;
        }

        if (nightsBadge) {
          nightsBadge.textContent = `${diffDays} ${diffDays === 1 ? 'noite' : 'noites'}`;
        }

        // Validate guests
        const guests = parseInt(guestsInput?.value || '2', 10);
        if (isNaN(guests) || guests < MIN_GUESTS || guests > MAX_GUESTS) {
          if (errorMsg) errorMsg.textContent = `A capacidade máxima de Vila Flor é de ${MAX_GUESTS} hóspedes.`;
          return false;
        }

        return true;
      }

      if (checkInInput) {
        checkInInput.addEventListener('change', () => {
          if (checkInInput.value && checkOutInput) {
            const inDate = new Date(checkInInput.value + 'T12:00:00');
            const minOut = new Date(inDate);
            minOut.setDate(minOut.getDate() + 1);
            checkOutInput.min = formatDate(minOut);

            if (checkOutInput.value && new Date(checkOutInput.value + 'T12:00:00') <= inDate) {
              const newOut = new Date(inDate);
              newOut.setDate(newOut.getDate() + 3);
              checkOutInput.value = formatDate(newOut);
            }
          }
          updateNightsAndValidation();
        });
      }

      if (checkOutInput) {
        checkOutInput.addEventListener('change', updateNightsAndValidation);
      }

      if (guestsInput) {
        guestsInput.addEventListener('input', () => {
          let val = parseInt(guestsInput.value, 10);
          if (val > MAX_GUESTS) guestsInput.value = MAX_GUESTS;
          if (val < MIN_GUESTS && guestsInput.value !== '') guestsInput.value = MIN_GUESTS;
          updateNightsAndValidation();
        });
      }

      // Guest counter buttons (+ / -) if present
      const minusBtn = form.querySelector('.guest-btn-minus');
      const plusBtn = form.querySelector('.guest-btn-plus');
      if (minusBtn && plusBtn && guestsInput) {
        minusBtn.addEventListener('click', (e) => {
          e.preventDefault();
          let current = parseInt(guestsInput.value || '2', 10);
          if (current > MIN_GUESTS) {
            guestsInput.value = current - 1;
            updateNightsAndValidation();
          }
        });
        plusBtn.addEventListener('click', (e) => {
          e.preventDefault();
          let current = parseInt(guestsInput.value || '2', 10);
          if (current < MAX_GUESTS) {
            guestsInput.value = current + 1;
            updateNightsAndValidation();
          }
        });
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const valid = updateNightsAndValidation();
        if (!valid) return;

        const checkIn = checkInInput?.value;
        const checkOut = checkOutInput?.value;
        const guests = guestsInput?.value || '2';

        // Build Airbnb redirect URL
        const params = new URLSearchParams();
        if (checkIn) params.set('check_in', checkIn);
        if (checkOut) params.set('check_out', checkOut);
        if (guests) params.set('adults', guests);

        const targetUrl = `${AIRBNB_BASE_URL}?${params.toString()}`;

        // Visual feedback
        if (submitBtn) {
          const originalText = submitBtn.innerHTML;
          submitBtn.innerHTML = `
            <svg class="spinner" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
              <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
            </svg>
            <span>Conectando ao Airbnb...</span>
          `;
          submitBtn.disabled = true;

          setTimeout(() => {
            window.open(targetUrl, '_blank', 'noopener,noreferrer');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }, 450);
        } else {
          window.open(targetUrl, '_blank', 'noopener,noreferrer');
        }
      });

      // Initial validation & nights badge
      updateNightsAndValidation();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBookingWidget);
  } else {
    initBookingWidget();
  }
})();

