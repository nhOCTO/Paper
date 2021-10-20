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

function reloadCanvas() {
    chrome.tabs.query({},function(tabs){     
        tabs.forEach(function(tab){
            if(tab.url.includes("issaquah.instructure.com")) {
                chrome.tabs.reload(tab.id);
            }
          console.log(tab.url);
        });
     });
}

chrome.storage.local.get("showlogo", function (items) {
    if (items.showlogo && items.showlogo == "no") {
        document.getElementById('showlogo').checked = false
    }
});
chrome.storage.local.get("trans", function (items) {
    if (items.trans && items.trans == "no") {
        document.getElementById('trans').checked = false
    }
});

chrome.storage.local.get("leftbar", function (items) {
    if (items.leftbar) {
        document.getElementById('leftbar').value = items.leftbar
    }
});

chrome.storage.local.get("mode", function (items) {
    if (items.mode) {
        if(items.mode == "light") {
            document.getElementById("lm").checked = true
            document.getElementById("cm").checked = false
            document.getElementById("dm").checked = false
            setCssStyle(document.body, "color", "rgb(0,0,0)")
            setCssStyle(document.body, "background-color", "rgb(255,255,255)")
            setCssStyle(document.getElementById("customtheme"), "display", "none")
        } else if (items.mode == "dark") {
            document.getElementById("lm").checked = false
            document.getElementById("cm").checked = false
            document.getElementById("dm").checked = true
            setCssStyle(document.body, "color", "#dedede")
            setCssStyle(document.body, "background-color", "#171717")
            setCssStyle(document.getElementById("customtheme"), "display", "none")
        } else if (items.mode == "custom") {
            document.getElementById("lm").checked = false
            document.getElementById("cm").checked = true
            document.getElementById("dm").checked = false
            setCssStyle(document.body, "color", "rgb(0,0,0)")
            setCssStyle(document.body, "background-color", "rgb(255,255,255)")
            setCssStyle(document.getElementById("customtheme"), "display", "block")
        }
    }
});

chrome.storage.local.get("rightbar", function (items) {
    if (items.rightbar) {
        document.getElementById('rightbar').value = items.rightbar
    }
});

chrome.storage.local.get("bgcolor", function (items) {
    if (items.bgcolor) {
        document.getElementById('bgcolor').value = items.bgcolor
    }
});

chrome.storage.local.get("scolor", function (items) {
    if (items.scolor) {
        document.getElementById('scolor').value = items.scolor
    }
});

chrome.storage.local.get("linkcolor", function (items) {
    if (items.linkcolor) {
        document.getElementById('link').value = items.linkcolor
    }
});

chrome.storage.local.get("textcolor", function (items) {
    if (items.textcolor) {
        document.getElementById('textcolor').value = items.textcolor
    }
});


document.getElementById("reset").onclick = function () {
    chrome.storage.local.set({ "leftbar": null }, function () {
        document.getElementById("leftbar").value = "#7f8d39"
        swal("Success!", "Successfully reset left bar color!", "success")
        reloadCanvas()
    });
}

document.getElementById("resets").onclick = function () {
    chrome.storage.local.set({ "scolor": null }, function () {
        document.getElementById("scolor").value = "#2e2e2e"
        swal("Success!", "Successfully reset shadow color!", "success")
        reloadCanvas()
    });
}

document.getElementById("resetbgc").onclick = function () {
    chrome.storage.local.set({ "bgcolor": null }, function () {
        document.getElementById("bgcolor").value = "#ffffff"
        swal("Success!", "Successfully reset background color!", "success")
        reloadCanvas()
    });
}

document.getElementById("resetl").onclick = function () {
    chrome.storage.local.set({ "linkcolor": null }, function () {
        document.getElementById("link").value = "#2e2e2e"
        swal("Success!", "Successfully reset link color!", "success")
        reloadCanvas()
    });
}

document.getElementById("resetright").onclick = function () {
    chrome.storage.local.set({ "rightbar": null }, function () {
        document.getElementById("rightbar").value = "#ffffff"
        swal("Success!", "Successfully reset right bar color!", "success")
        reloadCanvas()
    });
}

document.getElementById("resetbg").onclick = function () {
    chrome.storage.local.set({ "bgImg": null }, function () {
        swal("Success!", "Successfully removed background image!", "success")
        reloadCanvas()
    });
}

document.getElementById("resettc").onclick = function () {
    chrome.storage.local.set({ "textcolor": null }, function () {
        document.getElementById("textcolor").value = "#2e2e2e"
        swal("Success!", "Successfully reset text color!", "success")
        reloadCanvas()
    });
}

document.getElementById('file_upload').addEventListener('change', handleFileSelect, false);
function handleFileSelect(event) {
    const reader = new FileReader();
    reader.addEventListener('load', event => {
        chrome.storage.local.set({ "bgImg": event.target.result }, function () {
            console.log("Successfully set img");
            swal("Success!", "Successfully set and saved background image!", "success")
            reloadCanvas()
        });
    });
    reader.readAsDataURL(document.getElementById("file_upload").files[0]);
}

