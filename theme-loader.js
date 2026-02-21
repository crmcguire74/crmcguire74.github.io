(function() {
  const getTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return 'dark'; // Default to dark theme
  };

  const theme = getTheme();
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
})();
