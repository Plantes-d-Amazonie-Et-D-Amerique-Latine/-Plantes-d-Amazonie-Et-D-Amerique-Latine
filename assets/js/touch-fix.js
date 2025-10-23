// Fix completo para dispositivos táctiles
class TouchFix {
  constructor() {
    this.init();
  }

  init() {
    this.fixSidebarTouch();
    this.fixViewport();
    this.addGlobalTouchEvents();
    console.log('TouchFix initialized');
  }

  fixSidebarTouch() {
    const sidebarTrigger = document.getElementById('sidebar-trigger');
    const mask = document.getElementById('mask');
    const sidebar = document.getElementById('sidebar');

    if (sidebarTrigger) {
      console.log('Sidebar trigger found, adding touch events');
      
      // Remover eventos existentes primero
      sidebarTrigger.replaceWith(sidebarTrigger.cloneNode(true));
      const newTrigger = document.getElementById('sidebar-trigger');
      
      // Agregar nuevos eventos
      newTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleSidebar();
      });

      newTrigger.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleSidebar();
      });

      // Estilo para mejor tacto
      newTrigger.style.cssText += 'cursor: pointer; min-width: 44px; min-height: 44px; touch-action: manipulation;';
    }

    if (mask) {
      mask.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleSidebar();
      });

      mask.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.toggleSidebar();
      });

      mask.style.cssText += 'cursor: pointer; touch-action: manipulation;';
    }
  }

  toggleSidebar() {
    const body = document.body;
    const sidebar = document.getElementById('sidebar');
    const mask = document.getElementById('mask');
    
    const isExpanded = body.hasAttribute('sidebar-display');
    
    if (isExpanded) {
      body.removeAttribute('sidebar-display');
      if (mask) mask.style.display = 'none';
      if (sidebar) sidebar.style.transform = 'translateX(-100%)';
      console.log('Sidebar closed');
    } else {
      body.setAttribute('sidebar-display', '');
      if (mask) mask.style.display = 'block';
      if (sidebar) sidebar.style.transform = 'translateX(0)';
      console.log('Sidebar opened');
    }
  }

  fixViewport() {
    // Asegurar que el viewport sea mobile-friendly
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
    }
  }

  addGlobalTouchEvents() {
    // Mejorar respuesta táctil global
    document.addEventListener('touchstart', function() {}, { passive: true });
    
    // Prevenir zoom no deseado en iOS
    document.addEventListener('touchmove', function(e) {
      if (e.scale !== 1) {
        e.preventDefault();
      }
    }, { passive: false });
  }
}

// Inicialización robusta
function initializeTouchFix() {
  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new TouchFix();
    });
  } else {
    new TouchFix();
  }

  // También inicializar después de un pequeño delay por si acaso
  setTimeout(() => {
    if (typeof window.TouchFix === 'undefined') {
      window.touchFix = new TouchFix();
    }
  }, 1000);
}

// Inicializar
initializeTouchFix();
