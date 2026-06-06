/** Runs before React hydration so admin never flashes OS dark mode. */
export function AdminThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var p=location.pathname;if(p.indexOf("/admin")===0){var d=document.documentElement;d.dataset.adminTheme="light";d.style.colorScheme="light";d.classList.remove("dark");if(document.body){document.body.classList.add("admin-site");document.body.classList.remove("bp-site");}}}catch(e){}})();`,
      }}
    />
  );
}
