#!/usr/bin/env python3
"""
pCon.planner Floor Plan Generator — Pietzinger Plan
====================================================
Converts the customer floor plan (plan-pietzinger.jpg) into a DXF file
optimized for pCon.planner 8.13 Update 1.

Source: plan-pietzinger.jpg
All dimensions on the source plan are in CENTIMETERS.
All coordinates in this script are in MILLIMETERS (cm × 10).

Origin (0, 0) = bottom-left INTERIOR corner of the main room.
X-axis: left → right (east)
Y-axis: bottom → top (north)

Generated: 2026-03-02
"""

import ezdxf
from ezdxf import units
import math

# ============================================================
# OUTPUT
# ============================================================

OUTPUT_FILE = "/home/wpl/05_development/98_claude_cli/laulau/plan-pietzinger.dxf"
DXF_VERSION = "R2010"

# ============================================================
# EXTRACTED DIMENSIONS (from plan-pietzinger.jpg)
# All converted: cm × 10 = mm
# ============================================================

# Main room interior
ROOM_W = 7100       # 710 cm — total interior width
ROOM_D = 4540       # 454 cm — total interior depth

# Wall thicknesses (derived from exterior vs interior measurements)
# Left wall exterior height: 196+120+188 = 504 cm
# Interior height: 454 cm → difference = 50 cm → ~25 cm per wall
EXT_WALL = 250      # 25 cm exterior walls
INT_WALL = 150      # 15 cm interior / partition walls

# West wall window (left side)
W_WIN_BOT = 1880    # 188 cm from interior bottom to window start
W_WIN_H = 1200      # 120 cm window height

# North wall — left section
N_SEG1 = 1000       # 100 cm solid wall from left corner
N_WIN1_W = 1200     # 120 cm small window
N_SEG2 = 1000       # 100 cm solid wall after window
N_STEP = 600        # 60 cm wall step / column

# North wall — large 3-pane window
N_WIN2_START = N_SEG1 + N_WIN1_W + N_SEG2 + N_STEP  # 3800 mm
N_WIN2_W = 3000     # 300 cm (3 panes × 100 cm)
# Remaining wall after large window: 7100 - 3800 - 3000 = 300 mm (30 cm)

# South wall — kitchen layout
K_LEFT = 3840       # 384 cm from left wall to cooktop
K_STOVE_W = 640     # 64 cm cooktop width
K_RIGHT = 2620      # 262 cm right section
# Verify: 3840 + 640 + 2620 = 7100 ✓

# Bathroom / WC (right side of main room)
BATH_BOT = 920      # 92 cm from main room bottom to bathroom start
BATH_INT_W = 860    # 86 cm interior width
BATH_INT_D = 2270   # 227 cm interior depth
BATH_DOOR_W = 900   # 90 cm door width
BATH_WALL = INT_WALL  # 15 cm partition walls

# Right side — vertical breakdown on east wall of main room
# From bottom: 92cm wall | 16cm partition | 227cm bathroom | remaining = top
EAST_BOT_SEG = 920  # solid wall from y=0 to y=920

# Below south wall
BELOW_OFFSET = 440  # 44 cm offset
CORRIDOR_W = 3890   # 389 cm corridor width
HALLWAY_W = 2220    # 222 cm hallway width

# Top-right area
TOP_RIGHT_W = 1270  # 127 cm (room/balcony width above bathroom)

# ============================================================
# DIMENSION STYLE SETTINGS
# ============================================================

DIM_TEXT_H = 40.0
DIM_ARROW = 25.0
DIM_GAP = 12.0
TEXT_H = 50.0
LABEL_H = 35.0

# ============================================================
# DOCUMENT SETUP
# ============================================================

