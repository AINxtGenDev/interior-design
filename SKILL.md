# pCon.planner Floor Plan Conversion Skill

## Overview

Senior pCon.planner expert skill for converting customer-provided floor plans (PDF, JPG, PNG, scanned images) into production-ready DXF/DWG files optimized for **pCon.planner 8.13 Update 1**. The output file must open in pCon.planner with correct scale, proper layer structure, and be immediately usable for interior planning, furniture placement, and room design.

## Target Application

- **Software**: pCon.planner 8.13 Update 1 (EasternGraphics GmbH)
- **Editions**: STD, ME, PRO
- **Import Formats**: DWG (*.dwg), DXF (*.dxf), DWT (*.dwt)
- **Primary Tool**: Python `ezdxf` library (generates DXF R2010+ files, fully compatible with pCon.planner DWG/DXF import)

## Core Workflow

When the user provides a customer floor plan (PDF, JPG, or image), follow these steps:

### Step 1: Analyze the Source Plan

1. **Read the file** — use the Read tool for images (JPG, PNG) or PDF files
2. **Extract all dimensions** — identify every measurement annotation in the plan (in cm or mm)
3. **Identify room boundaries** — walls, openings, doors, windows
4. **Note wall thicknesses** — if visible (common: 10cm, 12cm, 15cm, 20cm, 24cm, 30cm, 36.5cm)
5. **Identify fixtures** — doors (swing direction), windows, kitchen fixtures, bathroom fixtures
6. **Determine the coordinate system** — pick a logical origin (typically bottom-left exterior corner)
7. **Create a dimension map** — list all extracted measurements as structured data before coding

### Step 2: Generate the DXF File with Python ezdxf

**CRITICAL RULES for pCon.planner Compatibility:**

```
- DXF Version: R2010 (best compatibility with pCon.planner 8.x)
- Units: MILLIMETERS (doc.units = units.MM)
- All coordinates in millimeters
- $INSUNITS = 4 (millimeters)
- $MEASUREMENT = 1 (metric)
- $LUNITS = 2 (decimal)
- $LUPREC = 0 (precision: 0 decimal places for mm)
- All walls drawn as closed LWPOLYLINE rectangles (not individual lines)
- Hatches for wall fills (SOLID or ANSI31 pattern)
- Linear dimensions for all annotated measurements
```

### Step 3: Layer Structure (pCon.planner Optimized)

Use this standardized layer naming convention. pCon.planner recognizes layers with the `*_D3_*` naming scheme for 3D content and `_MODEL` suffix for model layers.

```python
LAYERS = {
    # --- Structural Layers ---
    "A-WALL": {
        "color": 7,        # White/Black (auto)
        "description": "Exterior and interior wall outlines (2D polylines)"
    },
    "A-WALL-HATCH": {
        "color": 8,        # Dark gray
        "description": "Wall fill hatches (solid or cross-hatch)"
    },
    "A-WALL-INTR": {
        "color": 9,        # Light gray
        "description": "Interior partition walls (thinner walls)"
    },

    # --- Openings ---
    "A-DOOR": {
        "color": 1,        # Red
        "description": "Door openings, swing arcs, door leaves"
    },
    "A-WIND": {
        "color": 5,        # Blue
        "description": "Window openings and glazing lines"
    },

    # --- Room Elements ---
    "A-ROOM": {
        "color": 3,        # Green
        "description": "Room boundary outlines (for pCon room recognition)"
    },
    "A-ROOM-NAME": {
        "color": 2,        # Yellow
        "description": "Room name labels and area text"
    },

    # --- Fixtures ---
    "A-FIXT-KITCH": {
        "color": 30,       # Orange
        "description": "Kitchen fixtures (stove, sink, countertops)"
    },
    "A-FIXT-BATH": {
        "color": 140,      # Light blue
        "description": "Bathroom fixtures (toilet, shower, bathtub, sink)"
    },
    "A-FIXT-STAIR": {
        "color": 6,        # Magenta
        "description": "Stairs and ramps"
    },

    # --- Annotations ---
    "A-DIMS": {
        "color": 2,        # Yellow
        "description": "Dimension lines and measurement text"
    },
    "A-TEXT": {
        "color": 7,        # White/Black
        "description": "General text annotations and notes"
    },
    "A-GRID": {
        "color": 8,        # Dark gray
        "description": "Reference grid and construction lines"
    },

    # --- Reference ---
    "A-REF-IMAGE": {
        "color": 253,      # Very light gray
        "description": "Source plan image reference (for tracing verification)"
    },
    "DEFPOINTS": {
        "color": 7,        # Non-printing layer (AutoCAD/pCon standard)
        "description": "Dimension definition points (non-printing)"
    }
}
```

