let headerOpen = false;

document.getElementById("header-burger").addEventListener("click", () => {
    const headerTarget = headerOpen ? "100vw" : "-7vw";
    animate([{
        targets: "header",
        left: headerTarget
    }])
    headerOpen = !headerOpen;
})