def create_document():
    doc = ezdxf.new(DXF_VERSION, setup=True)
    doc.units = units.MM
    doc.header["$INSUNITS"] = 4       # Millimeters
    doc.header["$MEASUREMENT"] = 1    # Metric
    doc.header["$LUNITS"] = 2         # Decimal
    doc.header["$LUPREC"] = 0         # 0 decimal places
    doc.header["$AUNITS"] = 0         # Decimal degrees
    doc.header["$AUPREC"] = 2

    # Drawing limits with margin
    doc.header["$LIMMIN"] = (-2000, -2000)
    doc.header["$LIMMAX"] = (12000, 8000)
    doc.header["$EXTMIN"] = (-1500, -1500, 0)
    doc.header["$EXTMAX"] = (10000, 6500, 0)

    return doc


def setup_layers(doc):
    layers = doc.layers
    layers.add("A-WALL", color=7, linetype="Continuous")
    layers.add("A-WALL-HATCH", color=8, linetype="Continuous")
    layers.add("A-WALL-INTR", color=9, linetype="Continuous")
    layers.add("A-WALL-INTR-HATCH", color=251, linetype="Continuous")
    layers.add("A-DOOR", color=1, linetype="Continuous")
    layers.add("A-WIND", color=5, linetype="Continuous")
    layers.add("A-ROOM", color=3, linetype="Continuous")
    layers.add("A-ROOM-NAME", color=2, linetype="Continuous")
    layers.add("A-FIXT-KITCH", color=30, linetype="Continuous")
    layers.add("A-FIXT-BATH", color=140, linetype="Continuous")
    layers.add("A-DIMS", color=2, linetype="Continuous")
    layers.add("A-DIMS-EXT", color=3, linetype="Continuous")
    layers.add("A-TEXT", color=7, linetype="Continuous")
    layers.add("A-GRID", color=8, linetype="DASHED")
    layers.add("A-CORRIDOR", color=252, linetype="Continuous")


def setup_dim_style(doc):
    ds = doc.dimstyles.new("PCON_ARCH")
    ds.dxf.dimtxt = DIM_TEXT_H
    ds.dxf.dimasz = DIM_ARROW
    ds.dxf.dimexo = 40
    ds.dxf.dimexe = 40
    ds.dxf.dimgap = DIM_GAP
    ds.dxf.dimclrd = 2
    ds.dxf.dimclre = 2
    ds.dxf.dimclrt = 2
    ds.dxf.dimtad = 1
    ds.dxf.dimlfac = 0.1     # mm → cm display
    ds.dxf.dimrnd = 1.0
    ds.dxf.dimdec = 0
    ds.dxf.dimdsep = ord(".")
    ds.dxf.dimpost = "<>"    # Just number (cm implied)
    ds.dxf.dimblk = "ARCHTICK"


def setup_text_style(doc):
    if "PCON_LABEL" not in doc.styles:
        s = doc.styles.new("PCON_LABEL")
        s.dxf.font = "Arial"
        s.dxf.height = 0


# ============================================================
# DRAWING HELPERS
# ============================================================

def draw_wall_rect(msp, x, y, w, h, layer="A-WALL", hatch_layer="A-WALL-HATCH"):
    """Draw a wall as axis-aligned rectangle. x,y = bottom-left corner."""
    pts = [(x, y), (x + w, y), (x + w, y + h), (x, y + h)]
    msp.add_lwpolyline(pts, close=True, dxfattribs={"layer": layer})
    hatch = msp.add_hatch(color=8, dxfattribs={"layer": hatch_layer})
    hatch.paths.add_polyline_path(
        [(p[0], p[1]) for p in pts], is_closed=True
    )