### Step 4: Python Script Template

```python
#!/usr/bin/env python3
"""
pCon.planner Floor Plan Generator
Converts analyzed customer floor plan dimensions into a DXF file
optimized for pCon.planner 8.13.

Usage: python3 generate_floorplan.py
Output: floorplan.dxf (open in pCon.planner via File > Import > DXF)
"""

import ezdxf
from ezdxf import units
from ezdxf.enums import TextEntityAlignment
import math

# ============================================================
# CONFIGURATION
# ============================================================

OUTPUT_FILE = "floorplan.dxf"
DXF_VERSION = "R2010"

# Scale: ALL values in MILLIMETERS
# Example: a wall 710cm long = 7100mm

# Dimension style settings (optimized for 1:100 print scale)
DIM_TEXT_HEIGHT = 25.0      # mm (2.5mm at 1:100)
DIM_ARROW_SIZE = 15.0       # mm
DIM_OFFSET = 100.0          # mm offset from walls for dimension lines
DIM_GAP = 8.0               # mm gap between dim text and line
TEXT_HEIGHT = 30.0           # mm for room labels
WALL_TEXT_HEIGHT = 20.0      # mm for wall dimension annotations

# ============================================================
# DOCUMENT SETUP
# ============================================================

def create_document():
    """Create a new DXF document optimized for pCon.planner."""
    doc = ezdxf.new(DXF_VERSION, setup=True)

    # Set units to millimeters
    doc.units = units.MM
    doc.header["$INSUNITS"] = 4          # 4 = Millimeters
    doc.header["$MEASUREMENT"] = 1       # 1 = Metric
    doc.header["$LUNITS"] = 2            # 2 = Decimal
    doc.header["$LUPREC"] = 0            # 0 decimal places (whole mm)
    doc.header["$AUNITS"] = 0            # 0 = Decimal degrees
    doc.header["$AUPREC"] = 2            # 2 decimal places for angles

    # Set drawing limits (adjust to your plan size + margin)
    doc.header["$LIMMIN"] = (-1000, -1000)
    doc.header["$LIMMAX"] = (15000, 12000)

    # Set extents (will be updated by entities)
    doc.header["$EXTMIN"] = (0, 0, 0)
    doc.header["$EXTMAX"] = (12000, 10000, 0)

    return doc


def setup_layers(doc):
    """Create all layers with proper colors and linetypes."""
    layers = doc.layers

    # Wall layers
    layers.add("A-WALL", color=7, linetype="Continuous")
    layers.add("A-WALL-HATCH", color=8, linetype="Continuous")
    layers.add("A-WALL-INTR", color=9, linetype="Continuous")

    # Openings
    layers.add("A-DOOR", color=1, linetype="Continuous")
    layers.add("A-WIND", color=5, linetype="Continuous")

    # Room elements
    layers.add("A-ROOM", color=3, linetype="Continuous")
    layers.add("A-ROOM-NAME", color=2, linetype="Continuous")

    # Fixtures
    layers.add("A-FIXT-KITCH", color=30, linetype="Continuous")
    layers.add("A-FIXT-BATH", color=140, linetype="Continuous")
    layers.add("A-FIXT-STAIR", color=6, linetype="Continuous")

    # Annotations
    layers.add("A-DIMS", color=2, linetype="Continuous")
    layers.add("A-TEXT", color=7, linetype="Continuous")
    layers.add("A-GRID", color=8, linetype="DASHED")

    # Reference
    layers.add("A-REF-IMAGE", color=253, linetype="Continuous")


def setup_dim_style(doc):
    """Create architectural dimension style for pCon.planner."""
    dimstyle = doc.dimstyles.new("PCON_ARCH")
    dimstyle.dxf.dimtxt = DIM_TEXT_HEIGHT       # Text height
    dimstyle.dxf.dimasz = DIM_ARROW_SIZE        # Arrow size
    dimstyle.dxf.dimexo = 30                    # Extension line offset
    dimstyle.dxf.dimexe = 30                    # Extension beyond dim line
    dimstyle.dxf.dimgap = DIM_GAP               # Text gap
    dimstyle.dxf.dimclrd = 2                    # Dim line color (yellow)
    dimstyle.dxf.dimclre = 2                    # Extension line color
    dimstyle.dxf.dimclrt = 2                    # Text color
    dimstyle.dxf.dimtad = 1                     # Text above dim line
    dimstyle.dxf.dimlfac = 0.1                  # Scale factor: mm -> cm display
    dimstyle.dxf.dimrnd = 1.0                   # Round to 1mm
    dimstyle.dxf.dimdec = 0                     # 0 decimal places
    dimstyle.dxf.dimdsep = ord(".")             # Decimal separator
    dimstyle.dxf.dimpost = "<>cm"               # Suffix: "cm"
    dimstyle.dxf.dimblk = "ARCHTICK"            # Architectural tick marks
    return dimstyle


def setup_text_style(doc):
    """Create text style for room labels."""
    style = doc.styles.new("PCON_LABEL")
    style.dxf.font = "Arial"
    style.dxf.height = 0   # Variable height (set per entity)
    return style


# ============================================================
# DRAWING HELPERS
# ============================================================

def draw_wall(msp, x1, y1, x2, y2, thickness, layer="A-WALL"):
    """
    Draw a wall as a closed LWPOLYLINE rectangle with hatch fill.

    Parameters:
        x1, y1: Start point (mm, exterior face)
        x2, y2: End point (mm, exterior face)
        thickness: Wall thickness in mm
        layer: Target layer name
    """
    # Calculate wall rectangle perpendicular to wall direction
    dx = x2 - x1
    dy = y2 - y1
    length = math.sqrt(dx * dx + dy * dy)

    if length == 0:
        return

    # Normal vector (perpendicular, pointing inward)
    nx = -dy / length * thickness
    ny = dx / length * thickness

    # Four corners of the wall rectangle
    p1 = (x1, y1)
    p2 = (x2, y2)
    p3 = (x2 + nx, y2 + ny)
    p4 = (x1 + nx, y1 + ny)

    # Draw wall outline as closed polyline
    points = [p1, p2, p3, p4]
    msp.add_lwpolyline(
        points,
        close=True,
        dxfattribs={"layer": layer}
    )

    # Add solid hatch fill
    hatch = msp.add_hatch(
        color=8,
        dxfattribs={"layer": "A-WALL-HATCH"}
    )
    hatch.paths.add_polyline_path(
        [(p[0], p[1]) for p in points],
        is_closed=True
    )


def draw_door(msp, x, y, width, angle_start=0, swing="left", layer="A-DOOR"):
    """
    Draw a door symbol (opening line + swing arc).

    Parameters:
        x, y: Door hinge point (mm)
        width: Door width in mm (e.g., 800, 900, 1000)
        angle_start: Wall direction angle in degrees
        swing: "left" or "right"
        layer: Target layer
    """
    # Door opening line
    rad = math.radians(angle_start)
    x2 = x + width * math.cos(rad)
    y2 = y + width * math.sin(rad)

    msp.add_line(
        (x, y), (x2, y2),
        dxfattribs={"layer": layer}
    )

    # Swing arc (90 degrees)
    if swing == "left":
        start_angle = angle_start
        end_angle = angle_start + 90
    else:
        start_angle = angle_start - 90
        end_angle = angle_start

    msp.add_arc(
        center=(x, y),
        radius=width,
        start_angle=start_angle,
        end_angle=end_angle,
        dxfattribs={"layer": layer, "linetype": "DASHED"}
    )


def draw_window(msp, x1, y1, x2, y2, wall_thickness, layer="A-WIND"):
    """
    Draw a window symbol (double line with glazing arcs).

    Parameters:
        x1, y1: Window start point on wall exterior face (mm)
        x2, y2: Window end point on wall exterior face (mm)
        wall_thickness: Wall thickness in mm
        layer: Target layer
    """
    dx = x2 - x1
    dy = y2 - y1
    length = math.sqrt(dx * dx + dy * dy)

    if length == 0:
        return

    # Normal vector
    nx = -dy / length * wall_thickness
    ny = dx / length * wall_thickness

    # Exterior line
    msp.add_line((x1, y1), (x2, y2), dxfattribs={"layer": layer})

    # Interior line
    msp.add_line(
        (x1 + nx, y1 + ny),
        (x2 + nx, y2 + ny),
        dxfattribs={"layer": layer}
    )

    # Center glazing line
    cx = nx / 2
    cy = ny / 2
    msp.add_line(
        (x1 + cx, y1 + cy),
        (x2 + cx, y2 + cy),
        dxfattribs={"layer": layer}
    )

    # Glazing arcs (semicircles along window width)
    num_panes = max(1, round(length / 600))  # ~600mm per pane
    pane_width = length / num_panes

    for i in range(num_panes):
        # Midpoint of each pane
        t = (i + 0.5) / num_panes
        mid_x = x1 + dx * t + cx
        mid_y = y1 + dy * t + cy

        arc_radius = pane_width / 2
        wall_angle = math.degrees(math.atan2(dy, dx))

        msp.add_arc(
            center=(mid_x, mid_y),
            radius=arc_radius,
            start_angle=wall_angle,
            end_angle=wall_angle + 180,
            dxfattribs={"layer": layer}
        )


def draw_kitchen_fixture(msp, x, y, width, depth, fixture_type="stove",
                         rotation=0, layer="A-FIXT-KITCH"):
    """
    Draw kitchen fixture symbols.

    fixture_type: "stove", "sink", "counter"
    """
    rad = math.radians(rotation)
    cos_r = math.cos(rad)
    sin_r = math.sin(rad)

    def rotate(px, py):
        return (
            x + px * cos_r - py * sin_r,
            y + px * sin_r + py * cos_r
        )

    # Outline
    corners = [
        rotate(0, 0),
        rotate(width, 0),
        rotate(width, depth),
        rotate(0, depth)
    ]
    msp.add_lwpolyline(corners, close=True, dxfattribs={"layer": layer})

    if fixture_type == "stove":
        # Draw 4 burner circles (2x2 grid)
        cx1, cy1 = width * 0.3, depth * 0.35
        cx2, cy2 = width * 0.7, depth * 0.35
        cx3, cy3 = width * 0.3, depth * 0.7
        cx4, cy4 = width * 0.7, depth * 0.7
        r_large = min(width, depth) * 0.15
        r_small = min(width, depth) * 0.12

        for cx, cy, r in [(cx1, cy1, r_large), (cx2, cy2, r_small),
                          (cx3, cy3, r_small), (cx4, cy4, r_large)]:
            center = rotate(cx, cy)
            msp.add_circle(center, r, dxfattribs={"layer": layer})

    elif fixture_type == "sink":
        # Inner bowl rectangle
        margin = min(width, depth) * 0.15
        inner = [
            rotate(margin, margin),
            rotate(width - margin, margin),
            rotate(width - margin, depth - margin),
            rotate(margin, depth - margin)
        ]
        msp.add_lwpolyline(inner, close=True, dxfattribs={"layer": layer})


def draw_bathroom_fixture(msp, x, y, fixture_type="toilet",
                          rotation=0, layer="A-FIXT-BATH"):
    """
    Draw bathroom fixture symbols.

    fixture_type: "toilet", "shower", "bathtub", "washbasin"
    """
    rad = math.radians(rotation)
    cos_r = math.cos(rad)
    sin_r = math.sin(rad)

    def rotate(px, py):
        return (
            x + px * cos_r - py * sin_r,
            y + px * sin_r + py * cos_r
        )

    if fixture_type == "toilet":
        # Tank rectangle (back)
        tank = [rotate(0, 0), rotate(400, 0),
                rotate(400, 150), rotate(0, 150)]
        msp.add_lwpolyline(tank, close=True, dxfattribs={"layer": layer})
        # Bowl (ellipse approximated as arc)
        bowl_center = rotate(200, 400)
        msp.add_circle(bowl_center, 180, dxfattribs={"layer": layer})

    elif fixture_type == "washbasin":
        # Semi-circular basin
        center = rotate(300, 0)
        msp.add_arc(
            center=center, radius=250,
            start_angle=rotation, end_angle=rotation + 180,
            dxfattribs={"layer": layer}
        )
        # Back wall line
        p1 = rotate(50, 0)
        p2 = rotate(550, 0)
        msp.add_line(p1, p2, dxfattribs={"layer": layer})

    elif fixture_type == "shower":
        # Square tray
        corners = [rotate(0, 0), rotate(900, 0),
                   rotate(900, 900), rotate(0, 900)]
        msp.add_lwpolyline(corners, close=True, dxfattribs={"layer": layer})
        # Drain circle
        drain = rotate(450, 450)
        msp.add_circle(drain, 40, dxfattribs={"layer": layer})


def add_room_label(msp, x, y, name, area_sqm=None, layer="A-ROOM-NAME"):
    """
    Add a room name label with optional area.

    Parameters:
        x, y: Center position (mm)
        name: Room name (e.g., "Wohnzimmer", "Kuche")
        area_sqm: Optional area in square meters
    """
    msp.add_mtext(
        name,
        dxfattribs={
            "layer": layer,
            "char_height": TEXT_HEIGHT,
            "insert": (x, y),
            "attachment_point": 5,   # Middle center
        }
    )

    if area_sqm is not None:
        msp.add_mtext(
            f"{area_sqm:.1f} m\\S2;",
            dxfattribs={
                "layer": layer,
                "char_height": TEXT_HEIGHT * 0.7,
                "insert": (x, y - TEXT_HEIGHT * 1.5),
                "attachment_point": 5,
            }
        )


def add_dimension(msp, p1, p2, offset=150, layer="A-DIMS"):
    """
    Add an aligned dimension between two points.

    Parameters:
        p1: First point (x, y) in mm
        p2: Second point (x, y) in mm
        offset: Distance of dimension line from measured points (mm)
        layer: Target layer
    """
    dim = msp.add_aligned_dim(
        p1=p1,
        p2=p2,
        distance=offset,
        dimstyle="PCON_ARCH",
        override={"dimtad": 1},
        dxfattribs={"layer": layer}
    )
    dim.render()


def add_scale_reference(msp, origin=(0, -500), length=1000):
    """
    Add a 1-meter scale reference bar for verification in pCon.planner.

    This allows the user to verify correct scale after import by measuring
    the reference bar with pCon.planner's measurement tool.
    """
    x, y = origin

    # Scale bar line (1000mm = 1m)
    msp.add_line(
        (x, y), (x + length, y),
        dxfattribs={"layer": "A-GRID", "lineweight": 50}
    )

    # Tick marks at ends
    msp.add_line(
        (x, y - 50), (x, y + 50),
        dxfattribs={"layer": "A-GRID", "lineweight": 30}
    )
    msp.add_line(
        (x + length, y - 50), (x + length, y + 50),
        dxfattribs={"layer": "A-GRID", "lineweight": 30}
    )

    # Label
    msp.add_mtext(
        f"SCALE REFERENCE: {length}mm = {length/1000:.1f}m",
        dxfattribs={
            "layer": "A-GRID",
            "char_height": 20,
            "insert": (x + length / 2, y - 80),
            "attachment_point": 8,   # Bottom center
        }
    )


# ============================================================
# MAIN GENERATION FUNCTION
# ============================================================

def generate_floorplan():
    """
    Generate the floor plan DXF file.

    MODIFY THIS FUNCTION with the actual measurements extracted
    from the customer's floor plan.
    """
    doc = create_document()
    setup_layers(doc)
    setup_dim_style(doc)
    setup_text_style(doc)
    msp = doc.modelspace()

    # --------------------------------------------------------
    # ADD YOUR FLOOR PLAN GEOMETRY HERE
    # All coordinates in MILLIMETERS from origin (0, 0)
    # --------------------------------------------------------

    # Example: Exterior walls
    # draw_wall(msp, x1, y1, x2, y2, thickness_mm)
    # draw_wall(msp, 0, 0, 7100, 0, 360)         # South wall
    # draw_wall(msp, 7100, 0, 7100, 4540, 360)    # East wall
    # draw_wall(msp, 7100, 4540, 0, 4540, 360)    # North wall
    # draw_wall(msp, 0, 4540, 0, 0, 360)          # West wall

    # Example: Door
    # draw_door(msp, 3840, 0, 900, angle_start=90, swing="left")

    # Example: Window
    # draw_window(msp, 1000, 4540, 2200, 4540, 360)

    # Example: Room label
    # add_room_label(msp, 3550, 2270, "Wohnzimmer", area_sqm=32.2)

    # Example: Dimensions
    # add_dimension(msp, (0, 0), (7100, 0), offset=-200)

    # Scale reference bar (ALWAYS include for verification)
    add_scale_reference(msp)

    # --------------------------------------------------------
    # SAVE
    # --------------------------------------------------------
    doc.saveas(OUTPUT_FILE)
    print(f"Floor plan saved to: {OUTPUT_FILE}")
    print(f"Units: Millimeters")
    print(f"DXF Version: {DXF_VERSION}")
    print(f"Open in pCon.planner: File > Import > Geometry > DXF")


if __name__ == "__main__":
    generate_floorplan()
```

