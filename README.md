# Lucas Moraes Mirabeau — Portfolio

Static portfolio site for a Machine Learning Engineer. Built for **GitHub Pages** and a custom domain from **registro.br**.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure |
| `styles.css` | Visual design |
| `content.js` | **Your content** (name, experience, projects) |
| `main.js` | Renders content + light animations |
| `EDITING.md` | How to update text and sections |
| `CNAME` | Custom domain for GitHub Pages |

## Preview locally

```bash
cd mirawebsite
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

Or open `index.html` directly in a browser (some browsers restrict modules; a local server is preferred).

## Deploy to GitHub Pages

### 1. Create a repository

1. On GitHub, create a new repository (for example `mirawebsite` or `yourusername.github.io`).
2. If the repo is **not** named `yourusername.github.io`, the site URL will be `https://yourusername.github.io/REPO_NAME/` until you attach a custom domain.

### 2. Push this project

```bash
cd mirawebsite
git init
git add .
git commit -m "Add ML engineer portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and repository name.

### 3. Enable Pages

1. Open the repo on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)** → **Save**.
4. Wait one or two minutes, then open the URL GitHub shows.

### 4. Connect your registro.br domain

1. Edit [`CNAME`](CNAME) and put your real domain on a single line, for example:
   ```
   www.seudominio.com.br
   ```
2. Commit and push that change.
3. In GitHub → **Settings** → **Pages** → **Custom domain**, enter the same domain and save. Enable **Enforce HTTPS** once DNS is ready (can take minutes to hours).

#### DNS at registro.br

Log in to [registro.br](https://registro.br), open your domain, and edit DNS. Typical setup for GitHub Pages:

**Option A — `www` subdomain (recommended)**

| Type | Name / host | Value |
|------|-------------|--------|
| CNAME | `www` | `YOUR_USERNAME.github.io` |

Then in GitHub Pages, set the custom domain to `www.seudominio.com.br`.

**Option B — apex domain (`seudominio.com.br`)**

GitHub Pages apex domains use **A** records (IPs can change; check [GitHub’s current docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)):

| Type | Name | Value |
|------|------|--------|
| A | `@` (or blank) | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Many people use **both**: apex A records **and** `www` CNAME, then pick one as the primary custom domain in GitHub (GitHub can redirect the other).

Replace `YOUR_USERNAME` with your GitHub username. After DNS propagates, HTTPS should become available in Pages settings.

## Updating content after launch

1. Edit `content.js` (see [EDITING.md](EDITING.md)).
2. Commit and push to `main`.
3. GitHub Pages redeploys automatically in a minute or two.

## License

Content and design are yours to use for your personal portfolio.
