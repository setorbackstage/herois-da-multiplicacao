const API_KEY = 'ggck_live_8012d969056cb0d8e42e2f3471856ce4da8d7146f679a43ea7d57b21dcf0cdc3';
const BASE_URL = 'https://ggcheckout.app';

async function updateCheckouts() {
  const payloadCheckout1 = {
    bannerUrl: 'https://xavier2bit.github.io/missao-tabuada/tabuada-assets/banner-checkout-missao-tabuada.png?v=3',
    checkout: {
      theme: 'light',
      primaryColor: '#2563EB',
      buttonColor: '#16A34A',
      buttonTextColor: '#FFFFFF',
      section: {
        bgColor: '#F8FAFC',
        borderColor: '#E2E8F0',
        orderBumps: {
          title: '⚡ Aproveite e Adicione ao Pedido:',
          colorTitle: '#0F172A',
          bgColor: '#FFFFFF',
          bgOrderbumpBorder: '#2563EB',
          buttonText: '+ Adicionar ao Pedido',
          hideDescription: false,
          showInstallments: true
        },
        cardPhotoAndTitle: {
          colorTitle: '#0F172A',
          authorTextColor: '#475569'
        },
        summaryOrder: {
          summaryBgColor: '#FFFFFF',
          borderColor: '#E2E8F0',
          colorTitle: '#0F172A',
          colorOrderBumpsTitle: '#0F172A',
          dividerColor: '#E2E8F0'
        },
        cardPayment: {
          buttonColor: '#16A34A',
          buttonTextColor: '#FFFFFF',
          titleTextColor: '#0F172A'
        }
      }
    }
  };

  const payloadCheckout2 = {
    bannerUrl: 'https://xavier2bit.github.io/missao-tabuada/tabuada-assets/banner-checkout-liga-herois.png?v=3',
    checkout: {
      theme: 'light',
      primaryColor: '#2563EB',
      buttonColor: '#16A34A',
      buttonTextColor: '#FFFFFF',
      section: {
        bgColor: '#F8FAFC',
        borderColor: '#E2E8F0',
        orderBumps: {
          title: '⚡ Aproveite e Adicione ao Pedido:',
          colorTitle: '#0F172A',
          bgColor: '#FFFFFF',
          bgOrderbumpBorder: '#2563EB',
          buttonText: '+ Adicionar ao Pedido',
          hideDescription: false,
          showInstallments: true
        },
        cardPhotoAndTitle: {
          colorTitle: '#0F172A',
          authorTextColor: '#475569'
        },
        summaryOrder: {
          summaryBgColor: '#FFFFFF',
          borderColor: '#E2E8F0',
          colorTitle: '#0F172A',
          colorOrderBumpsTitle: '#0F172A',
          dividerColor: '#E2E8F0'
        },
        cardPayment: {
          buttonColor: '#16A34A',
          buttonTextColor: '#FFFFFF',
          titleTextColor: '#0F172A'
        }
      }
    }
  };

  // 1. Update Checkout 1 (dc050f22-81f8-46e1-92e8-6db95f44c18e)
  console.log('Updating Checkout 1 (Missão Tabuada R$ 10)...');
  const res1 = await fetch(`${BASE_URL}/api/checkouts/dc050f22-81f8-46e1-92e8-6db95f44c18e`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payloadCheckout1)
  });
  console.log('Checkout 1 update response:', res1.status, await res1.json());

  // 2. Update Checkout 2 (f8598902-9a59-4fe4-acdf-fb59671ff109)
  console.log('Updating Checkout 2 (Liga dos Heróis R$ 27)...');
  const res2 = await fetch(`${BASE_URL}/api/checkouts/f8598902-9a59-4fe4-acdf-fb59671ff109`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payloadCheckout2)
  });
  console.log('Checkout 2 update response:', res2.status, await res2.json());
}

updateCheckouts().catch(console.error);
