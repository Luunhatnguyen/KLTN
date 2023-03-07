import React, { useEffect } from "react";
import IndexHeader from "./IndexHeader";

const Home = () => {
  useEffect(() => {
    (function(d, m) {
      var kommunicateSettings = {
        appId: "376926362ace98480b1c46cfc4dd81996",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);
  return (
    <>
      <IndexHeader />
    </>
  );
};

export default Home;