document.getElementById('leftbar').addEventListener('change', handleBareeeChange, false);
function handleBareeeChange(event) {
    chrome.storage.local.set({ "leftbar": document.getElementById("leftbar").value }, function () {
        console.log("Successfully set leftbar");
        swal("Success!", "Successfully set and saved left bar color!", "success")
        reloadCanvas()
    });
}

document.getElementById('rightbar').addEventListener('change', handleBarrChange, false);
function handleBarrChange(event) {
    chrome.storage.local.set({ "rightbar": document.getElementById("rightbar").value }, function () {
        console.log("Successfully set rightbar");
        swal("Success!", "Successfully set and saved right bar color!", "success")
        reloadCanvas()
    });
}

document.getElementById('link').addEventListener('change', handleProChange, false);
function handleProChange(event) {
    chrome.storage.local.set({ "linkcolor": document.getElementById("link").value }, function () {
        console.log("Successfully set link");
        swal("Success!", "Successfully set and saved link color!", "success")
        reloadCanvas()
    });
}

document.getElementById('textcolor').addEventListener('change', handleProEChange, false);
function handleProEChange(event) {
    chrome.storage.local.set({ "textcolor": document.getElementById("textcolor").value }, function () {
        console.log("Successfully set textcolor");
        swal("Success!", "Successfully set and saved text color!", "success")
        reloadCanvas()
    });
}

document.getElementById('bgcolor').addEventListener('change', handleProErChange, false);
function handleProErChange(event) {
    chrome.storage.local.set({ "bgcolor": document.getElementById("bgcolor").value }, function () {
        console.log("Successfully set bgcolor");
        swal("Success!", "Successfully set and saved background color!", "success")
        reloadCanvas()
    });
}

document.getElementById('scolor').addEventListener('change', handleProEeerChange, false);
function handleProEeerChange(event) {
    chrome.storage.local.set({ "scolor": document.getElementById("scolor").value }, function () {
        console.log("Successfully set scolor");
        swal("Success!", "Successfully set and saved shadow color!", "success")
        reloadCanvas()
    });
}

document.getElementById('showlogo').addEventListener('change', handleEvrrChange, false);
function handleEvrrChange(event) {
    if (document.getElementById('showlogo').checked) {
        chrome.storage.local.set({ "showlogo": "yes" }, function () {
            console.log("Successfully set link");
            swal("Success!", "Successfully turned on logo!", "success")
            reloadCanvas()
        });
    } else {
        chrome.storage.local.set({ "showlogo": "no" }, function () {
            console.log("Successfully set link");
            swal("Success!", "Successfully turned off logo!", "success")
            reloadCanvas()
        });
    }
}

document.getElementById('trans').addEventListener('change', handleEvrrrChange, false);
function handleEvrrrChange(event) {
    if (document.getElementById('trans').checked) {
        chrome.storage.local.set({ "trans": "yes" }, function () {
            console.log("Successfully set trans");
            swal("Success!", "Successfully turned on transition screen!", "success")
            reloadCanvas()
        });
    } else {
        chrome.storage.local.set({ "trans": "no" }, function () {
            console.log("Successfully set trans");
            swal("Success!", "Successfully turned off transition screen!", "success")
            reloadCanvas()
        });
    }
}

document.getElementById('lm').addEventListener('change', handleEvChange, false);
function handleEvChange(event) {
    chrome.storage.local.set({ "mode": "light" }, function () {
        console.log("Successfully set lm");
        swal("Success!", "Successfully set to light mode!", "success")
        setCssStyle(document.getElementById("customtheme"), "display", "none")
        setCssStyle(document.body, "color", "rgb(0,0,0)")
        setCssStyle(document.body, "background-color", "rgb(255,255,255)")
        reloadCanvas()
    });
}

document.getElementById('dm').addEventListener('change', handleEveChange, false);
function handleEveChange(event) {
    chrome.storage.local.set({ "mode": "dark" }, function () {
        console.log("Successfully set dm");
        swal("Success!", "Successfully set to dark mode!", "success")
        setCssStyle(document.getElementById("customtheme"), "display", "none")
        setCssStyle(document.body, "color", "#dedede")
        setCssStyle(document.body, "background-color", "#171717")
        reloadCanvas()
    });
}

document.getElementById('cm').addEventListener('change', handleEvwChange, false);
function handleEvwChange(event) {
    chrome.storage.local.set({ "mode": "custom" }, function () {
        console.log("Successfully set cm");
        swal("Success!", "Successfully set to custom mode!", "success")
        setCssStyle(document.getElementById("customtheme"), "display", "block")
        setCssStyle(document.body, "color", "rgb(0,0,0)")
        setCssStyle(document.body, "background-color", "rgb(255,255,255)")
        reloadCanvas()
    });
}

