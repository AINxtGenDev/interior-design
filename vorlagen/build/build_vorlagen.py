"""Build the four Word templates (Angebot/Proposal, Rechnung/Invoice) for Mag. Claudia Plessl.

One shared layout, two languages. Writes raw OOXML so every part (content controls with
glossary placeholders and custom-XML data binding, embedded obfuscated fonts, styles, theme)
is under our control.

Run:
  uv run --with fonttools --with brotli --with pillow python vorlagen/build/build_vorlagen.py
"""
from __future__ import annotations

import datetime as dt
import hashlib
import io
import re
import uuid
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]          # 78_plessl-website
OUT = ROOT / "vorlagen"
FONT_OUT = OUT / "fonts"
MANROPE_VF = ROOT / "brand/fonts/Manrope[wght].ttf"
MONTSERRAT_WOFF2 = ROOT.parent / "79_plessl-video/videos/claudia-plessl-promo/assets/fonts/Montserrat-400.woff2"
LOGO = ROOT / "Logo2.png"
MONOGRAM_BOTTOM = 640   # Logo2.png: monogram ends at row 639 (same constant as brand/build_web_assets.py)

# ---------------------------------------------------------------- bank details: SET THEM HERE, ONCE
# None = the templates show a grey placeholder („[IBAN eintragen]“ / "[enter IBAN]") as a content control
# tagged IBAN / BIC / BANK. Put the real values in, re-run this script, and every template carries them.
BANK_IBAN: str | None = None        # e.g. "AT00 0000 0000 0000 0000"
BANK_BIC: str | None = None         # e.g. "XXXXATWWXXX"
BANK_NAME: str | None = None        # e.g. "Name der Bank"

# ---------------------------------------------------------------- brand tokens
SAGE_DARK, SAGE_INK, SAGE_MID, SAGE_SOFT, SAGE_LIGHT = "5E6F5B", "4E5C4C", "9CAF95", "D6E0D4", "EFF4EE"
BLUSH_MID, BLUSH_DARK = "E4A89F", "C2766E"
ANTH_DARK, ANTH_MID, ANTH_LIGHT = "2E3134", "6B6E72", "E9EAEC"
HEAD, BODY, ACCENT = "Manrope", "Manrope", "Montserrat"
SYMBOL = "MS Gothic"                # ☐/☒ of the FAGG check box: Word's own default for check-box controls
SYMBOL_FALLBACK = "Segoe UI Symbol"

# type scale (half-points): 20 / 11 / 10 / 8 / 6.5 pt
SZ_TITLE, SZ_H1, SZ_BODY, SZ_SMALL, SZ_LABEL = 40, 22, 20, 16, 13
LEAD_BODY, LEAD_TABLE, LEAD_SMALL, LEAD_ADDR = 280, 270, 220, 250     # exact leading, twips


def tw(mm: float) -> int:          # millimetres -> twips (1/20 pt)
    return round(mm * 1440 / 25.4)


def emu(mm: float) -> int:         # millimetres -> EMU
    return round(mm * 36000)


# ---------------------------------------------------------------- page grid (mm)
PAGE_W, PAGE_H = 210, 297
M_LEFT, M_RIGHT, M_TOP, M_BOTTOM = 25, 20, 27, 30
HDR_DIST, FTR_DIST = 12, 9
TEXT_W = PAGE_W - M_LEFT - M_RIGHT                    # 165 mm
GRID_A = 37.5                                          # first inner edge (after position / monogram column)
INFO_X = 125                                           # DIN 5008 information block = second shared edge
ADDR_COL = INFO_X - M_LEFT                             # 100 mm
INFO_COL = TEXT_W - ADDR_COL                           # 65 mm
INFO_TAB = 27                                          # info block: label | tab at 27 mm | value 38 mm
TOTALS_W = PAGE_W - M_RIGHT - INFO_X                   # 65 mm: totals start on the 125 mm edge
SIGNOFF_EXTRA = 0                                      # mm of extra air between the thanks line and the name
TITLE_GAP = 340                                        # twips between the address/info block and the title
RETURN_LINE_Y = 57.5                                   # bottom of the Zusatz- und Vermerkzone
INFO_Y = 50
LOGO_W, LOGO_Y = 42, 16
FOOTER_MONO_H = 10
FOLD_MARKS = (105, 210)                                # DIN 5008 Form B fold marks
PUNCH_MARK = 148.5

# ---------------------------------------------------------------- fonts


def _set_names(f: TTFont, family: str, style: str) -> None:
    """Static RIBBI naming (the instancer leaves the variable font's default names)."""
    name = f["name"]
    name.names = [n for n in name.names if n.nameID not in (1, 2, 3, 4, 6, 16, 17, 21, 22, 25)]
    full = f"{family} {style}"
    ps = f"{family}-{style}"
    for nid, s in ((1, family), (2, style), (3, f"{ps};static"), (4, full), (6, ps)):
        name.setName(s, nid, 3, 1, 0x409)
        name.setName(s, nid, 1, 0, 0)
    os2 = f["OS/2"]
    bold = style == "Bold"
    os2.fsSelection &= ~((1 << 0) | (1 << 5) | (1 << 6))
    os2.fsSelection |= (1 << 5) if bold else (1 << 6)
    f["head"].macStyle = 1 if bold else 0
    os2.fsType = 0  # installable embedding (OFL)


def build_fonts() -> dict[str, bytes]:
    """Plain static instances: glyphs and cmap untouched (proportional figures by default;
    tabular figures are switched on per style with w14:numSpacing)."""
    FONT_OUT.mkdir(parents=True, exist_ok=True)
    out = {}
    for wght, style in ((400, "Regular"), (700, "Bold")):
        f = instancer.instantiateVariableFont(TTFont(MANROPE_VF), {"wght": wght})
        _set_names(f, "Manrope", style)
        f["OS/2"].usWeightClass = wght
        p = FONT_OUT / f"Manrope-{style}.ttf"
        f.save(p)
        out[f"Manrope-{style}"] = p.read_bytes()
    f = TTFont(MONTSERRAT_WOFF2)
    f.flavor = None
    _set_names(f, "Montserrat", "Regular")
    f["OS/2"].usWeightClass = 400
    p = FONT_OUT / "Montserrat-Regular.ttf"
    f.save(p)
    out["Montserrat-Regular"] = p.read_bytes()
    (FONT_OUT / "Manrope-OFL.txt").write_bytes((ROOT / "brand/fonts/Manrope-OFL.txt").read_bytes())
    mont_ofl = Path.home() / "AndroidStudioProjects/birthday/lib/fonts/Montserrat/OFL.txt"  # same OFL 1.1 text as upstream
    if mont_ofl.exists():
        (FONT_OUT / "Montserrat-OFL.txt").write_bytes(mont_ofl.read_bytes())
    (FONT_OUT / "LIESMICH.txt").unlink(missing_ok=True)      # superseded by vorlagen/LIESMICH.txt
    return out


def font_meta(data: bytes) -> tuple[str, str]:
    f = TTFont(io.BytesIO(data))
    os2 = f["OS/2"]
    p = os2.panose
    panose = "".join(f"{v:02X}" for v in (p.bFamilyType, p.bSerifStyle, p.bWeight, p.bProportion, p.bContrast,
                                            p.bStrokeVariation, p.bArmStyle, p.bLetterForm, p.bMidline, p.bXHeight))
    sig = (f'<w:sig w:usb0="{os2.ulUnicodeRange1:08X}" w:usb1="{os2.ulUnicodeRange2:08X}" '
           f'w:usb2="{os2.ulUnicodeRange3:08X}" w:usb3="{os2.ulUnicodeRange4:08X}" '
           f'w:csb0="{os2.ulCodePageRange1:08X}" w:csb1="{os2.ulCodePageRange2:08X}"/>')
    return panose, sig


def obfuscate(data: bytes, key: uuid.UUID) -> bytes:
    """ECMA-376 Part 1 §17.8.1 font obfuscation: XOR the first 32 bytes with the GUID bytes reversed."""
    k = bytes.fromhex(key.hex)[::-1]
    b = bytearray(data)
    for i in range(32):
        b[i] ^= k[i % 16]
    return bytes(b)


# ---------------------------------------------------------------- images


def _png(im: Image.Image) -> bytes:
    buf = io.BytesIO()
    im.save(buf, "PNG", optimize=True)
    return buf.getvalue()


def build_logo() -> tuple[bytes, tuple[int, int], bytes, tuple[int, int]]:
    im = Image.open(LOGO).convert("RGBA")
    im = im.crop(im.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox())
    im.putalpha(im.getchannel("A").point(lambda v: 0 if v <= 8 else v))   # drop the near-invisible specks
    src = Image.open(LOGO).convert("RGBA")
    src = src.crop((0, 0, src.width, MONOGRAM_BOTTOM))
    src.putalpha(src.getchannel("A").point(lambda v: 0 if v <= 8 else v))
    mono = src.crop(src.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox())
    return _png(im), im.size, _png(mono), mono.size


def hairline_png() -> bytes:
    """Fold/punch mark: a plain sage-mid bar, placed at 5 mm x 0.25 pt."""
    rgb = tuple(int(SAGE_MID[i:i + 2], 16) for i in (0, 2, 4))
    return _png(Image.new("RGB", (400, 7), rgb))


# ---------------------------------------------------------------- typography helpers

NBSP = " "


def nb(s: str) -> str:
    """Non-breaking spaces where a line break would split a unit (Austrian typesetting practice)."""
    s = s.replace("§ 6 Abs. 1 Z 27 UStG", NBSP.join(["§", "6", "Abs.", "1", "Z", "27", "UStG"]))
    s = s.replace("section 6(1)(27)", "section" + NBSP + "6(1)(27)")
    s = s.replace("z. B.", "z." + NBSP + "B.").replace("e.g. ", "e.g." + NBSP)
    s = s.replace("Mag. ", "Mag." + NBSP).replace("EUR ", "EUR" + NBSP).replace("Nr. ", "Nr." + NBSP)
    s = s.replace("+43 664 15 17 650", "+43 664 15 17 650".replace(" ", NBSP))
    s = re.sub(r"(\d) (%|Tag|Tagen|days|Std\.|hrs|Z )", lambda m: m.group(1) + NBSP + m.group(2), s)
    s = re.sub(r"(\d) – (\d)", lambda m: m.group(1) + NBSP + "–" + NBSP + m.group(2), s)   # date ranges stay whole
    s = re.sub(r"(\d) (Oct|October|Okt)", lambda m: m.group(1) + NBSP + m.group(2), s)
    return s


# ---------------------------------------------------------------- language content

COMMON = {
    "name": "Mag. Claudia Plessl",
    "street": "Ährengasse 6",
    "phone": "+43 664 15 17 650",
    "mail": "office@claudiaplessl.at",
    "web": "claudiaplessl.at",
    "gisa": ("40024813", "40024837"),
}

