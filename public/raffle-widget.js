(function () {
  
  let userId = null;
  let tickets = 0;

  const BACKEND_URL = 'https://balilore.onrender.com';
  let currentContainerId = null;

  
  async function getCurrentUserId() {
    try {
     
      if (window.currentUser && window.currentUser.id) {
        return window.currentUser.id;
      }

      
      const res = await window.axios.get(`${BACKEND_URL}/api/current-user`);
      if (res.data && res.data.id) {
        return res.data.id;
      }

      
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.id) return user.id;
      }

      console.error('No authenticated user found');
      return null;
    } catch (error) {
      console.error('Error getting user ID:', error);
      return null;
    }
  }

  async function getTicketCount() {
    try {
      userId = await getCurrentUserId();
      if (!userId) {
        console.error('Cannot get ticket count - no user ID');
        return 0;
      }

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
    userId = await getCurrentUserId();
    if (!userId) {
      alert('Please log in to join the raffle');
      return;
    }

    const res = await fetch(`${BACKEND_URL}/api/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        amount: 100, 
        currency: 'usd',
        userId: userId 
      }),
    });

    const data = await res.json();
    if (data.sessionUrl) {
      window.location.href = data.sessionUrl;
    } else {
      alert('Payment initialization failed');
    }
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
      <div class="raffle-status">
        ${userId ? `
          <p style="font-family: Lora, serif;">✅ You have ${tickets} tickets.</p>
          <button id="proceedPaymentBtn" style="
            background: var(--primary-color, #E91E63);
            color: white;
            border: none;
            padding: 8px 31px;
            border-radius: 4px;
            cursor: pointer;
            font-family: Lora, serif;
          ">Join the Raffle</button>
        ` : `
          <p style="font-family: Lora, serif;">Please log in to view your raffle tickets</p>
          <button onclick="window.location.href='/login'" style="
            background: var(--primary-color, #E91E63);
            color: white;
            border: none;
            padding: 8px 31px;
            border-radius: 4px;
            cursor: pointer;
            font-family: Lora, serif;
          ">Log In</button>
        `}
      </div>
    `;

    if (userId) {
      document.getElementById("proceedPaymentBtn").onclick = proceedToPayment;
    }
  }

  window.raffleWidget = {
    tickets,
    isInitialized: false,
    init: async function (containerId) {
      try {
        console.log('✅ Initializing raffleWidget...');
        userId = await getCurrentUserId();
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