def draw_window_horiz(msp, x1, x2, y_ext, wall_t, layer="A-WIND"):
    """Draw a horizontal window (on a horizontal wall). y_ext = exterior face y."""
    y_int = y_ext + wall_t  # interior face (wall_t positive = wall goes up)
    y_mid = y_ext + wall_t / 2

    # Three parallel lines
    msp.add_line((x1, y_ext), (x2, y_ext), dxfattribs={"layer": layer})
    msp.add_line((x1, y_mid), (x2, y_mid), dxfattribs={"layer": layer})
    msp.add_line((x1, y_int), (x2, y_int), dxfattribs={"layer": layer})

    # Glazing arcs (panes)
    width = abs(x2 - x1)
    num_panes = max(1, round(width / 800))
    pane_w = width / num_panes

    for i in range(num_panes):
        cx = x1 + pane_w * (i + 0.5)
        r = pane_w / 2
        # Arc on interior side
        if wall_t > 0:
            msp.add_arc(center=(cx, y_mid), radius=r,
                        start_angle=0, end_angle=180,
                        dxfattribs={"layer": layer})
        else:
            msp.add_arc(center=(cx, y_mid), radius=r,
                        start_angle=180, end_angle=360,
                        dxfattribs={"layer": layer})


def draw_window_vert(msp, y1, y2, x_ext, wall_t, layer="A-WIND"):
    """Draw a vertical window (on a vertical wall). x_ext = exterior face x."""
    x_int = x_ext + wall_t
    x_mid = x_ext + wall_t / 2

    # Three parallel lines
    msp.add_line((x_ext, y1), (x_ext, y2), dxfattribs={"layer": layer})
    msp.add_line((x_mid, y1), (x_mid, y2), dxfattribs={"layer": layer})
    msp.add_line((x_int, y1), (x_int, y2), dxfattribs={"layer": layer})

    # Glazing arcs
    height = abs(y2 - y1)
    num_panes = max(1, round(height / 800))
    pane_h = height / num_panes

    for i in range(num_panes):
        cy = y1 + pane_h * (i + 0.5)
        r = pane_h / 2
        if wall_t > 0:
            msp.add_arc(center=(x_mid, cy), radius=r,
                        start_angle=90, end_angle=270,
                        dxfattribs={"layer": layer})
        else:
            msp.add_arc(center=(x_mid, cy), radius=r,
                        start_angle=270, end_angle=90,
                        dxfattribs={"layer": layer})


def draw_door(msp, hinge_x, hinge_y, width, angle_start, swing_dir, layer="A-DOOR"):
    """
    Draw door symbol.
    angle_start: wall direction in degrees (0=east, 90=north, 180=west, 270=south)
    swing_dir: "cw" (clockwise) or "ccw" (counter-clockwise)
    """
    rad = math.radians(angle_start)
    end_x = hinge_x + width * math.cos(rad)
    end_y = hinge_y + width * math.sin(rad)

    # Door leaf line
    msp.add_line((hinge_x, hinge_y), (end_x, end_y),
                 dxfattribs={"layer": layer})

    # Swing arc
    if swing_dir == "ccw":
        sa = angle_start
        ea = angle_start + 90
    else:
        sa = angle_start - 90
        ea = angle_start

    msp.add_arc(center=(hinge_x, hinge_y), radius=width,
                start_angle=sa, end_angle=ea,
                dxfattribs={"layer": layer, "linetype": "DASHED"})


def draw_cooktop(msp, x, y, w, d, layer="A-FIXT-KITCH"):
    """Draw cooktop with 2 burner circles (as shown in plan: side by side)."""
    # Outline
    pts = [(x, y), (x + w, y), (x + w, y + d), (x, y + d)]
    msp.add_lwpolyline(pts, close=True, dxfattribs={"layer": layer})

    # Two burners side by side (matching the "OO" in the plan)
    r = min(w, d) * 0.18
    cx1 = x + w * 0.33
    cx2 = x + w * 0.67
    cy = y + d * 0.5
    msp.add_circle((cx1, cy), r, dxfattribs={"layer": layer})
    msp.add_circle((cx2, cy), r, dxfattribs={"layer": layer})