# Bound fields: typed once, shown everywhere they appear (custom XML part, see build()).
# kind, placeholder, alias, binding element
T = {
    "de": {
        "lang": "de-AT", "date_fmt": "dd.MM.yyyy",
        "country_line": "3424 Wolfpassing, Österreich",
        "return": "Mag. Claudia Plessl · Ährengasse 6 · 3424 Wolfpassing",
        "addr": ["[Vorname Nachname oder Firma]", "[Zusatz, z. B. z. H. Frau …]", "[Straße Hausnummer]",
                 "[PLZ Ort]", "[Land, falls nicht Österreich]"],
        "addr_alias": ["Empfänger", "Zusatz", "Straße", "PLZ Ort", "Land"],
        "f_company": "Mag. Claudia Plessl", "f_contact": "Kontakt", "f_gisa": "GISA-Zahl",
        "page": ("Seite ", " von "),
        "salutation": "[Sehr geehrte Frau Nachname,]",
        "greeting": "Mit freundlichen Grüßen",
        "money": "[0,00]",
        "vat": "Umsatzsteuerbefreit aufgrund der Kleinunternehmerregelung gemäß § 6 Abs. 1 Z 27 UStG.",
        "currency": "EUR",
        "optional": "[optional]",
        "angebot": {
            "title": "Angebot", "file": "Angebot_DE.dotx", "doc_title": "Angebot",
            "subtitle": "[Projekt, z. B. Neugestaltung Wohnbereich]",
            "info": [[("Angebot Nr.", "text", "[AN-JJJJ-000]", "nr"), ("Datum", "date", "[Datum]", None)],
                     [("Gültig bis", "date", "[Datum]", "gueltig"), ("Projektort", "text", "[falls abweichend]", None)]],
            "intro": "vielen Dank für das Gespräch und Ihr Vertrauen. Nachstehend finden Sie mein Angebot. "
                     "Es fasst Ihr Anliegen, den vorgesehenen Leistungsumfang sowie Ablauf und Konditionen "
                     "übersichtlich zusammen.",
            "h_situation": "Ihr Anliegen",
            "situation": "[Kurze Beschreibung der Ausgangssituation: Räume, Wünsche, Ziele und Besonderheiten.]",
            "h_scope": "Leistungsumfang",
            "cols": ["Pos.", "Leistung", "Umfang", "Betrag"],
            "item": "[Leistung]", "item_desc": "[Kurzbeschreibung der Leistung]", "qty": "[z. B. 6 Std.]",
            "total": "Gesamtbetrag",
            "excluded": "[Optional: Hinweis auf nicht enthaltene Leistungen, z. B. Möbel, Material oder Leistungen Dritter.]",
            "h_schedule": "Ablauf und Termine",
            "sched_cols": ["Zeitraum", "Schritt"],
            "sched": [("[z. B. 01.–15.10.2026]", "[Schritt, z. B. Bestandsaufnahme vor Ort]"),
                      ("[Zeitraum]", "[Schritt, z. B. Konzept und Abstimmung]"),
                      ("[Zeitraum]", "[Schritt, z. B. Umsetzung]")],
            "h_terms": "Konditionen",
            "terms": [
                ["Dieses Angebot ist gültig bis ", ("date", "[Datum]", "Gültig bis", "gueltig"), "."],
                ["Rechnungen sind innerhalb von 14 Tagen ab Rechnungsdatum ohne Abzug zu bezahlen."],
                ["Bei Aufträgen ab EUR 600,- kann eine Anzahlung von 30 % des Auftragswerts vereinbart werden."],
                [("text", "[Anzahlung: EUR …, fällig bei Auftragserteilung]", "Anzahlung", None)],
                [("text", "[Fahrtkosten: …]", "Fahrtkosten", None)],
                ["Workshop-Gebühren sind vor Beginn des Workshops zu bezahlen."],
                ["Es gelten meine Allgemeinen Geschäftsbedingungen, abrufbar unter claudiaplessl.at/agb."],
                ["Verbraucherinnen und Verbraucher können von Verträgen, die im Fernabsatz oder außerhalb von "
                 "Geschäftsräumen geschlossen werden, binnen 14 Tagen nach dem FAGG zurücktreten. "
                 "Einzelheiten finden Sie in den AGB."],
                [("text", "[Widerrufsbelehrung und Muster-Widerrufsformular liegen bei.]", "Widerruf", None)],
            ],
            "closing": "Gerne beantworte ich Ihre Fragen und bespreche Anpassungen mit Ihnen. Wenn Sie mich "
                       "beauftragen möchten, senden Sie mir bitte die unterzeichnete Auftragsbestätigung zurück.",
            "acc_label": "Auftragsbestätigung",
            "acc_ref": [("Angebot Nr.", ("text", "[AN-JJJJ-000]", "Angebot Nr.", "nr")),
                        ("Gesamtbetrag", ["EUR ", ("text", "[0,00]", "Gesamtbetrag", "gesamt")])],
            "acc_text": "Ich beauftrage Mag. Claudia Plessl mit den in diesem Angebot beschriebenen Leistungen zum oben "
                        "genannten Gesamtbetrag und zu den genannten Konditionen. Die Allgemeinen Geschäftsbedingungen "
                        "habe ich gelesen und akzeptiere sie.",
            "acc_fagg": "Ich verlange ausdrücklich, dass mit der Leistung vor Ablauf der Rücktrittsfrist begonnen "
                        "wird. Mir ist bekannt, dass ich bei einem Rücktritt einen anteiligen Betrag für bereits "
                        "erbrachte Leistungen zu bezahlen habe.",
            "acc_fagg_note": "Nur für Verbraucherinnen und Verbraucher bei Verträgen im Fernabsatz oder außerhalb von Geschäftsräumen.",
            "acc_sign": ["Ort, Datum", "Name in Blockschrift", "Unterschrift Auftraggeber/in"],
        },
        "rechnung": {
            "title": "Rechnung", "file": "Rechnung_DE.dotx", "doc_title": "Rechnung",
            "info": [[("Rechnung Nr.", "text", "[RE-JJJJ-000]", "nr"), ("Datum", "date", "[Datum]", None)],
                     [("Fällig am", "date", "[Datum]", "faellig"), ("Leistungsdatum", "text", "[z. B. 01.–31.10.2026]", None)],
                     [("Projekt", "text", "[Projektbezeichnung]", None)],
                     [("Kundennummer", "text", "[optional]", None), ("Zu Angebot Nr.", "text", "[optional]", None)],
                     [("Ihre UID-Nr.", "text", "[optional]", None)]],
            "cols": ["Pos.", "Leistung", "Menge", "Einzelpreis", "Betrag"],
            "item": "[Leistung]", "item_desc": "[Kurzbeschreibung, Datum der Leistung]", "qty": "[6 Std.]",
            "subtotal": "Zwischensumme",
            "deposit": "Abzüglich Anzahlung",
            "due": "Rechnungsbetrag",
            "payment": ["Bitte überweisen Sie den Betrag ohne Abzug bis ",
                        ("date", "[Datum]", "Fällig am", "faellig"),
                        " unter Angabe der Rechnungsnummer:"],
            "bank": [("Kontoinhaberin", "Mag. Claudia Plessl"), ("IBAN", ("bank", "[IBAN eintragen]", "IBAN", None)),
                     ("BIC", ("bank", "[BIC eintragen]", "BIC", None)), ("Bank", ("bank", "[Bank eintragen]", "BANK", None))],
            "thanks": "Vielen Dank für Ihren Auftrag und die angenehme Zusammenarbeit.",
        },
    },
    "en": {
        "lang": "en-GB", "date_fmt": "d MMMM yyyy",
        "country_line": "3424 Wolfpassing, Austria",
        "return": "Mag. Claudia Plessl · Ährengasse 6 · 3424 Wolfpassing · Austria",
        "addr": ["[First name Surname or Company]", "[Additional line, e.g. Attn. Ms …]", "[Street and number]",
                 "[Postcode Town]", "[Country]"],
        "addr_alias": ["Recipient", "Additional line", "Street", "Postcode Town", "Country"],
        "f_company": "Mag. Claudia Plessl", "f_contact": "Contact", "f_gisa": "GISA no.",
        "page": ("Page ", " of "),
        "salutation": "[Dear Ms Surname,]",
        "greeting": "Kind regards",
        "money": "[0.00]",
        "vat": "VAT exempt – small business exemption under section 6(1)(27) of the Austrian VAT Act (UStG).",
        "currency": "EUR",
        "optional": "[optional]",
        "angebot": {
            "title": "Proposal", "file": "Proposal_EN.dotx", "doc_title": "Proposal",
            "subtitle": "[Project, e.g. Redesign of the living area]",
            "info": [[("Proposal no.", "text", "[AN-YYYY-000]", "nr"), ("Date", "date", "[Date]", None)],
                     [("Valid until", "date", "[Date]", "gueltig"), ("Project site", "text", "[if different]", None)]],
            "intro": "Thank you for our conversation and for your trust. Below you will find my proposal. "
                     "It sets out your brief, the intended scope of work, the schedule and the terms.",
            "h_situation": "Your brief",
            "situation": "[Short description of the starting point: rooms, wishes, goals and particulars.]",
            "h_scope": "Scope of work",
            "cols": ["No.", "Service", "Scope", "Amount"],
            "item": "[Service]", "item_desc": "[Short description of the service]", "qty": "[e.g. 6 hrs]",
            "total": "Total",
            "excluded": "[Optional: note on items not included, e.g. furniture, materials or third-party services.]",
            "h_schedule": "Schedule",
            "sched_cols": ["Period", "Step"],
            "sched": [("[e.g. 1–15 Oct 2026]", "[Step, e.g. on-site assessment]"),
                      ("[Period]", "[Step, e.g. concept and review]"),
                      ("[Period]", "[Step, e.g. implementation]")],
            "h_terms": "Terms",
            "terms": [
                ["This proposal is valid until ", ("date", "[Date]", "Valid until", "gueltig"), "."],
                ["Invoices are payable within 14 days of the invoice date without deduction."],
                ["For orders of EUR 600 or more, a deposit of 30 % of the order value may be agreed."],
                [("text", "[Deposit: EUR …, due when the order is placed]", "Deposit", None)],
                [("text", "[Travel costs: …]", "Travel costs", None)],
                ["Workshop fees are payable before the workshop begins."],
                ["My General Terms and Conditions apply; they are available at claudiaplessl.at/agb."],
                ["Consumers may withdraw from distance and off-premises contracts within 14 days under the "
                 "Austrian Distance and Off-Premises Contracts Act (FAGG). Details are set out in the "
                 "Terms and Conditions."],
                [("text", "[The information on withdrawal and the model withdrawal form are enclosed.]", "Withdrawal", None)],
            ],
            "closing": "I will gladly answer any questions and discuss adjustments with you. If you would like to "
                       "proceed, please return the signed order confirmation below.",
            "acc_label": "Order confirmation",
            "acc_ref": [("Proposal no.", ("text", "[AN-YYYY-000]", "Proposal no.", "nr")),
                        ("Total", ["EUR ", ("text", "[0.00]", "Total", "gesamt")])],
            "acc_text": "I commission Mag. Claudia Plessl to provide the services described in this proposal for the "
                        "total stated above and on the terms stated. I have read and accept the General Terms and "
                        "Conditions.",
            "acc_fagg": "I expressly request that the work begins before the withdrawal period has ended. "
                        "I understand that if I withdraw, I will pay a proportionate amount for services "
                        "already provided.",
            "acc_fagg_note": "For consumers only, in the case of distance or off-premises contracts.",
            "acc_sign": ["Place, date", "Name in block capitals", "Client signature"],
        },
        "rechnung": {
            "title": "Invoice", "file": "Invoice_EN.dotx", "doc_title": "Invoice",
            "info": [[("Invoice no.", "text", "[RE-YYYY-000]", "nr"), ("Date", "date", "[Date]", None)],
                     [("Due date", "date", "[Date]", "faellig"), ("Service date", "text", "[e.g. 1–31 Oct 2026]", None)],
                     [("Project", "text", "[Project name]", None)],
                     [("Customer no.", "text", "[optional]", None), ("Proposal no.", "text", "[optional]", None)],
                     [("Your VAT no.", "text", "[optional]", None)]],
            "cols": ["No.", "Service", "Qty", "Unit price", "Amount"],
            "item": "[Service]", "item_desc": "[Short description, date of service]", "qty": "[6 hrs]",
            "subtotal": "Subtotal",
            "deposit": "Less deposit paid",
            "due": "Amount due",
            "payment": ["Please pay the amount due without deduction by ",
                        ("date", "[Date]", "Due date", "faellig"),
                        ", quoting the invoice number:"],
            "bank": [("Account holder", "Mag. Claudia Plessl"), ("IBAN", ("bank", "[enter IBAN]", "IBAN", None)),
                     ("BIC", ("bank", "[enter BIC]", "BIC", None)), ("Bank", ("bank", "[enter bank name]", "BANK", None))],
            "thanks": "Thank you for the pleasure of working with you.",
        },
    },
}

