(function () {
  const userId = 123;
  let tickets = 0;

  const BACKEND_URL = 'http://localhost:3001';
  let currentContainerId = null;

  async function getTicketCount() {
    try {
      const res = await window.axios.get(`${BACKEND_URL}/api/raffle-status?userId=${userId}`);
      tickets = res.data.tickets;
      console.log('✅ getTicketCount: ', tickets);
      return tickets;
    } catch (error) {
      console.error('❌ Error fetching ticket count:', error);
      return tickets;
    }
  }
const proceedToPayment = async () => {
  
  const res =await fetch('http://localhost:3001/api/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 100, currency: 'usd' }),
});


  const data = await res.json();
  window.location.href = data.sessionUrl;
};

  function render(containerId) {
    currentContainerId = containerId;

    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`❌ Container with ID "${containerId}" not found`);
      return;
    }

    console.log('✅ Rendering widget to container:', container);

    container.innerHTML = `
      <p style="font-family: Lora, serif;">✅ You have ${tickets} tickets.</p>
      <button id="proceedPaymentBtn" style="
        background: var(--primary-color, #E91E63 );
        color: white;
        border: none;
        padding: 8px 31px;
        border-radius: 4px;
        cursor: pointer;
      ">  Join the Raffle </button>
    `;

    document.getElementById("proceedPaymentBtn").onclick = proceedToPayment;
  }

  window.raffleWidget = {
    userId,
    tickets,
    isInitialized: false,
    init: async function (containerId) {
      try {
        console.log('✅ Initializing raffleWidget...');
        tickets = await getTicketCount();
        render(containerId);
        this.isInitialized = true;
        console.log('✅ raffleWidget initialized successfully.');
      } catch (err) {
        console.error('❌ Error in raffleWidget.init:', err);
        this.isInitialized = false;
      }
    },
    getTicketCount: () => tickets,
    proceedToPayment
  };
})();
