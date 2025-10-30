// Low Quantity Warning System

function checkLowQuantityComponents() {
  // Find all products with warnThreshold set and check if they're below it
  const lowQuantityProducts = [];
  
  for (const [productId, product] of Object.entries(appState.products || {})) {
    if (product.warnThreshold && product.warnThreshold > 0) {
      const quantity = Number(product.quantity || 0);
      if (quantity < product.warnThreshold) {
        lowQuantityProducts.push({
          id: productId,
          name: product.name,
          quantity: quantity,
          threshold: product.warnThreshold
        });
      }
    }
  }
  
  // Update warning icon visibility
  updateWarningIcon(lowQuantityProducts.length > 0);
  
  // Store for modal display
  window.lowQuantityProducts = lowQuantityProducts;
}

function updateWarningIcon(show) {
  const warningIcon = document.getElementById('warning-icon');
  if (!warningIcon) return;
  
  if (show) {
    warningIcon.classList.remove('hidden');
    warningIcon.addEventListener('click', showLowQuantityModal);
  } else {
    warningIcon.classList.add('hidden');
    warningIcon.removeEventListener('click', showLowQuantityModal);
  }
}

function showLowQuantityModal() {
  const products = window.lowQuantityProducts || [];
  if (products.length === 0) return;
  
  const body = document.createElement('div');
  body.style.display = 'grid';
  body.style.gap = '12px';
  body.style.maxWidth = '500px';
  
  const title = document.createElement('div');
  title.textContent = `⚠️ Low Quantity Alert`;
  title.style.fontWeight = '700';
  title.style.fontSize = '16px';
  title.style.color = '#ef4444';
  body.appendChild(title);
  
  const list = document.createElement('div');
  list.style.display = 'grid';
  list.style.gap = '8px';
  list.style.maxHeight = '300px';
  list.style.overflowY = 'auto';
  
  products.forEach(product => {
    const item = document.createElement('div');
    item.style.display = 'flex';
    item.style.justifyContent = 'space-between';
    item.style.alignItems = 'center';
    item.style.padding = '10px';
    item.style.background = '#fef2f2';
    item.style.border = '1px solid #fecaca';
    item.style.borderRadius = '6px';
    item.style.cursor = 'pointer';
    item.style.transition = 'all 0.2s';
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = product.name;
    nameSpan.style.fontWeight = '600';
    nameSpan.style.color = '#1f2937';
    nameSpan.style.flex = '1';
    
    const qtySpan = document.createElement('span');
    qtySpan.textContent = `${product.quantity} / ${product.threshold}`;
    qtySpan.style.color = '#ef4444';
    qtySpan.style.fontWeight = '700';
    qtySpan.style.marginLeft = '10px';
    
    item.appendChild(nameSpan);
    item.appendChild(qtySpan);
    
    // Click to navigate to product
    item.addEventListener('click', () => {
      closeModal();
      openProductPage(product.id);
    });
    
    item.addEventListener('mouseenter', () => {
      item.style.background = '#fee2e2';
      item.style.borderColor = '#fca5a5';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.background = '#fef2f2';
      item.style.borderColor = '#fecaca';
    });
    
    list.appendChild(item);
  });
  
  body.appendChild(list);
  
  openModal({
    title: 'Low Quantity Components',
    body: body,
    actions: [
      { label: 'Close' }
    ]
  });
}

// Initialize warning icon in top bar if it doesn't exist
function initializeWarningIcon() {
  if (!document.getElementById('warning-icon')) {
    const rightDiv = document.querySelector('#top-bar .right');
    if (rightDiv) {
      const warningIcon = document.createElement('div');
      warningIcon.id = 'warning-icon';
      warningIcon.className = 'hidden';
      warningIcon.title = 'Low quantity components';
      warningIcon.textContent = '⚠️';
      warningIcon.style.height = 'var(--control-h)';
      warningIcon.style.width = 'var(--control-h)';
      warningIcon.style.borderRadius = '8px';
      warningIcon.style.background = '#ef4444';
      warningIcon.style.color = '#fff';
      warningIcon.style.fontSize = '18px';
      warningIcon.style.fontWeight = '700';
      warningIcon.style.display = 'inline-grid';
      warningIcon.style.placeItems = 'center';
      warningIcon.style.cursor = 'pointer';
      warningIcon.style.animation = 'warning-blink 1s ease-in-out infinite alternate';
      
      // Insert before settings button
      const settingsBtn = document.getElementById('settings-btn');
      if (settingsBtn) {
        rightDiv.insertBefore(warningIcon, settingsBtn);
      } else {
        rightDiv.insertBefore(warningIcon, rightDiv.firstChild);
      }
    }
  }
}

// Call this on page load
document.addEventListener('DOMContentLoaded', initializeWarningIcon);
