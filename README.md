# Code Snapshot

**Code Snapshot** is a lightweight tool that converts pasted code into **beautiful, social-media-ready PNG images**.
It provides a **clean browser interface**, a **VS Code–style editor**, and a **Mac terminal–style preview** so you can see your snapshot before downloading.

Perfect for sharing code snippets on:

- LinkedIn
- Twitter / X
- Dev communities
- Blogs
- Tutorials
- Documentation

---

## Features

- VS Code–style **code editor**
- **Mac terminal styled snapshots**
- **Live preview** before download
- **PNG export** for social media posts
- Clean and minimal UI
- Fast backend powered by FastAPI
- Syntax-ready structure for future highlighting

---

## Demo Workflow

1. Open the web interface
2. Paste your code into the editor
3. Click **Generate Snapshot**
4. Preview the generated image
5. Download the PNG

---

## Tech Stack

Backend

- FastAPI
- Pillow

Frontend

- HTML
- CSS
- JavaScript
- Monaco Editor (VS Code editor)

Libraries

- Pygments (planned for syntax highlighting)

---

## Installation

Clone the repository

```bash
git clone https://github.com/yourusername/code-snapshot.git
cd code-snapshot
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

## Running the App

Start the development server

```bash
uvicorn app:app --reload
```

Open the browser

```bash
http://localhost:8000
```

---

## Project Structure

```txt
code-snapshot
│
├── app.py                 # FastAPI application
├── generator.py           # Image generation logic
├── requirements.txt
├── README.md
│
├── templates
│   └── index.html         # Web UI
│
├── static
│   └── style.css          # UI styling
│
└── outputs                # Generated images (optional)
```

---

## Example Snapshot

The generated image mimics a **Mac terminal window**:

```cpp
🔴 🟡 🟢

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int,int> mp;
        ...
    }
};
```

This format works well for **technical posts and educational content**.

---

## Future Improvements

Planned upgrades for the project:

- Syntax highlighting in images
- Multiple color themes
- Export as SVG
- Copy image to clipboard
- Line numbers toggle
- Background gradients
- Custom image size
- Watermark / branding
- Dark / light modes
- VS Code theme support

---

## License

MIT License

---

## Author

**Md. Maruf Sarker**

Software Engineering Enthusiast
Competitive Programmer
Content Creator for Tech Learners