## pCon.planner Import Settings (User Guidance)

After generating the DXF file, instruct the user to import it with these settings:

### Import Steps

1. **Open pCon.planner** 8.13
2. **File > Import > Geometry** (or drag & drop)
3. Select the generated `.dxf` file
4. In the Import dialog:
   - **Insert Unit**: set to **Millimeter**
   - **Default Scaling Unit**: set to **Millimeter**
5. Click **OK** to import

### Verify Scale

1. Use **Edit > Measure** tool in pCon.planner
2. Measure the **SCALE REFERENCE** bar at the bottom of the drawing
3. It must read exactly **1000mm = 1.0m**
4. If incorrect, adjust the **Default Scaling Unit** in:
   - Application Menu > Settings > Load tab > Default Scaling Unit

### Unit Configuration Checklist

| Setting | Location | Value |
|---------|----------|-------|
| Default Scaling Unit | App Menu > Settings > Load tab | Millimeter |
| Length Unit | App Menu > Settings > Edit tab | Centimeter (for display) |
| Insert Unit | App Menu > Document Properties > Settings | Millimeter |

### After Successful Import

1. **Verify dimensions** — use Measure tool on known walls
2. **Toggle layers** — use Layer Manager to show/hide element groups
3. **Start planning** — use Room Elements > Floor Plan tool to trace over the imported 2D plan and generate 3D walls automatically
4. **Add furniture** — drag from pCon catalogs onto the correctly scaled floor plan