# ---------------------------------------------------------------- XML helpers

NS = ('xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" '
      'xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" '
      'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
      'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" '
      'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
      'xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture" '
      'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" '
      'xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" '
      'mc:Ignorable="w14"')
XML_DECL = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
CX_NS = "urn:claudiaplessl:vorlage"
BIND_FIELDS = ("nr", "gueltig", "faellig", "kunde", "gesamt")


class Doc:
    """Collects content-control ids, glossary placeholders and drawing ids for one template."""

    def __init__(self, lang: dict, store_id: str):
        self.L = lang
        self.store_id = store_id
        self.sdt_id = 1000
        self.docparts: dict[str, str] = {}   # placeholder text -> docPart name
        self.drawing_id = 1

    # -- runs
    def t(self, text: str, style: str | None = None, rpr: str = "") -> str:
        props = (f'<w:rStyle w:val="{style}"/>' if style else "") + rpr
        rp = f"<w:rPr>{props}</w:rPr>" if props else ""
        parts = []
        for i, chunk in enumerate(nb(text).split("\t")):
            if i:
                parts.append(f"<w:r>{rp}<w:tab/></w:r>")
            if chunk:
                parts.append(f'<w:r>{rp}<w:t xml:space="preserve">{escape(chunk)}</w:t></w:r>')
        return "".join(parts)

    def docpart(self, ph: str) -> str:
        if ph not in self.docparts:
            self.docparts[ph] = hashlib.md5(ph.encode()).hexdigest().upper()
        return self.docparts[ph]

    def _binding(self, bind: str | None) -> str:
        if not bind:
            return ""
        return (f'<w:dataBinding w:prefixMappings="xmlns:ns0=\'{CX_NS}\'" '
                f'w:xpath="/ns0:vorlage[1]/ns0:{bind}[1]" w:storeItemID="{self.store_id}"/>')

    def sdt(self, ph: str, alias: str, kind: str = "text", bind: str | None = None, multiline: bool = False) -> str:
        """Inline plain-text or date content control showing grey placeholder text; optionally bound."""
        ph = nb(ph)
        self.sdt_id += 1
        if kind == "date":
            typ = (f'<w:date><w:dateFormat w:val="{self.L["date_fmt"]}"/><w:lid w:val="{self.L["lang"]}"/>'
                   '<w:storeMappedDataAs w:val="dateTime"/><w:calendar w:val="gregorian"/></w:date>')
        else:
            typ = '<w:text w:multiLine="1"/>' if multiline else "<w:text/>"
        return (f'<w:sdt><w:sdtPr><w:alias w:val="{escape(alias)}"/><w:tag w:val="{escape(bind or alias)}"/>'
                f'<w:id w:val="{self.sdt_id}"/><w:placeholder><w:docPart w:val="{self.docpart(ph)}"/></w:placeholder>'
                f'<w:showingPlcHdr/>{self._binding(bind)}{typ}</w:sdtPr><w:sdtContent>'
                f'<w:r><w:rPr><w:rStyle w:val="PlaceholderText"/></w:rPr><w:t xml:space="preserve">{escape(ph)}</w:t></w:r>'
                f'</w:sdtContent></w:sdt>')

    def block_sdt(self, ph: str, alias: str, style: str | None) -> str:
        """Block-level rich-text control (for free paragraphs)."""
        ph = nb(ph)
        self.sdt_id += 1
        return (f'<w:sdt><w:sdtPr><w:alias w:val="{escape(alias)}"/><w:tag w:val="{escape(alias)}"/>'
                f'<w:id w:val="{self.sdt_id}"/><w:placeholder><w:docPart w:val="{self.docpart(ph)}"/></w:placeholder>'
                f'<w:showingPlcHdr/></w:sdtPr><w:sdtContent>'
                + self.p(style, f'<w:r><w:rPr><w:rStyle w:val="PlaceholderText"/></w:rPr>'
                                f'<w:t xml:space="preserve">{escape(ph)}</w:t></w:r>') + '</w:sdtContent></w:sdt>')

    def bank_field(self, ph: str, tag: str) -> str:
        """Bank detail as a tagged content control: the value from BANK_* if set, else the placeholder."""
        value = {"IBAN": BANK_IBAN, "BIC": BANK_BIC, "BANK": BANK_NAME}[tag]
        if not value:
            return self.sdt(ph, tag)
        self.sdt_id += 1
        return (f'<w:sdt><w:sdtPr><w:alias w:val="{tag}"/><w:tag w:val="{tag}"/><w:id w:val="{self.sdt_id}"/>'
                f'<w:placeholder><w:docPart w:val="{self.docpart(nb(ph))}"/></w:placeholder><w:text/></w:sdtPr>'
                f'<w:sdtContent>{self.t(value)}</w:sdtContent></w:sdt>')

    def checkbox(self, alias: str) -> str:
        """Clickable check box (Word 2010+ w14:checkbox), ☐ / ☒."""
        self.sdt_id += 1
        rf = f'<w:rFonts w:ascii="{SYMBOL}" w:eastAsia="{SYMBOL}" w:hAnsi="{SYMBOL}" w:cs="{SYMBOL}"/>'
        rpr = f'{rf}<w:color w:val="{SAGE_DARK}"/><w:sz w:val="24"/><w:szCs w:val="24"/>'
        return (f'<w:sdt><w:sdtPr><w:rPr>{rpr}</w:rPr><w:alias w:val="{escape(alias)}"/><w:tag w:val="FAGG"/>'
                f'<w:id w:val="{self.sdt_id}"/>'
                f'<w14:checkbox><w14:checked w14:val="0"/><w14:checkedState w14:val="2612" w14:font="{SYMBOL}"/>'
                f'<w14:uncheckedState w14:val="2610" w14:font="{SYMBOL}"/></w14:checkbox></w:sdtPr>'
                f'<w:sdtContent><w:r><w:rPr>{rpr}</w:rPr><w:t>☐</w:t></w:r></w:sdtContent></w:sdt>')

    def mixed(self, parts, style: str | None = None) -> str:
        """Render a list of str / (kind, placeholder, alias, binding) into runs."""
        if isinstance(parts, (str, tuple)):
            parts = [parts]
        out = []
        for part in parts:
            if isinstance(part, tuple):
                kind, ph, alias, bind = part
                out.append(self.bank_field(ph, alias) if kind == "bank" else self.sdt(ph, alias, kind, bind))
            else:
                out.append(self.t(part, style))
        return "".join(out)

    # -- paragraphs
    @staticmethod
    def p(style: str | None, runs: str = "", ppr: str = "") -> str:
        st = f'<w:pStyle w:val="{style}"/>' if style else ""
        inner = st + ppr
        return f"<w:p>{'<w:pPr>' + inner + '</w:pPr>' if inner else ''}{runs}</w:p>"

    # -- tables
    @staticmethod
    def tc(width_mm: float, content: str, tcpr: str = "") -> str:
        return f'<w:tc><w:tcPr><w:tcW w:w="{tw(width_mm)}" w:type="dxa"/>{tcpr}</w:tcPr>{content}</w:tc>'

    @staticmethod
    def tbl(widths: list[float], rows: list[str], style: str, jc: str | None = None,
            look_first_row: bool = True) -> str:
        total = sum(tw(w) for w in widths)
        grid = "".join(f'<w:gridCol w:w="{tw(w)}"/>' for w in widths)
        jcx = f'<w:jc w:val="{jc}"/>' if jc else ""
        look = ('<w:tblLook w:val="0420" w:firstRow="1" w:lastRow="0" w:firstColumn="0" w:lastColumn="0" '
                'w:noHBand="1" w:noVBand="1"/>' if look_first_row else
                '<w:tblLook w:val="0600" w:firstRow="0" w:lastRow="0" w:firstColumn="0" w:lastColumn="0" '
                'w:noHBand="1" w:noVBand="1"/>')
        return (f'<w:tbl><w:tblPr><w:tblStyle w:val="{style}"/><w:tblW w:w="{total}" w:type="dxa"/>{jcx}'
                f'<w:tblInd w:w="0" w:type="dxa"/><w:tblLayout w:type="fixed"/>{look}</w:tblPr>'
                f'<w:tblGrid>{grid}</w:tblGrid>{"".join(rows)}</w:tbl>')

    @staticmethod
    def tr(cells: str, trpr: str = "") -> str:
        return f"<w:tr>{'<w:trPr>' + trpr + '</w:trPr>' if trpr else ''}{cells}</w:tr>"

    # -- drawing
    def anchored_image(self, rid: str, w_mm: float, h_mm: float, x_mm: float, y_mm: float, name: str,
                       descr: str = "Claudia Plessl – Interior Design, Professional Organizing") -> str:
        self.drawing_id += 1
        cx, cy = emu(w_mm), emu(h_mm)
        return (f'<w:r><w:drawing><wp:anchor distT="0" distB="0" distL="0" distR="0" simplePos="0" '
                f'relativeHeight="{251658240 + self.drawing_id}" behindDoc="0" locked="1" layoutInCell="1" allowOverlap="1">'
                f'<wp:simplePos x="0" y="0"/>'
                f'<wp:positionH relativeFrom="page"><wp:posOffset>{emu(x_mm)}</wp:posOffset></wp:positionH>'
                f'<wp:positionV relativeFrom="page"><wp:posOffset>{emu(y_mm)}</wp:posOffset></wp:positionV>'
                f'<wp:extent cx="{cx}" cy="{cy}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:wrapNone/>'
                f'<wp:docPr id="{self.drawing_id}" name="{name}" descr="{descr}"/>'
                f'<wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr>'
                f'<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">'
                f'<pic:pic><pic:nvPicPr><pic:cNvPr id="{self.drawing_id}" name="{name}.png"/><pic:cNvPicPr/></pic:nvPicPr>'
                f'<pic:blipFill><a:blip r:embed="{rid}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>'
                f'<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm>'
                f'<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic>'
                f'</wp:anchor></w:drawing></w:r>')

    def inline_image(self, rid: str, w_mm: float, h_mm: float, name: str, descr: str) -> str:
        self.drawing_id += 1
        cx, cy = emu(w_mm), emu(h_mm)
        return (f'<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0">'
                f'<wp:extent cx="{cx}" cy="{cy}"/><wp:effectExtent l="0" t="0" r="0" b="0"/>'
                f'<wp:docPr id="{self.drawing_id}" name="{name}" descr="{descr}"/>'
                f'<wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr>'
                f'<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">'
                f'<pic:pic><pic:nvPicPr><pic:cNvPr id="{self.drawing_id}" name="{name}.png"/><pic:cNvPicPr/></pic:nvPicPr>'
                f'<pic:blipFill><a:blip r:embed="{rid}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>'
                f'<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm>'
                f'<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic>'
                f'</wp:inline></w:drawing></w:r>')


