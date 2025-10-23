// Fix para eventos táctiles en móviles
document.addEventListener('DOMContentLoaded', function() {
  // Fix para el botón del sidebar
  const sidebarTrigger = document.getElementById('sidebar-trigger');
  const mask = document.getElementById('mask');
  const sidebar = document.getElementById('sidebar');
  
  if (sidebarTrigger) {
    // Agregar eventos táctiles
    sidebarTrigger.addEventListener('touchstart', function(e) {
      e.preventDefault();
      toggleSidebar();
    });
    
    sidebarTrigger.addEventListener('click', function(e) {
      e.preventDefault();
      toggleSidebar();
    });
  }
  
  if (mask) {
    mask.addEventListener('touchstart', function(e) {
      e.preventDefault();
      toggleSidebar();
    });
    
    mask.addEventListener('click', function(e) {
      e.preventDefault();
      toggleSidebar();
    });
  }
  
  function toggleSidebar() {
    if (sidebar) {
      const isExpanded = sidebar.style.transform === 'translateX(0px)' || 
                         document.body.hasAttribute('sidebar-display');
      
      if (isExpanded) {
        document.body.removeAttribute('sidebar-display');
        if (mask) mask.style.display = 'none';
      } else {
        document.body.setAttribute('sidebar-display', '');
        if (mask) mask.style.display = 'block';
      }
    }
  }
  
  // Fix para menús desplegables táctiles
  document.querySelectorAll('.nav-link, .category-trigger').forEach(element => {
    element.addEventListener('touchstart', function(e) {
      e.stopPropagation();
    });
    
    element.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });
});
