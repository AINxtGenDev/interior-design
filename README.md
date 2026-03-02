# 🏠 Mag. Claudia PLESSL — Interior Design

> 🌿 Individuelle Raumgestaltung mit Stil und Persönlichkeit

---

## 🌐 Website

The business website is live on GitHub Pages:

🔗 **[ainxtgendev.github.io/interior-design](https://ainxtgendev.github.io/interior-design/)**

Built with **Next.js**, **Tailwind CSS**, and the Salbeigruen & Anthrazitgrau brand palette. Self-hosted Google Fonts for DSGVO compliance. Deployed automatically via GitHub Actions on every push to `main`.

| Detail | Value |
|---|---|
| 🛠️ Stack | Next.js 16 · Tailwind CSS 4 · TypeScript |
| 🎨 Colors | Sage green (`#7a9468`) · Anthracite gray (`#333338`) |
| ✍️ Fonts | Playfair Display · Inter · Montserrat |
| 📂 Source | [`website/`](website/) |
| 🚀 Deploy | GitHub Actions → GitHub Pages (static export) |

---

## 🏠 Floor Plan Converter

> 🎨 Automated conversion of customer floor plans into production-ready **DXF files** for [pCon.planner](https://pcon-planner.com/) 8.13

Interior designers receive rough floor plans from customers — often just a 📸 **photo** of a sketch or a 📄 **PDF** from an architect. This toolset transforms them into CAD-quality floor plans:

1. 🔍 **Analyzes** the source image — extracts every dimension, wall, opening, and fixture
2. ⚙️ **Generates** a properly structured DXF file using Python + [ezdxf](https://ezdxf.readthedocs.io/)
3. 📐 **Outputs** a file that imports directly into pCon.planner with correct scale, layers, and symbols

The result? A floor plan ready for 🪑 furniture placement, 🏗️ room planning, and 🖥️ 3D visualization!

---

## 📁 Project Structure

```
📦 interior-design/
├── 🌐 website/                  → Next.js website (deployed to GitHub Pages)
│   ├── src/app/page.tsx         → Landing page
│   ├── src/app/layout.tsx       → Root layout with fonts + metadata
│   └── src/app/globals.css      → Tailwind theme + base styles
├── 📘 SKILL.md                  → AI skill definition (workflow + templates + best practices)
├── 🐍 generate_pietzinger.py    → Python script for the Pietzinger floor plan
├── 📐 plan-pietzinger.dxf       → ✅ Generated DXF (ready for pCon.planner!)
├── 🖼️ plan-pietzinger.jpg       → Source: customer floor plan photo
├── 📄 plan-koeck.pdf            → Source: customer floor plan PDF (⏳ pending)
├── 🖥️ a.png                     → pCon.planner version reference screenshot
└── 📋 SESSION_CHECKPOINT.md     → Session state and extraction notes
```

---

## 🏗️ Generated Floor Plans

### ✅ Pietzinger — Completed

Source image `plan-pietzinger.jpg` → converted to `plan-pietzinger.dxf`

| 🏷️ Property | 📏 Value |
|---|---|
| 🛋️ Main room (Wohnküche) | 710 × 454 cm (32.2 m²) |
| 🚿 Bathroom / WC | 86 × 227 cm (2.0 m²) |
| 🧱 Exterior walls | 25 cm thick |
| 🧱 Interior partitions | 15 cm thick |
| 🪟 Windows | West 120 cm · North 120 cm + 300 cm (3-pane) |
| 📊 DXF entities | 88 across 15 layers |
| 💾 File size | 82 KB |

### ⏳ Koeck — Pending

Source PDF `plan-koeck.pdf` — not yet processed.

---

## 🔧 How It Works

### 📏 Step 1: Dimension Extraction

Dimensions are read from the source plan image. German/Austrian plans annotate in **centimeters** — all values are converted to **millimeters** for the DXF (`cm × 10 = mm`).

Cross-validation ensures every measurement adds up:

```
🔢 South wall:  384 + 64 + 262       = 710 cm ✅
🔢 West wall:   196 + 120 + 188      = 504 cm ✅
🔢 North wall:  100 + 120 + 100 + 60 + 300 + 30 = 710 cm ✅
```

### 🐍 Step 2: DXF Generation

The Python script produces a **DXF R2010** file with:

| Feature | Detail |
|---|---|
| 📐 **Units** | Millimeters (`$INSUNITS = 4`) — matches pCon.planner |
| 🧱 **Walls** | Closed LWPOLYLINE rectangles with solid hatch fills |
| 📏 **Dimensions** | ARCHTICK style, `dimlfac=0.1` displays values in cm |
| 🗂️ **Layers** | AIA-based naming — each element type on its own layer |
| 📊 **Scale bar** | 1000 mm = 1 m reference for post-import verification |

### 🗂️ Layer Structure

| Layer | 🎨 Color | 📦 Content |
|---|---|---|
| `A-WALL` | ⬜ White | Exterior wall outlines |
| `A-WALL-HATCH` | ⬛ Dark gray | Wall solid fills |
| `A-WALL-INTR` | 🩶 Light gray | Interior partition walls |
| `A-DOOR` | 🔴 Red | Door openings + swing arcs |
| `A-WIND` | 🔵 Blue | Window openings + glazing |
| `A-ROOM` | 🟢 Green | Room boundary outlines |
| `A-ROOM-NAME` | 🟡 Yellow | Room labels + area text |
| `A-FIXT-KITCH` | 🟠 Orange | Kitchen fixtures (cooktop) |
| `A-FIXT-BATH` | 🩵 Light blue | Bathroom fixtures (toilet, basin) |
| `A-DIMS` | 🟡 Yellow | Interior dimension lines |
| `A-DIMS-EXT` | 🟢 Green | Exterior dimension lines |
| `A-GRID` | ⬛ Dark gray | Scale reference + construction lines |

---

## 🚀 Usage

### 📦 Prerequisites

```bash
pip install ezdxf
```

> Requires **Python 3.8+**

### ▶️ Generate a DXF

```bash
python3 generate_pietzinger.py
```

Output: `plan-pietzinger.dxf` 🎉

### 📥 Import into pCon.planner

1. Open **pCon.planner 8.13**
2. 📂 **File → Import → Geometry**
3. Select the `.dxf` file
4. Set **Insert Unit** → `Millimeter`
5. Set **Default Scaling Unit** → `Millimeter`
6. Click **OK** ✅

### ✅ Verify Scale

After import, use pCon.planner's **Measure** tool:

- 📏 Scale reference bar = **1000 mm = 1.0 m**
- 📐 Room width = **710 cm** (7100 mm)

> ⚠️ If scale is off, adjust **Default Scaling Unit** under `Application Menu → Settings → Load tab`

---

## 🆕 Creating New Floor Plans

The `SKILL.md` file contains the complete workflow for processing new customer plans:

1. 🔍 Analyze the source image — extract all dimensions
2. 📍 Set the coordinate system (origin at bottom-left interior corner)
3. 🔄 Convert all measurements from cm → mm
4. 🧱 Use helper functions: `draw_wall_rect()`, `draw_window_horiz()`, `draw_door()`, etc.
5. 📏 Add dimensions, room labels, and a scale bar
6. 💾 Save and verify the DXF output

> 💡 See `generate_pietzinger.py` for a complete working example!

---

## 🧠 Technical Decisions

| Decision | 💡 Rationale |
|---|---|
| 📄 **DXF R2010** (not DWG) | `ezdxf` generates open DXF format; pCon.planner imports natively |
| 📐 **Millimeters** base unit | Matches pCon.planner internals; zero scaling errors |
| 🧱 **Closed LWPOLYLINE** walls | Lightweight + enables pCon.planner room detection |
| 📏 **ARCHTICK** dimensions | Architectural standard ticks — cleaner than arrows |
| 📐 **Axis-aligned rectangles** | Cleaner geometry; easier to verify and modify |
| 🗂️ **Separate layers** | Standard CAD practice; toggle visibility in pCon.planner |

---

## 📄 DXF vs DWG

This toolset generates **DXF** (open format), not proprietary DWG. pCon.planner imports DXF natively — **no conversion needed**.

If DWG is required:
- 🔄 pCon.planner: `File → Export → Geometry → DWG`
- 🔄 [ODA File Converter](https://www.opendesign.com/guestfiles/oda_file_converter) (free batch conversion)

---

## 📚 References

- 🌐 [pCon.planner Help Center](https://help.pcon-planner.com/de/help/index.html?introduction.htm)
- 🆕 [pCon.planner 8.13 Features](https://www.easterngraphics.com/pcon/en/2025/11/17/pcon-planner-8-13-all-new-features-explained/)
- 📖 [ezdxf Documentation](https://ezdxf.readthedocs.io/)
- 📐 [ezdxf Units Reference](https://ezdxf.readthedocs.io/en/stable/concepts/units.html)

---

<p align="center">
  Made with ❤️ for interior designers who deserve better floor plans
</p>