## Measurement Extraction Rules

When reading customer plans, follow these precision rules:

### Reading Dimensions from Plans

1. **Dimensions are typically in centimeters** on German/Austrian architectural plans
2. **Convert to millimeters** for the DXF file: `cm_value * 10 = mm_value`
3. **Common dimension formats**:
   - `710` on plan = 710 cm = 7100 mm (room width)
   - `454` on plan = 454 cm = 4540 mm (room depth)
   - `120` on plan = 120 cm = 1200 mm (window width)
   - `64` on plan = 64 cm = 640 mm (appliance width)
4. **Wall thickness** (if not annotated): assume standard values:
   - Exterior walls: 30-50 cm (300-500 mm)
   - Load-bearing interior: 20-25 cm (200-250 mm)
   - Partition walls: 10-15 cm (100-150 mm)

### Resolving Ambiguities

- If a dimension seems too small for the context (e.g., `15` for a wall segment), it likely refers to a wall thickness or offset, not a room dimension
- Cross-check: room_width = sum_of_segments + wall_thicknesses
- Door widths: typically 60, 70, 80, 90, or 100 cm
- Window widths: typically 60, 80, 100, 120, 150, 180, 200, 240 cm

### Symbol Recognition

| Symbol | Meaning |
|--------|---------|
| Arc with line | Door (arc = swing direction) |
| Three parallel curves / zigzag | Window glazing |
| Circle(s) in rectangle | Stove/cooktop burners |
| Rectangle with inner rectangle | Sink |
| Small circle with tank | Toilet |
| Quarter circle arc | Door swing radius |
| Dashed line | Hidden/overhead elements |
| Crossed hatching | Wall fill (brick/concrete) |
| Diagonal hatching | Cut section fill |

