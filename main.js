// main.js
const wait = (ms) => {
return new Promise((resolve) => {
setTimeout(resolve, ms);
});
};
document.getElementById("btn-delay").addEventListener("click", async () => {
const out = document.getElementById("out-delay");
out.textContent = "Waiting 2 seconds...";
await wait(2000);
out.textContent = "Done!";
});

const fakeApi = (label, ms) => wait(ms).then(() => `[${label}]`);
document.getElementById("btn-chain").addEventListener("click", () => {
const out = document.getElementById("out-chain");
out.textContent = "Starting chain...\n";
fakeApi("Login", 500)
.then((r) => {
out.textContent += r + "\n";
return fakeApi("Fetch Profile", 700);
})
.then((r) => {
out.textContent += r + "\n";
return fakeApi("Fetch Posts", 500);
})
.then((r) => {
out.textContent += r + "\n";
out.textContent += "All done!";
})
.catch((err) => {
out.textContent += "Error: " + err.message;
});
});

document.getElementById("btn-async").addEventListener("click", async () => {
const out = document.getElementById("out-async");
out.textContent = "Starting async...\n";
try {
out.textContent += (await fakeApi("Login", 500)) + "\n";
out.textContent += (await fakeApi("Fetch Profile", 700)) + "\n";
out.textContent += (await fakeApi("Fetch Posts", 500)) + "\n";
out.textContent += "All done!";
} catch (err) {
out.textContent += "Error: " + err.message;
}
});
