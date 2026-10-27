:root {
  --green: #176b50;
  --green-dark: #104b39;
  --cream: #f7f8f2;
  --text: #202b25;
  --muted: #69756d;
  --border: #e1e7df;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  color: var(--text);
  background: var(--cream);
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.6;
}

a {
  color: inherit;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px max(5%, calc((100% - 1150px) / 2));
  background: white;
  border-bottom: 1px solid var(--border);
}

.brand {
  font-size: 1.35rem;
  font-weight: 800;
  text-decoration: none;
}

.brand span,
.hero h1 span {
  color: #57a579;
}

.site-header nav {
  display: flex;
  gap: 20px;
}

.site-header nav a {
  text-decoration: none;
  font-weight: 600;
}

.content-section,
.detail-main {
  width: min(1150px, 90%);
  margin: 0 auto;
  padding: 48px 0;
}

.eyebrow {
  color: var(--green);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

h1, h2, h3, p {
  overflow-wrap: anywhere;
}

h2 {
  margin: 0;
  font-size: clamp(1.7rem, 4vw, 2.3rem);
  line-height: 1.2;
}

.muted {
  color: var(--muted);
}

.button {
  display: inline-block;
  padding: 12px 19px;
  border-radius: 10px;
  color: white;
  background: var(--green);
  font-weight: 700;
  text-decoration: none;
}

.button:hover {
  background: var(--green-dark);
}

.site-footer {
  padding: 24px 5%;
  text-align: center;
  color: var(--muted);
  background: white;
  border-top: 1px solid var(--border);
}

@media (max-width: 560px) {
  .site-header {
    padding: 15px 5%;
  }

  .site-header nav {
    gap: 12px;
  }

  .content-section,
  .detail-main {
    padding: 32px 0;
  }
}
