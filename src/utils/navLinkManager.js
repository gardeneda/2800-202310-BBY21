const navLinks = [
    { name: "Chat", link: "/chat" },
    { name: "Diet", link: "/foodHistory/FoodHistory" },
    { name: "Exercise", link: "/exercisePage" },
    { name: "To-Do", link: "/todo" },
    { name: "Profile", link: "/profile" },
    { name: "Risk", link: "/risk" },
    { name: "Resources", link: "/resources" }
  ];
  
function highlightCurrentLink(pathname) {
    return navLinks.map((navLink) => {
      if (navLink.link === pathname) {
        return { ...navLink, isActive: true};
      } else {
        return { ...navLink, isActive: false};
      }
    });
  }

  module.exports = { navLinks, highlightCurrentLink };
  