window.onload = () => {
  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  for (const heading of headings) {
    const id = heading.id;

    const link = document.createElement("a");

    link.href = `#${id}`;

    link.classList.add("heading-link");
    link.textContent = "#";

    heading.appendChild(link);
  }
};
