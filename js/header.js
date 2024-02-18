let headerOpen = false;

document.getElementById("header-burger").addEventListener("click", () => {
    const headerTarget = headerOpen ? "-50vh" : "0vh";
    animate([{
        targets: "header nav",
        top: headerTarget
    }])
    headerOpen = !headerOpen;
})