def fld_begin() -> str:
    return '<w:r><w:fldChar w:fldCharType="begin"/></w:r>'


def fld_instr(s: str) -> str:
    return f'<w:r><w:instrText xml:space="preserve">{escape(s)}</w:instrText></w:r>'


def fld_sep() -> str:
    return '<w:r><w:fldChar w:fldCharType="separate"/></w:r>'


def fld_end() -> str:
    return '<w:r><w:fldChar w:fldCharType="end"/></w:r>'


def field(instr: str, shown: str) -> str:
    return fld_begin() + fld_instr(f" {instr} ") + fld_sep() + f'<w:r><w:t>{shown}</w:t></w:r>' + fld_end()


def no_borders(sides=("top", "left", "bottom", "right", "insideH", "insideV")) -> str:
    return "".join(f'<w:{s} w:val="nil"/>' for s in sides)


# ---------------------------------------------------------------- styles

BUILTIN = {"Normal", "Title", "Subtitle", "Heading1", "Heading2", "ListBullet", "Header", "Footer", "PlaceholderText"}


def styles_xml(lang: str) -> str:
    def rfonts(f):
        return f'<w:rFonts w:ascii="{f}" w:hAnsi="{f}" w:eastAsia="{f}" w:cs="{f}"/>'

    def sz(v):
        return f'<w:sz w:val="{v}"/><w:szCs w:val="{v}"/>'

    def exact(line, before=0, after=0):
        return f'<w:spacing w:before="{before}" w:after="{after}" w:line="{line}" w:lineRule="exact"/>'

    def pstyle(sid, name, ppr="", rpr="", based="Normal", nxt=None, ui=10, q=True, link=None, extra=""):
        return (f'<w:style w:type="paragraph" w:customStyle="{0 if sid in BUILTIN else 1}" w:styleId="{sid}">'
                f'<w:name w:val="{name}"/>' + (f'<w:basedOn w:val="{based}"/>' if based else "")
                + (f'<w:next w:val="{nxt}"/>' if nxt else "") + (f'<w:link w:val="{link}"/>' if link else "")
                + f'<w:uiPriority w:val="{ui}"/>' + extra + ("<w:qFormat/>" if q else "")
                + (f"<w:pPr>{ppr}</w:pPr>" if ppr else "") + (f"<w:rPr>{rpr}</w:rPr>" if rpr else "") + "</w:style>")

    def cstyle(sid, name, rpr, link=None, ui=10, q=True, extra=""):
        return (f'<w:style w:type="character" w:customStyle="{0 if sid in BUILTIN else 1}" w:styleId="{sid}">'
                f'<w:name w:val="{name}"/><w:basedOn w:val="DefaultParagraphFont"/>'
                + (f'<w:link w:val="{link}"/>' if link else "") + f'<w:uiPriority w:val="{ui}"/>' + extra
                + ("<w:qFormat/>" if q else "") + f"<w:rPr>{rpr}</w:rPr></w:style>")

    tab = '<w14:numSpacing w14:val="tabular"/>'          # tabular figures only where numbers stack
    label_rpr = f'{rfonts(ACCENT)}<w:caps/><w:color w:val="{SAGE_DARK}"/><w:spacing w:val="16"/>{sz(SZ_LABEL)}'
    s = [
        f'<w:docDefaults><w:rPrDefault><w:rPr>{rfonts(BODY)}<w:color w:val="{ANTH_DARK}"/>'
        f'{sz(SZ_BODY)}<w:lang w:val="{lang}" w:eastAsia="{lang}" w:bidi="ar-SA"/></w:rPr></w:rPrDefault>'
        f'<w:pPrDefault><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>',
        pstyle("Normal", "Normal", f'<w:widowControl/>{exact(LEAD_BODY, after=120)}', "", based=None, ui=0),
        '<w:style w:type="character" w:default="1" w:styleId="DefaultParagraphFont"><w:name w:val="Default Paragraph Font"/>'
        '<w:uiPriority w:val="1"/><w:semiHidden/><w:unhideWhenUsed/></w:style>',
        '<w:style w:type="table" w:default="1" w:styleId="TableNormal"><w:name w:val="Normal Table"/><w:uiPriority w:val="99"/>'
        '<w:semiHidden/><w:unhideWhenUsed/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar>'
        '<w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/>'
        '<w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style>',
        '<w:style w:type="numbering" w:default="1" w:styleId="NoList"><w:name w:val="No List"/><w:uiPriority w:val="99"/>'
        '<w:semiHidden/><w:unhideWhenUsed/></w:style>',
        # headline hierarchy: 20 / 11 / 10
        pstyle("Title", "Title", f'<w:keepNext/>{exact(440, after=20)}',
               f'{rfonts(HEAD)}<w:b/><w:bCs/><w:color w:val="{SAGE_INK}"/><w:spacing w:val="-6"/><w:kern w:val="28"/>{sz(SZ_TITLE)}',
               nxt="Subtitle", ui=10),
        pstyle("Subtitle", "Subtitle", f'<w:keepNext/>{exact(320, after=160)}',
               f'<w:color w:val="{ANTH_MID}"/>{sz(SZ_H1)}', nxt="Normal", ui=11),
        pstyle("Heading1", "heading 1", f'<w:keepNext/><w:keepLines/>{exact(320, before=300, after=100)}<w:outlineLvl w:val="0"/>',
               f'{rfonts(HEAD)}<w:b/><w:bCs/><w:color w:val="{SAGE_DARK}"/>{sz(SZ_H1)}', nxt="Normal", ui=9),
        pstyle("Heading2", "heading 2", f'<w:keepNext/><w:keepLines/>{exact(LEAD_BODY, before=200, after=40)}<w:outlineLvl w:val="1"/>',
               f'{rfonts(HEAD)}<w:b/><w:bCs/>{sz(SZ_BODY)}', nxt="Normal", ui=9),
        # accent typography (Montserrat, all caps, 6.5 pt)
        pstyle("Label", "Label", f'<w:keepNext/>{exact(200, after=40)}', label_rpr, link="LabelZeichen", nxt="Normal", ui=12),
        cstyle("LabelZeichen", "Label Zeichen", label_rpr, link="Label", ui=12),
        pstyle("Ruecksendeangabe", "Rücksendeangabe", exact(200, after=tw(1.7)),
               f'{rfonts(ACCENT)}<w:color w:val="{ANTH_MID}"/>{sz(SZ_LABEL)}', ui=13),
        # letter blocks
        pstyle("Anschrift", "Anschrift", exact(LEAD_ADDR), "", ui=13),
        pstyle("InfoWert", "Infoblock", f'<w:tabs><w:tab w:val="left" w:pos="{tw(INFO_TAB)}"/></w:tabs>{exact(LEAD_ADDR)}'
               f'<w:ind w:left="{tw(INFO_TAB)}" w:hanging="{tw(INFO_TAB)}"/>', "", ui=13),
        cstyle("InfoLabelZeichen", "Infoblock Label Zeichen",
               f'{rfonts(ACCENT)}<w:caps/><w:color w:val="{SAGE_DARK}"/><w:spacing w:val="2"/>{sz(SZ_LABEL)}', ui=13),
        pstyle("Grussformel", "Grußformel", '<w:keepNext/><w:keepLines/><w:spacing w:before="240" w:after="0"/>', "",
               nxt="Unterschrift", ui=14),
        pstyle("Unterschrift", "Unterschrift", '<w:spacing w:before="760" w:after="0"/>', "", ui=14),
        pstyle("Hinweis", "Hinweis", exact(LEAD_SMALL, before=100, after=60), f'<w:color w:val="{ANTH_MID}"/>{sz(SZ_SMALL)}', ui=14),
        pstyle("ListBullet", "List Bullet",
               f'<w:numPr><w:numId w:val="1"/></w:numPr>{exact(LEAD_BODY, after=60)}<w:ind w:left="{tw(5)}" w:hanging="{tw(5)}"/>',
               "", ui=15),
        # tables
        pstyle("Tabellenkopf", "Tabellenkopf", f'<w:keepNext/>{exact(200)}', "", based="Label", ui=16),
        pstyle("TabellenkopfRechts", "Tabellenkopf rechts", '<w:jc w:val="right"/>', "", based="Tabellenkopf", ui=16),
        pstyle("Tabellentext", "Tabellentext", f'<w:widowControl w:val="0"/>{exact(LEAD_TABLE)}', "", ui=16),
        pstyle("TabellentextFett", "Tabellentext fett", '<w:keepNext/>', f'{rfonts(HEAD)}<w:b/><w:bCs/>',
               based="Tabellentext", nxt="TabellenBeschreibung", ui=16),
        pstyle("TabellenBeschreibung", "Tabellen Beschreibung", exact(LEAD_SMALL, before=20),
               f'<w:color w:val="{ANTH_MID}"/>{sz(SZ_SMALL)}', based="Tabellentext", ui=16),
        pstyle("Betrag", "Betrag", '<w:jc w:val="right"/>', tab, based="Tabellentext", ui=16),
        pstyle("Position", "Position", '<w:numPr><w:numId w:val="2"/></w:numPr><w:ind w:left="0" w:firstLine="0"/>',
               f'<w:color w:val="{ANTH_MID}"/>{tab}', based="Tabellentext", ui=16),
        pstyle("Summe", "Summe", '<w:keepNext/>', f'{rfonts(HEAD)}<w:b/><w:bCs/>', based="Tabellentext", ui=16),
        pstyle("SummeBetrag", "Summe Betrag", '<w:jc w:val="right"/>', tab, based="Summe", ui=16),
        # header / footer
        pstyle("Header", "header", exact(200), f'<w:color w:val="{ANTH_MID}"/>{sz(SZ_SMALL)}', ui=99, q=False,
               extra="<w:unhideWhenUsed/>"),
        pstyle("Footer", "footer", exact(LEAD_SMALL), f'<w:color w:val="{ANTH_MID}"/>{sz(SZ_SMALL)}', ui=99, q=False,
               extra="<w:unhideWhenUsed/>"),
        pstyle("FooterLabel", "Fußzeile Label", exact(LEAD_SMALL),
               f'{rfonts(ACCENT)}<w:caps/><w:color w:val="{SAGE_DARK}"/><w:spacing w:val="16"/>{sz(SZ_LABEL)}',
               based="Footer", ui=99),
        cstyle("PlaceholderText", "Placeholder Text", f'<w:color w:val="{ANTH_MID}"/>', ui=99, q=False,
               extra="<w:semiHidden/>"),
        # table styles
        '<w:style w:type="table" w:customStyle="1" w:styleId="PlesslTabelle"><w:name w:val="Plessl Tabelle"/>'
        '<w:basedOn w:val="TableNormal"/><w:uiPriority w:val="40"/><w:qFormat/>'
        '<w:pPr><w:spacing w:after="0"/></w:pPr>'
        '<w:tblPr><w:tblBorders><w:top w:val="nil"/><w:left w:val="nil"/>'
        f'<w:bottom w:val="single" w:sz="4" w:space="0" w:color="{SAGE_MID}"/><w:right w:val="nil"/>'
        f'<w:insideH w:val="single" w:sz="4" w:space="0" w:color="{SAGE_SOFT}"/><w:insideV w:val="nil"/></w:tblBorders>'
        f'<w:tblCellMar><w:top w:w="{tw(1.3)}" w:type="dxa"/><w:left w:w="{tw(2.5)}" w:type="dxa"/>'
        f'<w:bottom w:w="{tw(1.5)}" w:type="dxa"/><w:right w:w="0" w:type="dxa"/></w:tblCellMar></w:tblPr>'
        '<w:tblStylePr w:type="firstRow"><w:pPr><w:keepNext/></w:pPr><w:tcPr><w:tcBorders>'
        f'<w:bottom w:val="single" w:sz="6" w:space="0" w:color="{SAGE_DARK}"/></w:tcBorders></w:tcPr></w:tblStylePr></w:style>',
        '<w:style w:type="table" w:customStyle="1" w:styleId="PlesslRaster"><w:name w:val="Plessl Raster"/>'
        '<w:basedOn w:val="TableNormal"/><w:uiPriority w:val="41"/><w:qFormat/>'
        '<w:pPr><w:spacing w:after="0"/></w:pPr>'
        f'<w:tblPr><w:tblBorders>{no_borders()}</w:tblBorders><w:tblCellMar><w:top w:w="0" w:type="dxa"/>'
        '<w:left w:w="0" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="0" w:type="dxa"/></w:tblCellMar>'
        '</w:tblPr></w:style>',
    ]
    return XML_DECL + f'<w:styles {NS}>' + "".join(s) + "</w:styles>"