def draw_toilet(msp, x, y, rotation=0, layer="A-FIXT-BATH"):
    """Draw toilet symbol (tank + bowl). x,y = back-left corner of tank."""
    rad = math.radians(rotation)
    cos_r = math.cos(rad)
    sin_r = math.sin(rad)

    def rot(px, py):
        return (x + px * cos_r - py * sin_r,
                y + px * sin_r + py * cos_r)

    # Tank (back rectangle): 380×150 mm
    tank = [rot(0, 0), rot(380, 0), rot(380, 150), rot(0, 150)]
    msp.add_lwpolyline(tank, close=True, dxfattribs={"layer": layer})

    # Bowl (oval/circle): center at front, radius 170mm
    bowl = rot(190, 380)
    msp.add_circle(bowl, 170, dxfattribs={"layer": layer})


def draw_washbasin(msp, x, y, rotation=0, layer="A-FIXT-BATH"):
    """Draw washbasin. x,y = back-left corner against wall."""
    rad = math.radians(rotation)
    cos_r = math.cos(rad)
    sin_r = math.sin(rad)

    def rot(px, py):
        return (x + px * cos_r - py * sin_r,
                y + px * sin_r + py * cos_r)

    # Back line against wall: 500mm wide
    p1 = rot(0, 0)
    p2 = rot(500, 0)
    msp.add_line(p1, p2, dxfattribs={"layer": layer})

    # Semi-circular basin
    center = rot(250, 0)
    if rotation == 0:
        msp.add_arc(center=center, radius=230,
                     start_angle=0, end_angle=180,
                     dxfattribs={"layer": layer})
    elif rotation == 90:
        msp.add_arc(center=center, radius=230,
                     start_angle=90, end_angle=270,
                     dxfattribs={"layer": layer})
    elif rotation == 180:
        msp.add_arc(center=center, radius=230,
                     start_angle=180, end_angle=360,
                     dxfattribs={"layer": layer})
    elif rotation == 270:
        msp.add_arc(center=center, radius=230,
                     start_angle=270, end_angle=90,
                     dxfattribs={"layer": layer})


def add_dim(msp, p1, p2, offset=200, layer="A-DIMS"):
    """Add aligned dimension."""
    dim = msp.add_aligned_dim(
        p1=p1, p2=p2, distance=offset,
        dimstyle="PCON_ARCH",
        override={"dimtad": 1},
        dxfattribs={"layer": layer}
    )
    dim.render()


def add_label(msp, x, y, text, height=None, layer="A-ROOM-NAME"):
    """Add centered text label."""
    h = height or TEXT_H
    msp.add_mtext(text, dxfattribs={
        "layer": layer, "char_height": h,
        "insert": (x, y), "attachment_point": 5  # Middle-center
    })


def add_scale_bar(msp, x, y, length=1000):
    """1-meter scale reference bar."""
    msp.add_line((x, y), (x + length, y),
                 dxfattribs={"layer": "A-GRID", "lineweight": 50})
    msp.add_line((x, y - 60), (x, y + 60),
                 dxfattribs={"layer": "A-GRID", "lineweight": 30})
    msp.add_line((x + length, y - 60), (x + length, y + 60),
                 dxfattribs={"layer": "A-GRID", "lineweight": 30})
    # Midpoint tick
    msp.add_line((x + length / 2, y - 40), (x + length / 2, y + 40),
                 dxfattribs={"layer": "A-GRID", "lineweight": 18})
    add_label(msp, x + length / 2, y - 100,
              "MASSSTAB: 1000mm = 1,0m", height=25, layer="A-GRID")


# ============================================================
# MAIN: BUILD THE PIETZINGER FLOOR PLAN
# ============================================================

