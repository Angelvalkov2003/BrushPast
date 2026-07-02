/** Applies bp-site / admin-site on <body> before React hydration (fixes fonts on production). */
export function AdminThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){function apply(){try{var admin=location.pathname.indexOf("/admin")===0;var html=document.documentElement;var body=document.body;if(!body)return;if(admin){html.dataset.adminTheme="light";html.style.colorScheme="light";html.classList.remove("dark");body.classList.add("admin-site");body.classList.remove("bp-site");}else{delete html.dataset.adminTheme;html.style.colorScheme="";body.classList.add("bp-site");body.classList.remove("admin-site");}}catch(e){}}if(document.body)apply();else document.addEventListener("DOMContentLoaded",apply);})();`,
      }}
    />
  );
}