def numbering_xml() -> str:
    return (XML_DECL + f'<w:numbering {NS}>'
            '<w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="singleLevel"/>'
            '<w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:pStyle w:val="ListBullet"/>'
            '<w:lvlText w:val="–"/><w:lvlJc w:val="left"/>'
            f'<w:pPr><w:ind w:left="{tw(5)}" w:hanging="{tw(5)}"/></w:pPr>'
            f'<w:rPr><w:rFonts w:ascii="{BODY}" w:hAnsi="{BODY}"/><w:color w:val="{SAGE_DARK}"/></w:rPr></w:lvl></w:abstractNum>'
            '<w:abstractNum w:abstractNumId="1"><w:multiLevelType w:val="singleLevel"/>'
            '<w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="decimal"/><w:pStyle w:val="Position"/>'
            '<w:suff w:val="nothing"/><w:lvlText w:val="%1"/><w:lvlJc w:val="left"/>'
            '<w:pPr><w:ind w:left="0" w:firstLine="0"/></w:pPr></w:lvl></w:abstractNum>'
            '<w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>'
            '<w:num w:numId="2"><w:abstractNumId w:val="1"/></w:num>'
            '</w:numbering>')


def settings_xml(lang: str, glossary=False) -> str:
    dec, sep = (",", ";") if lang.startswith("de") else (".", ",")
    if glossary:
        return (XML_DECL + f'<w:settings {NS}><w:defaultTabStop w:val="709"/>'
                '<w:characterSpacingControl w:val="doNotCompress"/><w:compat>'
                '<w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/>'
                '</w:compat></w:settings>')
    return (XML_DECL + f'<w:settings {NS}>'
            '<w:zoom w:percent="100"/><w:embedTrueTypeFonts/>'
            '<w:defaultTabStop w:val="709"/><w:hyphenationZone w:val="425"/>'
            '<w:characterSpacingControl w:val="doNotCompress"/>'
            '<w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/>'
            '<w:compatSetting w:name="overrideTableStyleFontSizeAndJustification" w:uri="http://schemas.microsoft.com/office/word" w:val="1"/>'
            '<w:compatSetting w:name="enableOpenTypeFeatures" w:uri="http://schemas.microsoft.com/office/word" w:val="1"/>'
            '<w:compatSetting w:name="doNotFlipMirrorIndents" w:uri="http://schemas.microsoft.com/office/word" w:val="1"/>'
            '</w:compat>'
            f'<w:themeFontLang w:val="{lang}"/>'
            '<w:clrSchemeMapping w:bg1="light1" w:t1="dark1" w:bg2="light2" w:t2="dark2" w:accent1="accent1" '
            'w:accent2="accent2" w:accent3="accent3" w:accent4="accent4" w:accent5="accent5" w:accent6="accent6" '
            'w:hyperlink="hyperlink" w:followedHyperlink="followedHyperlink"/>'
            f'<w:decimalSymbol w:val="{dec}"/><w:listSeparator w:val="{sep}"/></w:settings>')


def theme_xml() -> str:
    def c(n, v):
        return f'<a:{n}><a:srgbClr val="{v}"/></a:{n}>'
    solid = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>'
    ln = '<a:ln w="6350"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln>'
    return (XML_DECL + '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Claudia Plessl">'
            '<a:themeElements><a:clrScheme name="Claudia Plessl">'
            + c("dk1", ANTH_DARK) + c("lt1", "FFFFFF") + c("dk2", SAGE_INK) + c("lt2", SAGE_LIGHT)
            + c("accent1", SAGE_DARK) + c("accent2", SAGE_MID) + c("accent3", SAGE_SOFT) + c("accent4", BLUSH_DARK)
            + c("accent5", BLUSH_MID) + c("accent6", ANTH_MID) + c("hlink", SAGE_DARK) + c("folHlink", SAGE_INK)
            + '</a:clrScheme><a:fontScheme name="Claudia Plessl">'
            f'<a:majorFont><a:latin typeface="{HEAD}"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont>'
            f'<a:minorFont><a:latin typeface="{BODY}"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme>'
            '<a:fmtScheme name="Claudia Plessl"><a:fillStyleLst>' + solid * 3 + '</a:fillStyleLst>'
            '<a:lnStyleLst>' + ln * 3 + '</a:lnStyleLst>'
            '<a:effectStyleLst>' + '<a:effectStyle><a:effectLst/></a:effectStyle>' * 3 + '</a:effectStyleLst>'
            '<a:bgFillStyleLst>' + solid * 3 + '</a:bgFillStyleLst></a:fmtScheme></a:themeElements>'
            '<a:objectDefaults/><a:extraClrSchemeLst/></a:theme>')


# ---------------------------------------------------------------- body builders

FLUSH = '<w:tcMar><w:left w:w="0" w:type="dxa"/></w:tcMar>'
KEEP = "<w:keepNext/>"


def address_info_block(d: Doc, info: list) -> str:
    """DIN 5008 Form B: return line + address in the window, information block at 125 mm."""
    L = d.L
    # one top margin for the whole row (LibreOffice ignores per-cell top margins); the return line drops by spacing
    left = [d.p("Ruecksendeangabe", d.t(L["return"]), f'<w:spacing w:before="{tw(RETURN_LINE_Y - INFO_Y)}"/>')]
    for i, (ph, alias) in enumerate(zip(L["addr"], L["addr_alias"])):
        left.append(d.p("Anschrift", d.sdt(ph, alias, bind="kunde" if i == 0 else None)))
    # information block: one paragraph per field — label, tab, value — so both share one baseline;
    # a wrapped value aligns under the value column (hanging indent); deleting a line leaves no gap
    right = "".join(d.p("InfoWert", d.t(lbl, "InfoLabelZeichen") + d.t("\t") + d.sdt(ph, lbl, kind, bind))
                    for lbl, kind, ph, bind in (f for pair in info for f in pair))
    row = d.tr(
        d.tc(ADDR_COL, "".join(left), f'<w:tcMar><w:top w:w="{tw(INFO_Y - M_TOP)}" w:type="dxa"/></w:tcMar>')
        + d.tc(INFO_COL, right, f'<w:tcMar><w:top w:w="{tw(INFO_Y - M_TOP)}" w:type="dxa"/></w:tcMar>'),
        "<w:cantSplit/>")
    return d.tbl([ADDR_COL, INFO_COL], [row], "PlesslRaster", look_first_row=False)


def exact_p(line: int, after: int = 0, before: int = 0) -> str:
    return f'<w:spacing w:before="{before}" w:after="{after}" w:line="{line}" w:lineRule="exact"/>'


def title_block(d: Doc, K: dict) -> str:
    de = d.L["lang"].startswith("de")
    return d.p("Title", d.t(K["title"]), f'<w:spacing w:before="{TITLE_GAP}"/>') + d.p("Subtitle", d.sdt(K["subtitle"], "Projekt" if de else "Project"))