def generate():
    doc = create_document()
    setup_layers(doc)
    setup_dim_style(doc)
    setup_text_style(doc)
    msp = doc.modelspace()

    # ===========================================================
    # COORDINATE REFERENCE
    # Origin (0,0) = bottom-left interior corner of main room
    # Main room interior: (0,0) to (7100, 4540)
    # ===========================================================

    # -----------------------------------------------------------
    # 1. EXTERIOR WALLS — Main Room
    # -----------------------------------------------------------

    # SOUTH WALL (bottom): y = -EXT_WALL to y = 0, full width + returns
    draw_wall_rect(msp,
                   x=-EXT_WALL, y=-EXT_WALL,
                   w=ROOM_W + EXT_WALL * 2, h=EXT_WALL)

    # WEST WALL (left): x = -EXT_WALL to x = 0
    # Segment below window: y=0 to y=W_WIN_BOT
    draw_wall_rect(msp,
                   x=-EXT_WALL, y=0,
                   w=EXT_WALL, h=W_WIN_BOT)
    # Segment above window: y=W_WIN_BOT+W_WIN_H to y=ROOM_D
    draw_wall_rect(msp,
                   x=-EXT_WALL, y=W_WIN_BOT + W_WIN_H,
                   w=EXT_WALL, h=ROOM_D - (W_WIN_BOT + W_WIN_H))

    # NORTH WALL (top): y = ROOM_D to y = ROOM_D + EXT_WALL
    # Segment 1: x=0 to x=N_SEG1 (100cm solid)
    draw_wall_rect(msp,
                   x=-EXT_WALL, y=ROOM_D,
                   w=N_SEG1 + EXT_WALL, h=EXT_WALL)
    # Segment 2: after window1, x=N_SEG1+N_WIN1_W to x=N_SEG1+N_WIN1_W+N_SEG2
    x_after_win1 = N_SEG1 + N_WIN1_W
    draw_wall_rect(msp,
                   x=x_after_win1, y=ROOM_D,
                   w=N_SEG2, h=EXT_WALL)
    # Step/column: x=x_after_win1+N_SEG2 to +N_STEP
    x_step = x_after_win1 + N_SEG2
    draw_wall_rect(msp,
                   x=x_step, y=ROOM_D,
                   w=N_STEP, h=EXT_WALL)
    # Wall after large window: x=N_WIN2_START+N_WIN2_W to x=ROOM_W
    x_after_win2 = N_WIN2_START + N_WIN2_W
    remaining_north = ROOM_W - x_after_win2
    if remaining_north > 0:
        draw_wall_rect(msp,
                       x=x_after_win2, y=ROOM_D,
                       w=remaining_north, h=EXT_WALL)

    # North wall corner to connect to right side
    draw_wall_rect(msp,
                   x=ROOM_W, y=ROOM_D,
                   w=EXT_WALL, h=EXT_WALL)

    # EAST WALL (right): x = ROOM_W to x = ROOM_W + EXT_WALL
    # Bottom segment: y=0 to y=EAST_BOT_SEG
    draw_wall_rect(msp,
                   x=ROOM_W, y=0,
                   w=EXT_WALL, h=EAST_BOT_SEG)

    # East wall above bathroom door area up to bathroom top wall
    # Door position: starts at y = EAST_BOT_SEG + BATH_WALL
    bath_int_bot = EAST_BOT_SEG + BATH_WALL
    bath_int_top = bath_int_bot + BATH_INT_D
    bath_ext_top = bath_int_top + BATH_WALL

    # Wall segment from bathroom top to room top
    if ROOM_D > bath_ext_top:
        draw_wall_rect(msp,
                       x=ROOM_W, y=bath_ext_top,
                       w=EXT_WALL, h=ROOM_D - bath_ext_top)

    # -----------------------------------------------------------
    # 2. INTERIOR WALLS — Bathroom partition
    # -----------------------------------------------------------

    # Bathroom south wall (horizontal partition)
    draw_wall_rect(msp,
                   x=ROOM_W, y=EAST_BOT_SEG,
                   w=EXT_WALL + BATH_INT_W + BATH_WALL, h=BATH_WALL,
                   layer="A-WALL-INTR", hatch_layer="A-WALL-INTR-HATCH")

    # Bathroom north wall (horizontal partition)
    draw_wall_rect(msp,
                   x=ROOM_W, y=bath_int_top,
                   w=EXT_WALL + BATH_INT_W + BATH_WALL, h=BATH_WALL,
                   layer="A-WALL-INTR", hatch_layer="A-WALL-INTR-HATCH")

    # Bathroom east wall (right side)
    bath_right_x = ROOM_W + EXT_WALL + BATH_INT_W
    draw_wall_rect(msp,
                   x=bath_right_x, y=EAST_BOT_SEG,
                   w=BATH_WALL, h=BATH_WALL + BATH_INT_D + BATH_WALL,
                   layer="A-WALL-INTR", hatch_layer="A-WALL-INTR-HATCH")

    # East wall of main room — segment between bathroom bottom and top
    # This is where the door opening is. Wall above + below door.
    # Door in east wall: from bath_int_bot to bath_int_bot + BATH_DOOR_W
    door_bot = bath_int_bot
    door_top = door_bot + BATH_DOOR_W

    # Wall segment between door top and bathroom interior top
    if bath_int_top > door_top:
        draw_wall_rect(msp,
                       x=ROOM_W, y=door_top,
                       w=EXT_WALL, h=bath_int_top - door_top)

    # -----------------------------------------------------------
    # 3. WINDOWS
    # -----------------------------------------------------------

    # West wall window (vertical window on left wall)
    draw_window_vert(msp,
                     y1=W_WIN_BOT, y2=W_WIN_BOT + W_WIN_H,
                     x_ext=-EXT_WALL, wall_t=EXT_WALL)

    # North wall — small window (120cm)
    draw_window_horiz(msp,
                      x1=N_SEG1, x2=N_SEG1 + N_WIN1_W,
                      y_ext=ROOM_D, wall_t=EXT_WALL)

    # North wall — large 3-pane window (300cm)
    draw_window_horiz(msp,
                      x1=N_WIN2_START, x2=N_WIN2_START + N_WIN2_W,
                      y_ext=ROOM_D, wall_t=EXT_WALL)

    # -----------------------------------------------------------
    # 4. DOORS
    # -----------------------------------------------------------

    # Bathroom door — in east wall of main room
    # Hinge at top of door opening, swings into bathroom (eastward)
    # Hinge point: (ROOM_W, door_top), door swings east (0°), CCW (into bathroom toward south)
    draw_door(msp,
              hinge_x=ROOM_W + EXT_WALL, hinge_y=door_top,
              width=BATH_DOOR_W,
              angle_start=270, swing_dir="ccw")

    # -----------------------------------------------------------
    # 5. KITCHEN FIXTURES
    # -----------------------------------------------------------

    # Cooktop against south wall interior face
    # Position: 384cm from left, 64cm wide
    # Depth: ~47cm (standard European cooktop = 60cm deep)
    STOVE_DEPTH = 600
    draw_cooktop(msp,
                 x=K_LEFT, y=0,
                 w=K_STOVE_W, d=STOVE_DEPTH)

    # -----------------------------------------------------------
    # 6. BATHROOM FIXTURES
    # -----------------------------------------------------------

    bath_int_left = ROOM_W + EXT_WALL
    bath_int_right = bath_int_left + BATH_INT_W

    # Toilet — positioned against the east (right) wall of bathroom
    # Facing west (rotation=180), back against east wall
    toilet_x = bath_int_right - 380  # back of tank against east wall
    toilet_y = bath_int_bot + 400    # offset from south wall
    draw_toilet(msp, toilet_x, toilet_y, rotation=180)

    # Washbasin — against north wall of bathroom
    basin_x = bath_int_left + (BATH_INT_W - 500) / 2  # centered
    basin_y = bath_int_top   # against north wall
    draw_washbasin(msp, basin_x, basin_y, rotation=180)

    # -----------------------------------------------------------
    # 7. ROOM OUTLINES (for pCon room recognition)
    # -----------------------------------------------------------

    # Main room outline
    main_room_pts = [(0, 0), (ROOM_W, 0), (ROOM_W, ROOM_D), (0, ROOM_D)]
    msp.add_lwpolyline(main_room_pts, close=True,
                       dxfattribs={"layer": "A-ROOM", "color": 3})

    # Bathroom room outline
    bath_pts = [
        (bath_int_left, bath_int_bot),
        (bath_int_right, bath_int_bot),
        (bath_int_right, bath_int_top),
        (bath_int_left, bath_int_top),
    ]
    msp.add_lwpolyline(bath_pts, close=True,
                       dxfattribs={"layer": "A-ROOM", "color": 3})

    # -----------------------------------------------------------
    # 8. CORRIDOR BELOW (reference)
    # -----------------------------------------------------------

    # Corridor/room below the south wall (from plan: 44cm offset, 389cm wide)
    corr_y_top = -EXT_WALL
    corr_y_bot = corr_y_top - BELOW_OFFSET - 200  # approximate depth
    corr_x_start = (ROOM_W - CORRIDOR_W) / 2  # centered roughly

    # Just draw a dashed outline as reference
    corr_pts = [
        (BELOW_OFFSET, corr_y_top),
        (BELOW_OFFSET + CORRIDOR_W, corr_y_top),
        (BELOW_OFFSET + CORRIDOR_W, corr_y_top - 500),
        (BELOW_OFFSET, corr_y_top - 500),
    ]
    msp.add_lwpolyline(corr_pts, close=True,
                       dxfattribs={"layer": "A-CORRIDOR", "linetype": "DASHED"})

    # -----------------------------------------------------------
    # 9. ROOM LABELS
    # -----------------------------------------------------------

    # Main room area: 710 × 454 = 32.23 m²
    area_main = (ROOM_W / 1000) * (ROOM_D / 1000)
    add_label(msp, ROOM_W / 2, ROOM_D / 2 + 100, "Wohnkuche")
    add_label(msp, ROOM_W / 2, ROOM_D / 2 - 150,
              f"{area_main:.1f} m\\S2;", height=LABEL_H)

    # Bathroom area: 86 × 227 = 1.95 m²
    area_bath = (BATH_INT_W / 1000) * (BATH_INT_D / 1000)
    add_label(msp, bath_int_left + BATH_INT_W / 2,
              bath_int_bot + BATH_INT_D / 2 + 50, "WC/Bad", height=LABEL_H)
    add_label(msp, bath_int_left + BATH_INT_W / 2,
              bath_int_bot + BATH_INT_D / 2 - 100,
              f"{area_bath:.1f} m\\S2;", height=25)

    # Corridor label
    add_label(msp, BELOW_OFFSET + CORRIDOR_W / 2, -EXT_WALL - 250,
              "Flur/Gang", height=25, layer="A-CORRIDOR")

    # -----------------------------------------------------------
    # 10. DIMENSIONS
    # -----------------------------------------------------------

    # --- Interior dimensions ---

    # Room width (south wall interior)
    add_dim(msp, (0, 0), (ROOM_W, 0), offset=-450)

    # Room width breakdown: 384 + 64 + 262
    add_dim(msp, (0, 0), (K_LEFT, 0), offset=-250)
    add_dim(msp, (K_LEFT, 0), (K_LEFT + K_STOVE_W, 0), offset=-250)
    add_dim(msp, (K_LEFT + K_STOVE_W, 0), (ROOM_W, 0), offset=-250)

    # Room depth (west wall interior)
    add_dim(msp, (0, 0), (0, ROOM_D), offset=-450)

    # --- Exterior dimensions (left wall) ---
    ext_y_bot = -EXT_WALL
    ext_y_top = ROOM_D + EXT_WALL

    # West wall segments: 188 + 120 + 196 = 504
    add_dim(msp, (-EXT_WALL, ext_y_bot), (-EXT_WALL, W_WIN_BOT),
            offset=-300, layer="A-DIMS-EXT")
    add_dim(msp, (-EXT_WALL, W_WIN_BOT), (-EXT_WALL, W_WIN_BOT + W_WIN_H),
            offset=-300, layer="A-DIMS-EXT")
    add_dim(msp, (-EXT_WALL, W_WIN_BOT + W_WIN_H), (-EXT_WALL, ext_y_top),
            offset=-300, layer="A-DIMS-EXT")

    # --- North wall dimensions ---
    n_y = ROOM_D + EXT_WALL

    # North wall segments: 100 + 120 + 100 + 60
    add_dim(msp, (0, n_y), (N_SEG1, n_y), offset=200)
    add_dim(msp, (N_SEG1, n_y), (N_SEG1 + N_WIN1_W, n_y), offset=200)
    add_dim(msp, (N_SEG1 + N_WIN1_W, n_y), (x_step, n_y), offset=200)
    add_dim(msp, (x_step, n_y), (N_WIN2_START, n_y), offset=200)

    # Large window
    add_dim(msp, (N_WIN2_START, n_y), (N_WIN2_START + N_WIN2_W, n_y), offset=200)

    # --- East wall / Bathroom dimensions ---
    # Bottom segment: 92cm
    add_dim(msp, (ROOM_W, 0), (ROOM_W, EAST_BOT_SEG), offset=350)
    # Bathroom depth: 227cm
    add_dim(msp, (ROOM_W, bath_int_bot), (ROOM_W, bath_int_top), offset=350)
    # Door width: 90cm
    add_dim(msp, (ROOM_W + EXT_WALL, door_bot),
            (ROOM_W + EXT_WALL, door_top), offset=200)

    # Bathroom width: 86cm
    add_dim(msp, (bath_int_left, bath_int_bot),
            (bath_int_right, bath_int_bot), offset=-200)

    # Top-right: 127cm total bathroom width
    add_dim(msp, (ROOM_W, bath_ext_top + BATH_WALL),
            (bath_int_right + BATH_WALL, bath_ext_top + BATH_WALL), offset=150)

    # --- Corridor dimension ---
    add_dim(msp, (BELOW_OFFSET, -EXT_WALL),
            (BELOW_OFFSET + CORRIDOR_W, -EXT_WALL), offset=-600)

    # -----------------------------------------------------------
    # 11. SCALE REFERENCE BAR
    # -----------------------------------------------------------
    add_scale_bar(msp, x=0, y=-1200)

    # -----------------------------------------------------------
    # 12. TITLE BLOCK
    # -----------------------------------------------------------
    add_label(msp, ROOM_W / 2, -1600,
              "GRUNDRISS PIETZINGER — Massstab 1:100 — Alle Masse in cm",
              height=30, layer="A-TEXT")
    add_label(msp, ROOM_W / 2, -1750,
              "Erstellt fuer pCon.planner 8.13 — Einheit: Millimeter (DXF)",
              height=22, layer="A-TEXT")

    # -----------------------------------------------------------
    # SAVE
    # -----------------------------------------------------------
    doc.saveas(OUTPUT_FILE)
    print(f"=== Floor plan generated successfully ===")
    print(f"File: {OUTPUT_FILE}")
    print(f"DXF Version: {DXF_VERSION}")
    print(f"Units: Millimeters ($INSUNITS=4)")
    print(f"Main room: {ROOM_W/10:.0f} x {ROOM_D/10:.0f} cm "
          f"({area_main:.1f} m²)")
    print(f"Bathroom: {BATH_INT_W/10:.0f} x {BATH_INT_D/10:.0f} cm "
          f"({area_bath:.1f} m²)")
    print(f"")
    print(f"=== pCon.planner Import Instructions ===")
    print(f"1. File > Import > Geometry")
    print(f"2. Select: {OUTPUT_FILE}")
    print(f"3. Insert Unit: Millimeter")
    print(f"4. Default Scaling Unit: Millimeter")
    print(f"5. Verify scale with the reference bar (1000mm = 1m)")
    print(f"6. Use Measure tool to verify wall dimensions")


if __name__ == "__main__":
    generate()
