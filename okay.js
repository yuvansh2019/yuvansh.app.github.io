function trackAdminAccess() {
  let userAgent = navigator.userAgent;
  let time = new Date().toLocaleString();

  console.log("Admin accessed!");
  console.log("Time:", time);
  console.log("Device:", userAgent);

  alert("Admin access detected!");
}