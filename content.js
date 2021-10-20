const ver = "0.0.999.4"


var tempurl = chrome.extension.getURL('darklogo.png')
var m = "none"
var t = true

chrome.storage.local.get("mode", function (items) {
  if (items.mode == "dark") {
    m = "dark"
  }
});

chrome.storage.local.get("trans", function (items) {
  if (items.trans == "no") {
    t = false
  }
});

var observer = new MutationObserver(function() {
  if (document.body && t) {
    document.body.style.overflow = "hidden"
    if(m == "dark") {
      document.body.insertAdjacentHTML("afterbegin", `<div id="loadoverlay" style="position: fixed; display: block; /* Hidden by default */width: 100%; /* Full width (cover the whole page) */height: 100%; /* Full height (cover the whole page) */top: 0;left: 0;right: 0;bottom: 0;background-color: rgb(44, 44, 44); /* Black background with opacity */z-index: 5000; /* Specify a stack order in case you're using a different order for other elements */cursor: pointer;"><img src=`+tempurl+` style="display:block;text-align: center; margin-left: auto; margin-right: auto ;width: 5%;padding-top: 20%;"><h1 style="color: rgb(141, 141, 141); text-align: center;">BetterCanvas</h1><p style="color: rgb(109, 109, 109); text-align: center;padding-top:50%">Loading...</p></div>`) //<p style="color: rgb(109, 109, 109); text-align: center;">Now Loading...</p>
    } else {
      document.body.insertAdjacentHTML("afterbegin", `<div id="loadoverlay" style="position: fixed; display: block; /* Hidden by default */width: 100%; /* Full width (cover the whole page) */height: 100%; /* Full height (cover the whole page) */top: 0;left: 0;right: 0;bottom: 0;background-color: rgb(255, 255, 255); /* Black background with opacity */z-index: 5000; /* Specify a stack order in case you're using a different order for other elements */cursor: pointer;"><img src=`+tempurl+` style="display:block;text-align: center; margin-left: auto; margin-right: auto ;width: 5%;padding-top: 20%;"><h1 style="color: rgb(70, 70, 70); text-align: center;">BetterCanvas</h1><p style="color: rgb(60, 60, 60); text-align: center;padding-top:50%">Loading...</p></div>`) //<p style="color: rgb(109, 109, 109); text-align: center;">Now Loading...</p><p style="color: rgb(109, 109, 109); text-align: center;padding-top:50%">Loading...</p></div>`) //<p style="color: rgb(109, 109, 109); text-align: center;">Now Loading...</p>
    }
    observer.disconnect();
  }
});
observer.observe(document.documentElement, {childList: true});



if (window.location.pathname == "/bettercanvas") {
  var oldURL = document.referrer;
  if (oldURL.includes("instructure")) {
    window.location.replace(oldURL);
  } else {
    window.location.replace("https://issaquah.instructure.com/");
  }
  chrome.runtime.sendMessage({ message: 'buttonClicked' }, null);
}

window.addEventListener("load", loadcards, false);

function setCheckID(id, prop, value) {
  if(document.getElementById(id)) {
    setCssStyle(document.getElementById(id), prop, value)
  }
}

function fadeOutEffect(node) {
  var fadeTarget = node;
  var fadeEffect = setInterval(function () {
      if (!fadeTarget.style.opacity) {
          fadeTarget.style.opacity = 1;
      }
      if (fadeTarget.style.opacity > 0) {
          fadeTarget.style.opacity -= 0.1;
      } else {
          clearInterval(fadeEffect);
          setCssStyle(fadeTarget, "display", "none")
          document.body.style.overflow = "auto"
      }
  }, 10);
}

function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || "block";
  (function fade() {
      var val = parseFloat(el.style.opacity);
      if (!((val += .1) > 1)) {
          el.style.opacity = val;
          requestAnimationFrame(fade);
      }
  })();
};

function fadeInEffect(node) {
  var fadeTarget = node;
  var fadeEffect = setInterval(function () {
      if (!fadeTarget.style.opacity) {
          fadeTarget.style.opacity = 0;
      }
      if (fadeTarget.style.opacity < 1) {
          fadeTarget.style.opacity += 0.1;
      } else {
          clearInterval(fadeEffect);

      }
  }, 10);
}

function setCheckWithClass(classname, prop, value, index) {
  var classfinal = index || 0
  if(document.getElementsByClassName(classname).item(index)) {
    setCssStyle(document.getElementsByClassName(classname).item(index), prop, value)
  }
}

