export const showToast = () => {
  const toast = document.getElementById("toast");
  const progress = document.getElementById("progress");
  progress.classList.add("active");
  toast.classList.add("active");
};

export const closeToast = () => {
  const toast = document.getElementById("toast");
  const progress = document.getElementById("progress");
  progress.classList.remove("active");
  toast.classList.remove("active");
};