## Best Practices

### Accuracy

- **Always double-check** that opposite walls match: if the room is 710 cm wide, both the top and bottom walls must be exactly 7100 mm apart
- **Verify closure**: wall endpoints must connect precisely (within 1mm tolerance)
- **Cross-validate** cumulative dimensions: `384 + 64 + 262 = 710` (must add up)

### pCon.planner Optimization

- **Closed polylines for walls**: pCon.planner's Floor Plan tool works best when walls are closed shapes it can snap to
- **Separate layers**: keep walls, doors, windows, fixtures on their own layers so pCon users can toggle visibility
- **No overlapping geometry**: ensure wall hatches don't extend into door/window openings
- **Include door swing arcs**: pCon.planner users need these to verify furniture placement clearances
- **Dimension everything**: even if dimensions are visible in the source plan, add DXF dimension entities so they persist in the CAD file

### File Size Optimization

- Use LWPOLYLINE (not old-style POLYLINE) for all polyline entities
- Use SOLID hatches for wall fills (smaller than pattern hatches)
- Avoid excessive arc segmentation (keep arc entities as true arcs, not polyline approximations)
- Target file size: under 500 KB for a typical apartment plan

### Common Pitfalls to Avoid

1. **Wrong units**: forgetting to set INSUNITS=4 causes pCon.planner to misinterpret scale
2. **Mixing units**: using meters for some walls and millimeters for others
3. **Open wall paths**: leaving gaps at wall junctions prevents proper room detection
4. **Missing hatches**: walls without fill are hard to distinguish from other lines
5. **Dimension text too small/large**: always scale dim text relative to the drawing