def items_table(d: Doc, cols: list[str], widths: list[float], row_cells, right: set[int], n_rows: int) -> str:
    """Position table. row_cells(i) returns the cell contents of one item row; `right` = numeric columns."""
    head = "".join(d.tc(w, d.p("TabellenkopfRechts" if i in right else "Tabellenkopf", d.t(c)), FLUSH if i == 0 else "")
                   for i, (c, w) in enumerate(zip(cols, widths)))
    rows = [d.tr(head, '<w:cantSplit/><w:tblHeader/>')]
    for i in range(n_rows):
        cells = "".join(d.tc(w, c, FLUSH if j == 0 else "") for j, (w, c) in enumerate(zip(widths, row_cells(i))))
        if i == n_rows - 1:     # last row keeps with the totals, so an overflow never leaves the totals alone
            cells = re.sub(r'(<w:pStyle w:val="[^"]+"/>)(?!<w:keepNext/>)', r"\1<w:keepNext/>", cells)
        rows.append(d.tr(cells, "<w:cantSplit/>"))
    return d.tbl(widths, rows, "PlesslTabelle")


def item_cell(d: Doc, K: dict, alias: str) -> str:
    return (d.p("TabellentextFett", d.sdt(K["item"], alias))
            + d.p("TabellenBeschreibung", d.sdt(K["item_desc"], alias, multiline=True)))


def totals_table(d: Doc, lines: list[tuple], note: str) -> str:
    """Totals on the shared 125 mm edge (label column 125–160, value 160–190). The VAT note is the table's last
    row, so it can never be separated from the total. lines: (label_runs, value_runs, is_grand_total, rule_above)"""
    lw, vw = TOTALS_W - AMOUNT_W, AMOUNT_W
    rows = []
    for label, value, grand, rule in lines:
        border = (f'<w:tcBorders><w:top w:val="single" w:sz="6" w:space="0" w:color="{SAGE_DARK}"/></w:tcBorders>'
                  if rule else "")
        mar = (f'<w:tcMar><w:top w:w="{tw(2.0 if rule else 1.0)}" w:type="dxa"/>'
               f'<w:bottom w:w="{tw(1.0)}" w:type="dxa"/></w:tcMar>')
        rows.append(d.tr(
            d.tc(ADDR_COL, d.p("Tabellentext", "", KEEP))
            + d.tc(lw, d.p("Summe" if grand else "Tabellentext", label, KEEP), border + mar)
            + d.tc(vw, d.p("SummeBetrag" if grand else "Betrag", value, KEEP), border + mar),
            "<w:cantSplit/>"))
    rows.append(d.tr(d.tc(TEXT_W, d.p("Hinweis", d.t(note), KEEP + '<w:keepLines/><w:spacing w:before="120"/>'),
                          '<w:gridSpan w:val="3"/>'), "<w:cantSplit/>"))
    return d.tbl([ADDR_COL, lw, vw], rows, "PlesslRaster", look_first_row=False)


AMOUNT_W = 30                                          # last column of every amount table (160–190 mm)


def build_angebot(d: Doc, K: dict) -> str:
    L = d.L
    de = L["lang"].startswith("de")
    b = [address_info_block(d, K["info"]), title_block(d, K),
         d.p(None, d.sdt(L["salutation"], "Anrede" if de else "Salutation")),
         d.p(None, d.t(K["intro"]))]
    b.append(d.p("Heading1", d.t(K["h_situation"])))
    b.append(d.block_sdt(K["situation"], K["h_situation"], None))
    b.append(d.p("Heading1", d.t(K["h_scope"])))
    # Pos. 25–35 | Leistung 35–125 | Umfang 125–160 | Betrag 160–190
    widths = [10, INFO_X - M_LEFT - 10, TOTALS_W - AMOUNT_W, AMOUNT_W]
    c = K["cols"]
    b.append(items_table(d, c, widths, lambda i: [
        d.p("Position"), item_cell(d, K, c[1]),
        d.p("Tabellentext", d.sdt(K["qty"], c[2])), d.p("Betrag", d.sdt(L["money"], c[3])),
    ], right={3}, n_rows=3))
    b.append(totals_table(d, [(d.t(K["total"]), d.t(L["currency"] + " ") + d.sdt(L["money"], K["total"], bind="gesamt"),
                               True, False)], L["vat"]))
    b.append(d.p("Hinweis", d.sdt(K["excluded"], "Hinweis" if de else "Note"), '<w:spacing w:before="0"/>'))
    b.append(d.p("Heading1", d.t(K["h_schedule"])))
    first = 40 if de else 45                                               # EN dates are longer
    sw = [first, TEXT_W - first]
    rows = [d.tr(d.tc(sw[0], d.p("Tabellenkopf", d.t(K["sched_cols"][0])), FLUSH)
                 + d.tc(sw[1], d.p("Tabellenkopf", d.t(K["sched_cols"][1]))), "<w:cantSplit/><w:tblHeader/>")]
    for i, (when, step) in enumerate(K["sched"]):   # short table: keep it on one page
        kp = KEEP if i < len(K["sched"]) - 1 else ""
        rows.append(d.tr(d.tc(sw[0], d.p("Tabellentext", d.sdt(when, K["sched_cols"][0]), kp), FLUSH)
                         + d.tc(sw[1], d.p("Tabellentext", d.sdt(step, K["sched_cols"][1], multiline=True), kp)),
                         "<w:cantSplit/>"))
    b.append(d.tbl(sw, rows, "PlesslTabelle"))
    b.append(d.p("Heading1", d.t(K["h_terms"])))
    for term in K["terms"]:
        b.append(d.p("ListBullet", d.mixed(term)))
    b.append(d.p(None, d.t(K["closing"]), '<w:spacing w:before="160"/>'))
    b.append(d.p("Grussformel", d.t(L["greeting"])))
    b.append(d.p("Unterschrift", d.t(COMMON["name"])))
    b.append(acceptance_block(d, K))
    return "".join(b)


def acceptance_block(d: Doc, K: dict) -> str:
    """One shaded cell (no seams) that cannot split; signature lines in a nested, unshaded grid."""
    pad = 5
    inner_w = TEXT_W - 2 * pad
    gap = 8
    widths = [32, 44, inner_w - 2 * gap - 76]        # Ort, Datum | Name | Unterschrift: each label on one line
    line = f'<w:tcBorders><w:bottom w:val="single" w:sz="4" w:space="0" w:color="{SAGE_DARK}"/></w:tcBorders>'
    blank = d.p("Tabellentext", "")
    cols = [widths[0], gap, widths[1], gap, widths[2]]
    sig = d.tbl(cols, [
        d.tr("".join(d.tc(w, blank, line if i % 2 == 0 else "") for i, w in enumerate(cols)),
             f'<w:cantSplit/><w:trHeight w:val="{tw(13)}" w:hRule="exact"/>'),
        d.tr("".join(d.tc(w, d.p("Tabellenkopf", d.t(s), '<w:spacing w:before="70"/>') if s else blank)
                     for w, s in zip(cols, [K["acc_sign"][0], "", K["acc_sign"][1], "", K["acc_sign"][2]])),
             "<w:cantSplit/>"),
    ], "PlesslRaster", look_first_row=False)
    fagg_ppr = (f'<w:tabs><w:tab w:val="left" w:pos="{tw(6)}"/></w:tabs>'
                f'<w:spacing w:after="20" w:line="{LEAD_TABLE}" w:lineRule="atLeast"/><w:ind w:left="{tw(6)}" w:hanging="{tw(6)}"/>')
    inner = (d.p("Label", d.t(K["acc_label"]), '<w:spacing w:after="100"/>')
             + d.p("Tabellentext", "".join(
                 (d.t("\t") if i else "") + d.t(lbl, "LabelZeichen") + d.t(" ") + d.mixed(val)
                 for i, (lbl, val) in enumerate(K["acc_ref"])),
                   KEEP + f'<w:tabs><w:tab w:val="left" w:pos="{tw(70)}"/></w:tabs><w:spacing w:after="100"/>')
             + d.p("Tabellentext", d.t(K["acc_text"]), KEEP + '<w:spacing w:after="140"/>')
             + d.p("Tabellentext", d.checkbox(K["acc_label"]) + d.t("\t" + K["acc_fagg"]), KEEP + fagg_ppr)
             + d.p("TabellenBeschreibung", d.t(K["acc_fagg_note"]), KEEP + f'<w:ind w:left="{tw(6)}"/>')
             + sig + d.p(None, "", exact_p(20)))
    shade = f'<w:shd w:val="clear" w:color="auto" w:fill="{SAGE_LIGHT}"/>'
    mar = (f'<w:tcMar><w:top w:w="{tw(pad)}" w:type="dxa"/><w:left w:w="{tw(pad)}" w:type="dxa"/>'
           f'<w:bottom w:w="{tw(3)}" w:type="dxa"/><w:right w:w="{tw(pad)}" w:type="dxa"/></w:tcMar>')
    box = d.tbl([TEXT_W], [d.tr(d.tc(TEXT_W, inner, shade + mar), "<w:cantSplit/>")], "PlesslRaster", look_first_row=False)
    return d.p(None, "", KEEP + exact_p(360)) + box


def build_rechnung(d: Doc, K: dict) -> str:
    L = d.L
    b = [address_info_block(d, K["info"]),
         d.p("Title", d.t(K["title"]), f'<w:spacing w:before="{TITLE_GAP}" w:after="{tw(4)}"/>')]   # project sits in the info block
    # Pos. 25–35 | Leistung 35–105 | Menge 105–125 | Einzelpreis 125–160 | Betrag 160–190
    widths = [10, 70, 20, TOTALS_W - AMOUNT_W, AMOUNT_W]
    c = K["cols"]
    b.append(items_table(d, c, widths, lambda i: [
        d.p("Position"), item_cell(d, K, c[1]),
        d.p("Betrag", d.sdt(K["qty"], c[2])),
        d.p("Betrag", d.sdt(L["money"], c[3])), d.p("Betrag", d.sdt(L["money"], c[4])),
    ], right={2, 3, 4}, n_rows=2))
    cur = L["currency"] + " "
    b.append(totals_table(d, [
        (d.t(K["subtotal"]), d.t(cur) + d.sdt(L["money"], K["subtotal"]), False, False),
        (d.t(K["deposit"]), d.t("– " + cur) + d.sdt(L["money"], K["deposit"]), False, False),
        (d.t(K["due"]), d.t(cur) + d.sdt(L["money"], K["due"]), True, True),
    ], L["vat"]))
    # payment → bank → thanks → name: one block that never splits (and stays with the VAT note above)
    b.append(d.p(None, d.mixed(K["payment"]), KEEP + f'<w:keepLines/><w:spacing w:before="240" w:after="{tw(3)}"/>'))
    bw = [GRID_A - M_LEFT + 30, 60, 30, TEXT_W - (GRID_A - M_LEFT + 30) - 90]   # 42.5 | 60 | 30 | 32.5
    labels = "".join(d.tc(w, d.p("Tabellenkopf", d.t(lbl))) for w, (lbl, _) in zip(bw, K["bank"]))
    values = "".join(d.tc(w, d.p("Tabellentext", d.t(v) if isinstance(v, str) else d.mixed(v), KEEP + '<w:spacing w:before="20"/>'))
                     for w, (_, v) in zip(bw, K["bank"]))
    b.append(d.tbl(bw, [d.tr(labels, "<w:cantSplit/>"), d.tr(values, "<w:cantSplit/>")], "PlesslRaster", look_first_row=False))
    b.append(d.p("Grussformel", d.t(K["thanks"]), f'<w:spacing w:before="{tw(8)}"/>'))        # 8 mm after the bank row
    b.append(d.p("Unterschrift", d.t(COMMON["name"]), f'<w:spacing w:before="{tw(6 + SIGNOFF_EXTRA) - LEAD_BODY}"/>'))  # baseline step
    return "".join(b)