function setCheckAll(classname, prop, value) {
  var classfinal = document.getElementsByClassName(classname)
  for (var i = 0; i < classfinal.length; i++) {
    setCssStyle(document.getElementsByClassName(classname).item(i), prop, value)
  }
}

function isDark() {
  chrome.storage.local.get("mode", function (items) {
    if (items.mode == "dark") {
      return true
    } else {
      return false
    }
  });
}

function isLight() {
  chrome.storage.local.get("mode", function (items) {
    if (items.mode == "light") {
      return true
    } else {
      return false
    }
  });
}

function isCustom() {
  chrome.storage.local.get("mode", function (items) {
    if (items.mode == "dark") {
      return true
    } else {
      return false
    }
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}


function setCssStyle(el, style, value) {
  var result = el.style.cssText.match(new RegExp("(?:[;\\s]|^)(" +
    style.replace("-", "\\-") + "\\s*:(.*?)(;|$))")),
    idx;
  if (result) {
    idx = result.index + result[0].indexOf(result[1]);
    el.style.cssText = el.style.cssText.substring(0, idx) +
      style + ": " + value + ";" +
      el.style.cssText.substring(idx + result[1].length);
  } else {
    el.style.cssText += " " + style + ": " + value + ";";
  }
}

window.onbeforeunload = function() {
  if(t) {
  setCssStyle(document.getElementById("loadoverlay"), "opacity", "1")
  setCssStyle(document.getElementById("loadoverlay"), "display", "block")
  setCssStyle(document.body, "overflow", "hidden")
  fadeIn(document.getElementById("loadoverlay"))

  setTimeout(function () {
    fadeOutEffect(document.getElementById("loadoverlay"))
  },3000);
}
}

function loadcards() {
  loadpage()

  setTimeout(function () {

    setCheckAll("app_name", "background-color", "#ffffff00")

    //if (document.getElementsByClassName("fc-body").item(0)) {
    //  setCssStyle(document.getElementsByClassName("fc-body").item(0), "background-color", "#ffffff00")
    //}

    setCheckWithClass("fc-body", "background-color", "#ffffff00")

    //if (document.getElementsByClassName("fc-widget-content").item(0)) {
    //  setCssStyle(document.getElementsByClassName("fc-widget-content").item(0), "border", "none")
    //}

    setCheckWithClass("fc-widget-content", "border", "none")

    var here = document.getElementsByClassName("ig-row");
    for (var i = 0; i < here.length; i++) {
      setCssStyle(here.item(i), "background-color", "#98989800");

    }
    
    var elements = document.getElementsByClassName("ic-DashboardCard");
    for (var i = 0; i < elements.length; i++) {
      setCssStyle(elements.item(i), "border-radius", "12px");
    }

    var bar = document.getElementsByClassName("ic-DashboardCard__action-container");
    for (var i = 0; i < bar.length; i++) {
      setCssStyle(bar.item(i), "display", "none");
    }

    var classnames = document.getElementsByClassName("ic-DashboardCard__header-title ellipsis");
    for (var i = 0; i < classnames.length; i++) {
      setCssStyle(classnames.item(i).firstChild, "font-size", "large");
      setCssStyle(classnames.item(i).firstChild, "display", "inline-block");
      setCssStyle(classnames.item(i).firstChild, "margin-bottom", "5%");
    }

    /*
    var her = document.getElementsByClassName("accessible-toggler");
    for (var i = 0; i < her.length; i++) {
      setCssStyle(her.item(i), "color", "#989898");

    }

    var hebr = document.getElementsByClassName("btn");
    for (var i = 0; i < hebr.length; i++) {
      setCssStyle(hebr.item(i), "background-color", "#ffffff00");
      setCssStyle(hebr.item(i), "color", "#c1c1c1");
    }

    if (document.getElementById("search_term")) {
      setCssStyle(document.getElementById("search_term"), "background", "#fff0")
    }

    if (document.getElementsByClassName("header-bar-right").item(0)) {
      setCssStyle(document.getElementsByClassName("header-bar-right").item(0), "display", "none !important")
    }


    var subtitles = document.getElementsByClassName("ic-DashboardCard__header-subtitle ellipsis");
    for (var i = 0; i < subtitles.length; i++) {
      setCssStyle(subtitles.item(i), "display", "none");
    }
  */
    setCheckAll("accessible-toggler", "color", "#989898")
    setCheckID("search_term", "background-color", "#ffffff00")
    setCheckWithClass("header-bar-right", "display", "none","!important")
    setCheckAll("ic-DashboardCard__header-subtitle ellipsis", "display", "none")
    setCheckAll("ic-DashboardCard__header-term ellipsis", "display", "none")
    setCheckID("assignments-student-footer", "background-color", "rgb(38,38,38")
    setCheckAll("assignment-student-header", "background-color", "#ffffff00")
    /*
    var subsubtitles = document.getElementsByClassName("ic-DashboardCard__header-term ellipsis");
    for (var i = 0; i < subsubtitles.length; i++) {
      setCssStyle(subsubtitles.item(i), "display", "none");
    }
    var hdr = document.getElementsByClassName("assignment-student-header");
    for (var i = 0; i < hdr.length; i++) {
      setCssStyle(hdr.item(i), "background-color", "#35353500");
    }
    if (document.getElementById("assignments-student-footer")) {
      setCssStyle(document.getElementById("assignments-student-footer"), "background-color", "rgb(38,38,38)")
    }
    */

    chrome.storage.local.get("mode", function (items) {
      if (items.mode == "dark") {
        setCheckAll("btn", "background-color", "#ffffff00")
        setCheckAll("btn", "color", "#c1c1c1")
        if (document.getElementById("minical")) {
          setCssStyle(document.getElementById("minical"), "background-color", "#13131300")
        }
        var heres = document.getElementsByClassName("ig-header");
    for (var i = 0; i < heres.length; i++) {
      setCssStyle(heres.item(i), "background-color", "#1b1b1b");
      setCssStyle(heres.item(i), "color", "#1b1b1b");
    }
        var bar = document.getElementsByClassName("btn button-sidebar-wide");
        for (var i = 0; i < bar.length; i++) {
          setCssStyle(bar.item(i), "background", "#272727");
          setCssStyle(bar.item(i), "color", "#c5c5c5");
          setCssStyle(bar.item(i), "border-color", "#5f5f5f");
        }

        var hdr3 = document.getElementsByClassName("assignment-student-header");
        for (var i = 0; i < hdr3.length; i++) {
          setCssStyle(hdr3.item(i), "background-color", "rgb(38,38,38)");
        }

        if (document.getElementById("assignments-student-footer")) {
          setCssStyle(document.getElementById("assignments-student-footer"), "background-color", "rgb(38,38,38)")
        }

        var bar = document.getElementsByClassName("Button button-sidebar-wide");
        for (var i = 0; i < bar.length; i++) {
          setCssStyle(bar.item(i), "background", "#272727");
          setCssStyle(bar.item(i), "color", "#c5c5c5");
          setCssStyle(bar.item(i), "border-color", "#5f5f5f");
        }

        var dcpror = document.getElementsByClassName("ic-DashboardCard__header_content");
        for (var i = 0; i < dcpror.length; i++) {
          setCssStyle(dcpror.item(i), "background-color", "#262626");
        }
      } else if (items.mode == "custom") {
        chrome.storage.local.get("bgcolor", function (items) {
          if(items.bgcolor) {
            var hdr = document.getElementsByClassName("assignment-student-header");
        for (var i = 0; i < hdr.length; i++) {
          setCssStyle(hdr.item(i), "background-color", items.bgcolor);
        }
        if (document.getElementById("assignments-student-footer")) {
          setCssStyle(document.getElementById("assignments-student-footer"), "background-color", items.bgcolor)
        }
          } else {
            var hdr = document.getElementsByClassName("assignment-student-header");
            for (var i = 0; i < hdr.length; i++) {
              setCssStyle(hdr.item(i), "background-color", "rgb(255,255,255)");
            }
            if (document.getElementById("assignments-student-footer")) {
              setCssStyle(document.getElementById("assignments-student-footer"), "background-color", "rgb(255,255,255)")
            }
          }
        });
      } else {
        chrome.storage.local.get("bgcolor", function (items) {
          if(items.bgcolor) {
            var hdr = document.getElementsByClassName("assignment-student-header");
        for (var i = 0; i < hdr.length; i++) {
          setCssStyle(hdr.item(i), "background-color", items.bgcolor);
        }
        if (document.getElementById("assignments-student-footer")) {
          setCssStyle(document.getElementById("assignments-student-footer"), "background-color", items.bgcolor)
        }
          } else {
            var hdr = document.getElementsByClassName("assignment-student-header");
            for (var i = 0; i < hdr.length; i++) {
              setCssStyle(hdr.item(i), "background-color", "rgb(255,255,255)");
            }
            if (document.getElementById("assignments-student-footer")) {
              setCssStyle(document.getElementById("assignments-student-footer"), "background-color", "rgb(255,255,255)")
            }
          }
        });
      }
    
    });
    var modes = document.getElementsByClassName("ig-row");
        for (var r = 0; r < modes.length; r++) {
          setCssStyle(modes.item(r), "background-color", "#fff0");

        }
    if (document.getElementById("context-list-holder")) {
      setCssStyle(document.getElementById("context-list-holder"), "background-color", "#ffffff00")
    }
    
    var herer = document.getElementsByClassName("fc-event");
    for (var i = 0; i < herer.length; i++) {
      setCssStyle(herer.item(i), "background-color", "#ffffff00");

    }
    setTimeout(function () {
      var here2r = document.getElementsByClassName("fc-event");
      for (var i = 0; i < here2r.length; i++) {
        setCssStyle(here2r.item(i), "background-color", "#ffffff00");

      }
    }, 2500);
    fadeOutEffect(document.getElementById("loadoverlay"))
  }, 500);
}

function loadpage(evt) {


  //setTimeout(function () {
    setCssStyle(document.body, "transition-duration", "0.25s")
    //document.body.innerHTML = document.body.innerHTML + "<h6 style=\"text-align: center; margin-bottom: 2%\">BetterCanvas / Created by James Wilson 2021</h6>";

    var elements = document.getElementsByClassName("ic-DashboardCard");
    for (var i = 0; i < elements.length; i++) {
      setCssStyle(elements.item(i), "border-radius", "12px");
    }

    var bar = document.getElementsByClassName("ic-DashboardCard__action-container");
    for (var i = 0; i < bar.length; i++) {
      setCssStyle(bar.item(i), "display", "none");
    }

    var classnames = document.getElementsByClassName("ic-DashboardCard__header-title ellipsis");
    for (var i = 0; i < classnames.length; i++) {
      setCssStyle(classnames.item(i).firstChild, "font-size", "large");
      setCssStyle(classnames.item(i).firstChild, "display", "inline-block");
      setCssStyle(classnames.item(i).firstChild, "margin-bottom", "5%");
    }



    var subtitles = document.getElementsByClassName("ic-DashboardCard__header-subtitle ellipsis");
    for (var i = 0; i < subtitles.length; i++) {
      setCssStyle(subtitles.item(i), "display", "none");
    }

    var subsubtitles = document.getElementsByClassName("ic-DashboardCard__header-term ellipsis");
    for (var i = 0; i < subsubtitles.length; i++) {
      setCssStyle(subsubtitles.item(i), "display", "none");
    }

    if (document.getElementsByClassName("ic-Dashboard-header").item(0)) {
      //setCssStyle(document.getElementsByClassName("ic-Dashboard-header").item(0), "display", "none !important")
    }

    var list = document.getElementById("menu");   // Get the <ul> element with id="menu"
    //list.removeChild(list.children[6]);
    //list.removeChild(list.children[5]);
    var ret = list.appendChild(list.children[1].cloneNode(true));
    ret.querySelector("a").href = "/bettercanvas"
    ret.querySelector("a").querySelector(".menu-item__text").textContent = "BetterCanvas"


    //setCssStyle(document.body, "background-image", "url(https://res.cloudinary.com/calm-com/image/upload/v1582139698/jasper-lake.jpg)") no need for this anymore

    if (document.getElementsByClassName("header-bar").item(0)) {
      setCssStyle(document.getElementsByClassName("header-bar").item(0), "background-color", "#fff0")


    }

    if (document.getElementsByClassName("ic-app-nav-toggle-and-crumbs no-print").item(0)) {
      setCssStyle(document.getElementsByClassName("ic-app-nav-toggle-and-crumbs no-print").item(0), "display", "none !important")


    }

    //var links = document.querySelectorAll("a");
    //for (var i = 0; i < links.length; i++) {
    //  setCssStyle(document.querySelectorAll("a").item(i), "color", "#292929")
    //}

    if (document.getElementById("breadcrumbs")) {
      setCssStyle(document.getElementById("breadcrumbs"), "background-color", "#fff0")

    }


    setCssStyle(document.getElementsByClassName("ic-app-header").item(0), "background-color", "var(--ic-brand-global-nav-bgd)")
    setCssStyle(document.getElementsByClassName("ic-app-header").item(0), "border-radius", "15px")
    setCssStyle(document.getElementsByClassName("ic-app-header").item(0), "margin-left", "0.5%")
    setCssStyle(document.getElementsByClassName("ic-app-header").item(0), "margin-top", "0.5%")
    setCssStyle(document.getElementsByClassName("ic-app-header").item(0), "height", "85%")
    setCssStyle(document.getElementsByClassName("ic-app-header").item(0), "box-shadow", "rgb(150, 150, 150) -1px 0px 20px 0px")

    setCssStyle(document.getElementsByClassName("ic-app-main-content__secondary").item(0), "background-color", "rgb(255,255,255)")
    setCssStyle(document.getElementsByClassName("ic-app-main-content__secondary").item(0), "border-radius", "10px")
    setCssStyle(document.getElementsByClassName("ic-app-main-content__secondary").item(0), "margin-top", "0.5%")
    setCssStyle(document.getElementsByClassName("ic-app-main-content__secondary").item(0), "box-shadow", "rgb(200, 200, 200) -1px 0px 20px 0px")
    setCssStyle(document.getElementsByClassName("ic-app-main-content__secondary").item(0), "margin-right", "1%")

    if (document.getElementsByClassName("ic-app-header__secondary-navigation").item(0)) {
      setCssStyle(document.getElementsByClassName("ic-app-header__secondary-navigation").item(0), "display", "none")
    }
    if (document.getElementsByClassName("ic-Dashboard-header__layout").item(0)) {
      setCssStyle(document.getElementsByClassName("ic-Dashboard-header__layout").item(0), "border-bottom", "0px")
    }
    if (document.getElementsByClassName("ic-Dashboard-header__title").item(0)) {
      setCssStyle(document.getElementsByClassName("ic-Dashboard-header__title").item(0), "margin-top", "2%")
      setCssStyle(document.getElementsByClassName("ic-Dashboard-header__title").item(0), "margin-left", "0.5%")
    }



    var checks = document.getElementsByClassName("icon-check")
    for (var i = 0; i < checks.length; i++) {
      setCssStyle(checks.item(i), "color", "#868686")
    }

    chrome.storage.local.get("showlogo", function (items) {
      if (items.showlogo) {
        if (items.showlogo == "yes") {
          // do nothing
        } else {
          setCssStyle(document.getElementsByClassName("ic-app-header__logomark-container").item(0), "display", "none !important")
        }
      }
    });

    if (document.getElementsByClassName("module-sequence-footer-content").item(0)) {
      setCssStyle(document.getElementsByClassName("module-sequence-footer-content").item(0), "display", "none !important")
    }
    if (document.getElementsByClassName("todo-list-header").item(0)) {
      setCssStyle(document.getElementsByClassName("todo-list-header").item(0), "margin-top", "0%")
    }
    if (document.getElementById("footer")) {
      setCssStyle(document.getElementById("footer"), "display", "none !important")
    }

    var menutexts = document.getElementsByClassName("menu-item__text")
    for (var i = 0; i < menutexts.length; i++) {
      if (menutexts.item(i).textContent.includes("Help")) {
        //menutexts.item(i).innerHTML = " BetterCanvas "
      }
    }

    //if(document.getElementById("global_nav_help_link")) {
    //document.getElementById("global_nav_help_link").href = "/bettercanvas"
    //}

    var elemDiv = document.createElement('p');
    elemDiv.style.cssText = 'margin-top:5%;text-align:center;margin-bottom:5%';
    elemDiv.innerHTML = "BetterCanvas " + ver + " - Created by James Wilson"
    document.body.appendChild(elemDiv);
    if (document.getElementsByClassName("ic-icon-svg ic-icon-svg--dashboard").item(1)) {
      var actr = document.getElementsByClassName("ic-icon-svg ic-icon-svg--dashboard").item(1)
      var parent = actr.parentNode
      parent.parentNode.parentNode.classList.remove("ic-app-header__menu-list-item--active")
      removeAllChildNodes(parent)
      parent.innerHTML = '<svg width="25" height="25"><circle cx="12" cy="15" r="10" stroke-width="4" fill="currentColor"></circle></svg>'
    }

    if (document.getElementById("context_external_tool_1885_menu_item")) {
      setCssStyle(document.getElementById("context_external_tool_1885_menu_item"), "display", "none !important")
    }

    chrome.storage.local.get("mode", function (items) {
      if (items.mode == "custom") {
        console.log("custom")
        chrome.storage.local.get("scolor", function (items) {
          if (items.scolor) {
            if (document.getElementsByClassName("ic-app-main-content__secondary").item(0)) {
              setCssStyle(document.getElementsByClassName("ic-app-main-content__secondary").item(0), "box-shadow", items.scolor + " -1px 0px 20px 0px")
            }
            if (document.getElementById("header")) {
              setCssStyle(document.getElementById("header"), "box-shadow", items.scolor + " -1px 0px 20px 0px")
            }
          }
        });

        chrome.storage.local.get("rightbar", function (items) {
          if (items.rightbar) {
            setCssStyle(document.getElementById("right-side-wrapper"), "background-color", items.rightbar)
          }
        });
        chrome.storage.local.get("bgcolor", function (items) {
          if (items.bgcolor) {

            if (document.getElementsByClassName("ic-Dashboard-header__layout").item(0)) {
              setCssStyle(document.getElementsByClassName("ic-Dashboard-header__layout").item(0), "background-color", items.bgcolor)
            }
            setCssStyle(document.body, "background-color", items.bgcolor)
            chrome.storage.local.get("bgImg", function (itemsBG) {
              var url = itemsBG.bgImg

              console.log(url)
              if (url) {
                document.head.insertAdjacentHTML("beforeend", `<style>body::before {      content: "";background-color:` + items.bgcolor + `;background-image: url('` + url + `');background-size: auto auto;position: fixed;top: 0px;right: 0px;bottom: 0px;left: 0px;opacity: 0.3;}</style>`)
              } else {
                document.head.insertAdjacentHTML("beforeend", `<style>body::before {      content: "";background-color:` + items.bgcolor + `;background-size: auto auto;position: fixed;top: 0px;right: 0px;bottom: 0px;left: 0px;opacity: 0.3;}</style>`)

              }
            });
          } else {


            chrome.storage.local.get("bgImg", function (itemsBG) {
              var url = itemsBG.bgImg

              console.log(url)
              if (url) {
                document.head.insertAdjacentHTML("beforeend", `<style>body::before {      content: "";;background-image: url('` + url + `');background-size: auto auto;position: fixed;top: 0px;right: 0px;bottom: 0px;left: 0px;opacity: 0.3;}</style>`)

              }
            });
          }
        });




        chrome.storage.local.get("leftbar", function (items) {
          if (items.leftbar) {
            document.documentElement.style.setProperty("--ic-brand-global-nav-bgd", items.leftbar)
          }
        });

        chrome.storage.local.get("textcolor", function (items) {
          if (items.textcolor) {
            document.documentElement.style.setProperty("--ic-brand-font-color-dark", items.textcolor)
            setCssStyle(document.body, "color", items.textcolor)
          }
        });

        chrome.storage.local.get("linkcolor", function (items) {
          if (items.linkcolor) {
            document.documentElement.style.setProperty("--ic-link-color", items.linkcolor)
            document.documentElement.style.setProperty("--ic-link-color-darkened-10", items.linkcolor)
            document.documentElement.style.setProperty("--eHiXd-linkColor", items.linkcolor)
            document.documentElement.style.setProperty("--eHiXd-linkHoverColor", items.linkcolor)
            document.documentElement.style.setProperty("--ic-brand-global-nav-ic-icon-svg-fill--active", items.linkcolor)
          } else {
            document.documentElement.style.setProperty("--ic-link-color", "#2e2e2e")
            document.documentElement.style.setProperty("--ic-link-color-darkened-10", "#2e2e2e")
            document.documentElement.style.setProperty("--eHiXd-linkColor", "#2e2e2e")
            document.documentElement.style.setProperty("--eHiXd-linkHoverColor", "#2e2e2e")
            document.documentElement.style.setProperty("--ic-brand-global-nav-ic-icon-svg-fill--active", "#2e2e2e")
          }
        });


        document.documentElement.style.setProperty("--fOyUs-backgroundPrimary", "#ffffff00")
        document.documentElement.style.setProperty("--fQfxa-secondaryBackground", "#ffffff00")

        document.documentElement.style.setProperty("--qBMHb-background", "#ffffff00")
        document.documentElement.style.setProperty("--pFBbo-background", "#ffffff00")
        document.documentElement.style.setProperty("--dIgyp-background", "#26262600")
        document.documentElement.style.setProperty("--eHiXd-lightBackground", "#d4d4d400")
        document.documentElement.style.setProperty("--voGQb-background", "#c5c5c500")


      } else if (items.mode == "light") {
        console.log("light mode")
        document.documentElement.style.setProperty("--ic-link-color", "#2e2e2e")
        document.documentElement.style.setProperty("--ic-link-color-darkened-10", "#2e2e2e")
        document.documentElement.style.setProperty("--eHiXd-linkColor", "#2e2e2e")
        document.documentElement.style.setProperty("--eHiXd-linkHoverColor", "#2e2e2e")
        document.documentElement.style.setProperty("--ic-brand-global-nav-ic-icon-svg-fill--active", "#2e2e2e")
        chrome.storage.local.get("bgImg", function (items) {
          var url = items.bgImg

          console.log(url)
          if (url) {
            document.head.insertAdjacentHTML("beforeend", `<style>body::before {      content: "";background-image: url('` + url + `');background-size: auto auto;position: fixed;top: 0px;right: 0px;bottom: 0px;left: 0px;opacity: 0.3;}</style>`)
          }
        });
      } else if (items.mode == "dark") {
        console.log("dark mode")
        chrome.storage.local.get("bgImg", function (items) {
          var url = items.bgImg

          console.log(url)
          if (url) {
            document.head.insertAdjacentHTML("beforeend", `<style>body::before {      content: "";background-color: rgb(15,15,15);background-image: url('` + url + `');background-size: auto auto;position: fixed;top: 0px;right: 0px;bottom: 0px;left: 0px;opacity: 0.3;}</style>`)
          }
        });
        document.documentElement.style.setProperty("--ic-link-color", "#9c9c9c")
        document.documentElement.style.setProperty("--ic-link-color-darkened-10", "#c4c4c4")
        document.documentElement.style.setProperty("--eHiXd-linkColor", "#9c9c9c")
        document.documentElement.style.setProperty("--eHiXd-linkHoverColor", "#c4c4c4")
        document.documentElement.style.setProperty("--jpyTq-color", "#575757")
        document.documentElement.style.setProperty("--ctrLD-color", "#575757")
        document.documentElement.style.setProperty("--ic-brand-global-nav-menu-item__text-color--active", "#404040")
        document.documentElement.style.setProperty("--ic-brand-global-nav-ic-icon-svg-fill--active", "#404040")
        document.documentElement.style.setProperty("--ic-brand-global-nav-bgd", "#262626")
        document.documentElement.style.setProperty("--ic-brand-global-nav-logo-bgd", "#1a1a1a")
        document.documentElement.style.setProperty("--MlJlv-textColor", "#919191")
        document.documentElement.style.setProperty("--fCrpb-color", "#919191")
        document.documentElement.style.setProperty("--fOyUs-backgroundPrimary", "#ffffff00")
        document.documentElement.style.setProperty("--fQfxa-secondaryBackground", "#ffffff00")
        document.documentElement.style.setProperty("--fQfxa-secondaryColor", "#e1e1e1")
        document.documentElement.style.setProperty("--qBMHb-color", "#e1e1e1")
        document.documentElement.style.setProperty("--qBMHb-background", "#ffffff00")
        document.documentElement.style.setProperty("--pFBbo-background", "#ffffff00")
        document.documentElement.style.setProperty("--pFBbo-color", "#acacac")
        document.documentElement.style.setProperty("--dIgyp-background", "#26262600")
        document.documentElement.style.setProperty("--eHiXd-iconColor", "#d4d4d4")
        document.documentElement.style.setProperty("--eHiXd-lightBackground", "#d4d4d400")
        document.documentElement.style.setProperty("--eHiXd-lightColor", "#c5c5c5")
        document.documentElement.style.setProperty("--voGQb-background", "#c5c5c500")
        document.documentElement.style.setProperty("--voGQb-color", "#c5c5c5")
        document.documentElement.style.setProperty("--fLzZc-background", "#171717")
        if (document.getElementById("right-side-wrapper")) {
          setCssStyle(document.getElementById("right-side-wrapper"), "background-color", "#262626")
        }
        if (document.getElementsByClassName("item-group-container").item(0)) {
          setCssStyle(document.getElementsByClassName("item-group-container").item(0), "background-color", "#26262600")
        }
        if (document.getElementsByClassName("home active").item(0)) {
          setCssStyle(document.getElementsByClassName("home active").item(0), "border-left", "2px solid #bbbbbb")
          setCssStyle(document.getElementsByClassName("home active").item(0), "color", "#bbbbbb")
        }
        if (document.getElementsByClassName("grades active").item(0)) {
          setCssStyle(document.getElementsByClassName("grades active").item(0), "border-left", "2px solid #bbbbbb")
          setCssStyle(document.getElementsByClassName("grades active").item(0), "color", "#bbbbbb")
        }
        if (document.getElementsByClassName("assignments active").item(0)) {
          setCssStyle(document.getElementsByClassName("assignments active").item(0), "border-left", "2px solid #bbbbbb")
          setCssStyle(document.getElementsByClassName("assignments active").item(0), "color", "#bbbbbb")
        }
        if (document.getElementsByClassName("blog active").item(0)) {
          setCssStyle(document.getElementsByClassName("blog active").item(0), "border-left", "2px solid #bbbbbb")
          setCssStyle(document.getElementsByClassName("blog active").item(0), "color", "#bbbbbb")
        }
        setCssStyle(document.body, "color", "#262626")
        setCssStyle(document.body, "background-color", "#262626 !important")
        if (document.getElementsByClassName("ic-app-header").item(0)) {
          setCssStyle(document.getElementsByClassName("ic-app-header").item(0), "box-shadow", "rgb(0, 0, 0) -1px 0px 20px 0px")
        }
        if (document.getElementsByClassName("ic-app-main-content__secondary").item(0)) {
          setCssStyle(document.getElementsByClassName("ic-app-main-content__secondary").item(0), "box-shadow", "rgb(0, 0, 0) -1px 0px 20px 0px")
        }

        document.documentElement.style.setProperty("--ic-brand-font-color-dark", "#999999")
        setCssStyle(document.body, "color", "#999999")

        setCheckWithClass("ic-Dashboard-header__layout", "background-color", "rgb(39 39 39 / 95%)")


        document.getElementById("global_nav_courses_link").onclick = function () {
          setCssStyle(document.getElementsByClassName("navigation-tray-container courses-tray").item(0), "background-color", "rgb(15, 15, 15)")
        }

        var bar = document.getElementsByClassName("btn button-sidebar-wide");
        for (var i = 0; i < bar.length; i++) {
          setCssStyle(bar.item(i), "background", "#272727");
          setCssStyle(bar.item(i), "color", "#c5c5c5");
          setCssStyle(bar.item(i), "border-color", "#5f5f5f");
        }

        var hdr = document.getElementsByClassName("assignment-student-header");
        for (var i = 0; i < hdr.length; i++) {
          setCssStyle(hdr.item(i), "background-color", "rgb(38, 38, 38)");

        }



        if (document.getElementById("assignments-student-footer")) {
          setCssStyle(document.getElementById("assignments-student-footer"), "background-color", "rgb(38, 38, 38)")
        }

        var bar = document.getElementsByClassName("Button button-sidebar-wide");
        for (var i = 0; i < bar.length; i++) {
          setCssStyle(bar.item(i), "background", "#272727");
          setCssStyle(bar.item(i), "color", "#c5c5c5");
          setCssStyle(bar.item(i), "border-color", "#5f5f5f");
        }

        var mode = document.getElementsByClassName("name");
        for (var i = 0; i < mode.length; i++) {
          setCssStyle(mode.item(i), "text-shadow", "none");

        }

        var mode4 = document.getElementsByClassName("ig-header header");
        for (var e = 0; e < mode4.length; e++) {
          setCssStyle(mode4.item(e), "background-color", "#fff0");

        }

        var modes = document.getElementsByClassName("ig-row");
        for (var r = 0; r < modes.length; r++) {
          setCssStyle(modes.item(r), "background-color", "#fff0");

        }

        var modes3 = document.getElementsByClassName("context_module_item_hover");
        for (var f = 0; f < modes3.length; f++) {
          setCssStyle(modes3.item(f), "background-color", "#0000004d");
          console.log("ran")
        }

        if (document.getElementById("context_modules_sortable_container")) {
          setCssStyle(document.getElementById("context_modules_sortable_container"), "background-color", "#fff0");
        }



      }
    });
  //}, 0);

}