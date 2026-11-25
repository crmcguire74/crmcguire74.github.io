// 📊 Google Tag Manager, carried over from the original site (Site_Backup/*.html).
// GA4 and any other tags are configured inside this GTM container, not in code.
export const GTM_ID = 'GTM-N2JC2XRG';

/** Goes as high in <head> as possible. */
export const renderGtmHead = (id: string = GTM_ID): string => `    <!-- Google Tag Manager -->
    <script>
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${id}');
    </script>
    <!-- End Google Tag Manager -->`;

/** Goes immediately after the opening <body> tag. */
export const renderGtmBody = (id: string = GTM_ID): string => `    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${id}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->`;