# ---------------------------------------------------------------- header / footer


def footer_xml(d: Doc, mono_size: tuple[int, int], numbered: bool) -> str:
    """Footer on the page grid: monogram 25–37.5 | business 37.5–87.5 | contact 87.5–125 | GISA 125–155 | page."""
    L = d.L
    mh = FOOTER_MONO_H
    mw = mh * mono_size[0] / mono_size[1]
    c0 = d.p("Footer", d.inline_image("rIdMono", mw, mh, "Monogramm", "Claudia Plessl Monogramm"),
             '<w:spacing w:line="240" w:lineRule="auto"/>')
    c1 = (d.p("FooterLabel", d.t(L["f_company"])) + d.p("Footer", d.t(COMMON["street"]))
          + d.p("Footer", d.t(L["country_line"])))
    c2 = (d.p("FooterLabel", d.t(L["f_contact"])) + d.p("Footer", d.t(COMMON["phone"]))
          + d.p("Footer", d.t(COMMON["mail"])) + d.p("Footer", d.t(COMMON["web"])))
    c3 = (d.p("FooterLabel", d.t(L["f_gisa"])) + d.p("Footer", d.t(COMMON["gisa"][0]))
          + d.p("Footer", d.t(COMMON["gisa"][1])))
    # page 1 never carries a number (so a one-page document never says "1 of 1"); pages 2+ do
    pg = L["page"]
    c4 = d.p("Footer", (d.t(pg[0]) + field("PAGE", "2") + d.t(pg[1]) + field("NUMPAGES", "2")) if numbered else "",
             '<w:jc w:val="right"/>')
    widths = [GRID_A - M_LEFT, 50, INFO_X - GRID_A - 50, 30, PAGE_W - M_RIGHT - INFO_X - 30]
    top = f'<w:tcBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="{SAGE_MID}"/></w:tcBorders>'
    mar = f'<w:tcMar><w:top w:w="{tw(2.5)}" w:type="dxa"/></w:tcMar>'
    cells = [c0, c1, c2, c3, c4]
    row = d.tr("".join(d.tc(w, c, top + mar + ('<w:vAlign w:val="bottom"/>' if i == 4 else ""))
                       for i, (w, c) in enumerate(zip(widths, cells))), "<w:cantSplit/>")
    tbl = d.tbl(widths, [row], "PlesslRaster", look_first_row=False)
    # the paragraph Word requires after a table is kept at 1 pt so the footer stays inside the bottom margin
    return XML_DECL + f'<w:ftr {NS}>{tbl}{d.p("Footer", "", exact_p(20))}</w:ftr>'


def header_first_xml(d: Doc, logo_size: tuple[int, int]) -> str:
    w = LOGO_W
    h = w * logo_size[1] / logo_size[0]
    marks = "".join(d.anchored_image("rIdMark", 5, 0.088, 5, y - 0.044, "Falzmarke", "Falz-/Lochmarke")
                    for y in (*FOLD_MARKS, PUNCH_MARK))
    return XML_DECL + f'<w:hdr {NS}>{d.p("Header", d.anchored_image("rIdLogo", w, h, INFO_X, LOGO_Y, "Logo") + marks)}</w:hdr>'


def header_default_xml(d: Doc, K: dict) -> str:
    """Pages 2+: quiet meta line, right-aligned, fed by the bound number and client name."""
    nr_ph = K["info"][0][0][2]
    runs = (d.t(K["title"] + " ") + d.sdt(nr_ph, K["info"][0][0][0], bind="nr") + d.t(" · ")
            + d.sdt(d.L["addr"][0], d.L["addr_alias"][0], bind="kunde"))
    return XML_DECL + f'<w:hdr {NS}>{d.p("Header", runs, "<w:jc w:val=\"right\"/>")}</w:hdr>'


# ---------------------------------------------------------------- package


def glossary_xml(d: Doc) -> str:
    parts = []
    for ph, name in d.docparts.items():
        g = uuid.UUID(name)
        parts.append(
            f'<w:docPart><w:docPartPr><w:name w:val="{name}"/><w:category><w:name w:val="General"/>'
            f'<w:gallery w:val="placeholder"/></w:category><w:types><w:type w:val="bbPlcHdr"/></w:types>'
            f'<w:behaviors><w:behavior w:val="content"/></w:behaviors><w:guid w:val="{{{str(g).upper()}}}"/></w:docPartPr>'
            f'<w:docPartBody><w:p><w:r><w:rPr><w:rStyle w:val="PlaceholderText"/></w:rPr>'
            f'<w:t xml:space="preserve">{escape(ph)}</w:t></w:r></w:p></w:docPartBody></w:docPart>')
    return XML_DECL + f'<w:glossaryDocument {NS}><w:docParts>{"".join(parts)}</w:docParts></w:glossaryDocument>'


def font_table(fonts: dict[str, bytes], keys: dict[str, uuid.UUID]) -> tuple[str, str]:
    entries, rels = [], []
    for fam, members in (("Manrope", (("embedRegular", "Manrope-Regular"), ("embedBold", "Manrope-Bold"))),
                         ("Montserrat", (("embedRegular", "Montserrat-Regular"),))):
        panose, sig = font_meta(fonts[members[0][1]])
        emb = ""
        for tag, fid in members:
            rid = f"rIdFont{fid.replace('-', '')}"
            emb += f'<w:{tag} r:id="{rid}" w:fontKey="{{{str(keys[fid]).upper()}}}"/>'
            rels.append(f'<Relationship Id="{rid}" Type="{REL_NS}/font" Target="fonts/{fid}.odttf"/>')
        entries.append(f'<w:font w:name="{fam}"><w:panose1 w:val="{panose}"/><w:charset w:val="00"/>'
                       f'<w:family w:val="swiss"/><w:pitch w:val="variable"/>{sig}{emb}</w:font>')
    # check-box glyphs (not embedded): MS Gothic ships with Office on Windows and Mac; Segoe UI Symbol as fallback
    entries.append(f'<w:font w:name="{SYMBOL}"><w:altName w:val="{SYMBOL_FALLBACK}"/><w:charset w:val="80"/>'
                   '<w:family w:val="modern"/><w:pitch w:val="fixed"/></w:font>')
    entries.append(f'<w:font w:name="{SYMBOL_FALLBACK}"><w:charset w:val="00"/>'
                   '<w:family w:val="swiss"/><w:pitch w:val="variable"/></w:font>')
    ft = XML_DECL + f'<w:fonts {NS}>' + "".join(entries) + "</w:fonts>"
    rel = (XML_DECL + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
           + "".join(rels) + "</Relationships>")
    return ft, rel