## Reference Links

- [pCon.planner Help Center](https://help.pcon-planner.com/de/help/index.html?introduction.htm)
- [pCon.planner FAQ](https://pcon-solutions.com/faq-pcon-planner/)
- [Drawing Walls in pCon.planner](http://help.pcon-planner.com/en/help/drawing_walls.htm)
- [DWG Export Settings](http://help.pcon-planner.com/en/help/dwg-export.htm)
- [Supported File Formats](http://help.pcon-planner.com/en/help/supported_formats.htm)
- [Importing PDF Floor Plans (Tutorial)](https://en.blog.pcon-solutions.com/2025/12/17/watch-learn-importing-and-tracing-pdf-floor-plans-in-pcon-planner-web/)
- [Tracing Walls Tutorial](https://www.easterngraphics.com/pcon/en/2023/06/02/watch-and-learn-how-to-properly-trace-walls-in-pcon-planner/)
- [pCon.planner 8.13 Features](https://www.easterngraphics.com/pcon/en/2025/11/17/pcon-planner-8-13-all-new-features-explained/)
- [DXF Units (ezdxf)](https://ezdxf.readthedocs.io/en/stable/concepts/units.html)
- [ezdxf Hatch Tutorial](https://ezdxf.readthedocs.io/en/stable/tutorials/hatch.html)
- [ezdxf LWPolyline Tutorial](https://ezdxf.readthedocs.io/en/stable/tutorials/lwpolyline.html)
- [ezdxf Linear Dimensions](https://ezdxf.readthedocs.io/en/stable/tutorials/linear_dimension.html)
- [AIA CAD Layer Guidelines](https://www.nationalcadstandard.org/ncs5/pdfs/ncs5_clg_lnf.pdf)
- [AutoCAD Standard Layer Names](https://dougseidler.com/lesson/autocad-standard-layer-names-floor-plans/)

## Dependencies

```bash
pip install ezdxf
```

- **Python**: 3.8+
- **ezdxf**: 1.0+ (tested with 1.4.x)
- **Output**: DXF R2010 format (compatible with DWG converters and pCon.planner direct import)

## DXF vs DWG Note

The `ezdxf` library generates **DXF** files (open text-based format), not proprietary DWG files. pCon.planner 8.13 imports DXF files natively with full support. The DXF file functions identically to DWG for floor plan purposes in pCon.planner. If a DWG file is strictly required, the user can:

1. Open the DXF in pCon.planner and re-save as DWG (File > Export > Geometry > DWG)
2. Use the free ODA File Converter (Open Design Alliance) to batch-convert DXF to DWG
3. Use LibreCAD or any other CAD tool that supports DXF-to-DWG conversion