def build(lang_key: str, kind_key: str, fonts: dict[str, bytes], logo) -> Path:
    L = T[lang_key]
    K = L[kind_key]
    store_id = "{" + str(uuid.uuid5(uuid.NAMESPACE_URL, f"claudiaplessl.at/vorlage/{K['file']}")).upper() + "}"
    d = Doc(L, store_id)
    logo_png, logo_size, mono_png, mono_size = logo
    body = build_angebot(d, K) if kind_key == "angebot" else build_rechnung(d, K)
    sect = (f'<w:sectPr><w:headerReference w:type="default" r:id="rIdHdrDefault"/>'
            f'<w:headerReference w:type="first" r:id="rIdHdrFirst"/>'
            f'<w:footerReference w:type="default" r:id="rIdFtrDefault"/>'
            f'<w:footerReference w:type="first" r:id="rIdFtrFirst"/>'
            f'<w:pgSz w:w="{tw(PAGE_W)}" w:h="{tw(PAGE_H)}"/>'
            f'<w:pgMar w:top="{tw(M_TOP)}" w:right="{tw(M_RIGHT)}" w:bottom="{tw(M_BOTTOM)}" w:left="{tw(M_LEFT)}" '
            f'w:header="{tw(HDR_DIST)}" w:footer="{tw(FTR_DIST)}" w:gutter="0"/>'
            f'<w:cols w:space="708"/><w:titlePg/><w:docGrid w:linePitch="360"/></w:sectPr>')
    document = XML_DECL + f'<w:document {NS}><w:body>{body}{sect}</w:body></w:document>'

    hdr_first = header_first_xml(d, logo_size)
    hdr_default = header_default_xml(d, K)
    ftr_first = footer_xml(d, mono_size, numbered=False)
    ftr_default = footer_xml(d, mono_size, numbered=True)
    glossary = glossary_xml(d)

    keys = {k: uuid.uuid5(uuid.NAMESPACE_URL, f"claudiaplessl.at/fonts/{k}") for k in fonts}
    ft, ft_rels = font_table(fonts, keys)
    custom = (XML_DECL + f'<vorlage xmlns="{CX_NS}">' + "".join(f"<{f}/>" for f in BIND_FIELDS) + "</vorlage>")
    custom_props = (XML_DECL + f'<ds:datastoreItem ds:itemID="{store_id}" '
                    'xmlns:ds="http://schemas.openxmlformats.org/officeDocument/2006/customXml">'
                    f'<ds:schemaRefs><ds:schemaRef ds:uri="{CX_NS}"/></ds:schemaRefs></ds:datastoreItem>')

    W = "application/vnd.openxmlformats-officedocument.wordprocessingml"
    ct = (XML_DECL + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
          '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
          '<Default Extension="xml" ContentType="application/xml"/>'
          '<Default Extension="png" ContentType="image/png"/>'
          '<Default Extension="odttf" ContentType="application/vnd.openxmlformats-officedocument.obfuscatedFont"/>'
          f'<Override PartName="/word/document.xml" ContentType="{W}.template.main+xml"/>'
          f'<Override PartName="/word/styles.xml" ContentType="{W}.styles+xml"/>'
          f'<Override PartName="/word/settings.xml" ContentType="{W}.settings+xml"/>'
          f'<Override PartName="/word/fontTable.xml" ContentType="{W}.fontTable+xml"/>'
          f'<Override PartName="/word/numbering.xml" ContentType="{W}.numbering+xml"/>'
          '<Override PartName="/word/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>'
          f'<Override PartName="/word/header1.xml" ContentType="{W}.header+xml"/>'
          f'<Override PartName="/word/header2.xml" ContentType="{W}.header+xml"/>'
          f'<Override PartName="/word/footer1.xml" ContentType="{W}.footer+xml"/>'
          f'<Override PartName="/word/footer2.xml" ContentType="{W}.footer+xml"/>'
          f'<Override PartName="/word/glossary/document.xml" ContentType="{W}.document.glossary+xml"/>'
          f'<Override PartName="/word/glossary/styles.xml" ContentType="{W}.styles+xml"/>'
          f'<Override PartName="/word/glossary/settings.xml" ContentType="{W}.settings+xml"/>'
          '<Override PartName="/customXml/itemProps1.xml" ContentType="application/vnd.openxmlformats-officedocument.customXmlProperties+xml"/>'
          '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>'
          '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>'
          '</Types>')
    pr = "http://schemas.openxmlformats.org/package/2006/relationships"
    root_rels = (XML_DECL + f'<Relationships xmlns="{pr}">'
                 f'<Relationship Id="rId1" Type="{REL_NS}/officeDocument" Target="word/document.xml"/>'
                 f'<Relationship Id="rId2" Type="{pr}/metadata/core-properties" Target="docProps/core.xml"/>'
                 f'<Relationship Id="rId3" Type="{REL_NS}/extended-properties" Target="docProps/app.xml"/>'
                 '</Relationships>')
    doc_rels = (XML_DECL + f'<Relationships xmlns="{pr}">'
                f'<Relationship Id="rIdStyles" Type="{REL_NS}/styles" Target="styles.xml"/>'
                f'<Relationship Id="rIdSettings" Type="{REL_NS}/settings" Target="settings.xml"/>'
                f'<Relationship Id="rIdFonts" Type="{REL_NS}/fontTable" Target="fontTable.xml"/>'
                f'<Relationship Id="rIdNumbering" Type="{REL_NS}/numbering" Target="numbering.xml"/>'
                f'<Relationship Id="rIdTheme" Type="{REL_NS}/theme" Target="theme/theme1.xml"/>'
                f'<Relationship Id="rIdHdrFirst" Type="{REL_NS}/header" Target="header1.xml"/>'
                f'<Relationship Id="rIdHdrDefault" Type="{REL_NS}/header" Target="header2.xml"/>'
                f'<Relationship Id="rIdFtrFirst" Type="{REL_NS}/footer" Target="footer1.xml"/>'
                f'<Relationship Id="rIdFtrDefault" Type="{REL_NS}/footer" Target="footer2.xml"/>'
                f'<Relationship Id="rIdGlossary" Type="{REL_NS}/glossaryDocument" Target="glossary/document.xml"/>'
                f'<Relationship Id="rIdCustom" Type="{REL_NS}/customXml" Target="../customXml/item1.xml"/>'
                '</Relationships>')

    def rels(*items):
        return (XML_DECL + f'<Relationships xmlns="{pr}">'
                + "".join(f'<Relationship Id="{rid}" Type="{REL_NS}/image" Target="{tgt}"/>' for rid, tgt in items)
                + "</Relationships>")

    gl_rels = (XML_DECL + f'<Relationships xmlns="{pr}">'
               f'<Relationship Id="rId1" Type="{REL_NS}/styles" Target="styles.xml"/>'
               f'<Relationship Id="rId2" Type="{REL_NS}/settings" Target="settings.xml"/></Relationships>')
    cx_rels = (XML_DECL + f'<Relationships xmlns="{pr}"><Relationship Id="rId1" '
               f'Type="{REL_NS}/customXmlProps" Target="itemProps1.xml"/></Relationships>')
    now = dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    core = (XML_DECL + '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '
            'xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" '
            'xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
            f'<dc:title>{K["doc_title"]} – Mag. Claudia Plessl</dc:title><dc:creator>Mag. Claudia Plessl</dc:creator>'
            f'<cp:lastModifiedBy>Mag. Claudia Plessl</cp:lastModifiedBy><dc:language>{L["lang"]}</dc:language>'
            f'<dcterms:created xsi:type="dcterms:W3CDTF">{now}</dcterms:created>'
            f'<dcterms:modified xsi:type="dcterms:W3CDTF">{now}</dcterms:modified></cp:coreProperties>')
    app = (XML_DECL + '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties">'
           '<DocSecurity>0</DocSecurity><Company>Mag. Claudia Plessl</Company></Properties>')

    out = OUT / K["file"]
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", ct)
        z.writestr("_rels/.rels", root_rels)
        z.writestr("docProps/core.xml", core)
        z.writestr("docProps/app.xml", app)
        z.writestr("word/document.xml", document)
        z.writestr("word/_rels/document.xml.rels", doc_rels)
        z.writestr("word/styles.xml", styles_xml(L["lang"]))
        z.writestr("word/settings.xml", settings_xml(L["lang"]))
        z.writestr("word/numbering.xml", numbering_xml())
        z.writestr("word/theme/theme1.xml", theme_xml())
        z.writestr("word/fontTable.xml", ft)
        z.writestr("word/_rels/fontTable.xml.rels", ft_rels)
        for fid, data in fonts.items():
            z.writestr(f"word/fonts/{fid}.odttf", obfuscate(data, keys[fid]))
        z.writestr("word/header1.xml", hdr_first)
        z.writestr("word/_rels/header1.xml.rels", rels(("rIdLogo", "media/logo.png"), ("rIdMark", "media/falzmarke.png")))
        z.writestr("word/header2.xml", hdr_default)
        z.writestr("word/footer1.xml", ftr_first)
        z.writestr("word/_rels/footer1.xml.rels", rels(("rIdMono", "media/monogramm.png")))
        z.writestr("word/footer2.xml", ftr_default)
        z.writestr("word/_rels/footer2.xml.rels", rels(("rIdMono", "media/monogramm.png")))
        z.writestr("word/media/logo.png", logo_png)
        z.writestr("word/media/monogramm.png", mono_png)
        z.writestr("word/media/falzmarke.png", hairline_png())
        z.writestr("word/glossary/document.xml", glossary)
        z.writestr("word/glossary/_rels/document.xml.rels", gl_rels)
        z.writestr("word/glossary/styles.xml", styles_xml(L["lang"]))
        z.writestr("word/glossary/settings.xml", settings_xml(L["lang"], glossary=True))
        z.writestr("customXml/item1.xml", custom)
        z.writestr("customXml/itemProps1.xml", custom_props)
        z.writestr("customXml/_rels/item1.xml.rels", cx_rels)
    return out


LIESMICH = """\
Vorlagen – Mag. Claudia Plessl
==============================

Inhalt
  Angebot_DE.dotx, Proposal_EN.dotx   Angebot / Proposal
  Rechnung_DE.dotx, Invoice_EN.dotx   Rechnung / Invoice
  vorschau/                           PDF-Vorschau jeder Vorlage
  fonts/                              Schriften Manrope und Montserrat (SIL Open Font License 1.1)
  build/                              Erzeugungsskript (nur für Änderungen an Layout oder Bankdaten)

Öffnen
  - Doppelklick auf eine .dotx öffnet ein NEUES Dokument auf Basis der Vorlage.
    So für jedes Angebot und jede Rechnung arbeiten; die Vorlage bleibt unverändert.
  - Rechtsklick → Öffnen öffnet die Vorlage SELBST zum Bearbeiten (z. B. für die Bankdaten).
  - Am Mac: in Word über Datei → Öffnen die .dotx wählen, um die Vorlage selbst zu bearbeiten.

Versand
  An Kundinnen und Kunden immer als PDF senden (Datei → Speichern unter → PDF).
  Word im Web, iPad, Pages und Google Docs ersetzen die Schriften.

Schriften
  Manrope und Montserrat sind in den Vorlagen eingebettet, die Dokumente sehen also auch
  auf Rechnern ohne diese Schriften richtig aus. Optional die Dateien in fonts/ per
  Doppelklick → Installieren einrichten.

Bankverbindung (IBAN, BIC, Bank) – einmalig eintragen
  Variante A: In build/build_vorlagen.py ganz oben BANK_IBAN, BANK_BIC und BANK_NAME
              eintragen und das Skript erneut ausführen (Befehl im Kopf des Skripts).
              Alle Rechnungsvorlagen enthalten dann die Daten.
  Variante B: Rechnung_DE.dotx und Invoice_EN.dotx je einmal mit Rechtsklick → Öffnen
              öffnen, die Felder „[IBAN eintragen]“ usw. ausfüllen und speichern.
              Ein späterer Lauf des Skripts überschreibt das – dann Variante A nutzen.

Ausfüllen
  - Graue Texte in eckigen Klammern sind Eingabefelder: anklicken und überschreiben.
    Datumsfelder öffnen einen Kalender, das Kästchen in der Auftragsbestätigung per Klick.
  - Verknüpfte Felder werden nur einmal eingegeben und erscheinen automatisch an den
    anderen Stellen: Angebots- bzw. Rechnungsnummer, Kundenname (erste Adresszeile),
    „Gültig bis“, „Fällig am“ und der Gesamtbetrag (Kopfzeile ab Seite 2,
    Konditionen, Zahlungshinweis, Auftragsbestätigung).
    Achtung: Datei → Informationen → Auf Probleme überprüfen → Dokument prüfen →
    „Benutzerdefinierte XML-Daten“ entfernen löst diese Verknüpfung.
  - Neue Position: in der letzten Zelle der Positionstabelle die Tabulatortaste drücken;
    die Positionsnummer zählt automatisch weiter.
  - Beträge und Summen werden von Hand eingetragen (keine automatische Berechnung).
  - Nicht benötigte optionale Zeilen löschen, damit nichts Graues gedruckt wird:
      Rechnung: Kundennummer, Zu Angebot Nr., Ihre UID-Nr. (nur bei Unternehmen mit
                Rechnungsbetrag über EUR 10.000,-), Projekt, Zeile „Abzüglich Anzahlung“
      Angebot:  Projektort, Hinweis auf nicht enthaltene Leistungen, Anzahlung,
                Fahrtkosten, Hinweis auf beiliegende Widerrufsbelehrung
    Zeilen im Info-Block oben rechts sind einfache Absätze; Tabellenzeilen über
    Rechtsklick → Löschen → Zeilen löschen entfernen.
"""


def main() -> None:
    (OUT / "LIESMICH.txt").write_text(LIESMICH, encoding="utf-8")
    fonts = build_fonts()
    logo = build_logo()
    for lang in ("de", "en"):
        for kind in ("angebot", "rechnung"):
            print("built", build(lang, kind, fonts, logo).relative_to(ROOT))


if __name__ == "__main__":
    main()
