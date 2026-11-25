#!/usr/bin/env bash
# 🖼️ Generates 1200x630 social share images (Open Graph / X / LinkedIn) into public/og/.
#
# Why: X, LinkedIn, Facebook and iMessage crop link previews to ~1.91:1.
# Tall portraits get center-cropped, which cuts off the face. These cards are
# pre-sized so nothing important gets cropped.
#
# Requires ImageMagick 6+ (`convert`). Run: bash scripts/generate-og-images.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_AI="$ROOT/public/assets/aistudio"
SRC_IMG="$ROOT/public/images"
OUT="$ROOT/public/og"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"

W=1200
H=630
BG_DARK="#030508"
BG_MID="#0F1726"
ACCENT="#38BDF8"
TEXT="#F4F7FB"
MUTED="#9FB0C8"
FONT_DISPLAY="Inter-Display-Bold"
FONT_BODY="Inter-Medium"
FONT_MONO="JetBrains-Mono-Medium"

# Fall back to fonts that exist on most systems.
font_or() { convert -list font | grep -q "Font: $1\$" && echo "$1" || echo "$2"; }
FONT_DISPLAY="$(font_or "$FONT_DISPLAY" DejaVu-Sans-Bold)"
FONT_BODY="$(font_or "$FONT_BODY" DejaVu-Sans)"
FONT_MONO="$(font_or "$FONT_MONO" DejaVu-Sans-Mono)"

save_jpg() { convert "$1" -strip -interlace JPEG -sampling-factor 4:2:0 -quality 86 "$2"; }

# 📸 Landscape photo -> exact 1200x630 crop. $3 = gravity (Center, North, ...).
photo() {
  local src="$1" name="$2" gravity="${3:-Center}"
  convert "$src" -background "$BG_DARK" -alpha remove -alpha off \
    -resize "${W}x${H}^" -gravity "$gravity" -extent "${W}x${H}" "$TMP/$name.png"
  save_jpg "$TMP/$name.png" "$OUT/$name.jpg"
  echo "✅ og/$name.jpg"
}

# 🪪 Portrait -> branded card: text on the left, full head-and-shoulders on the right.
# $3 kicker, $4 title (may contain \n), $5 subtitle (may contain \n)
card() {
  local src="$1" name="$2" kicker="$3" title="$4" subtitle="$5"
  local base="$TMP/$name-bg.png" person="$TMP/$name-person.png"

  # Background: diagonal dark gradient plus a soft accent glow behind the portrait.
  convert -size "${W}x${H}" gradient:"$BG_MID"-"$BG_DARK" -rotate 0 \
    \( -size 900x900 radial-gradient:"rgba(56,189,248,0.30)"-"rgba(56,189,248,0)" \) \
    -gravity center -geometry +330+40 -composite "$base"

  if convert "$src" -format '%[opaque]' info: | grep -qi false; then
    # Cut-out portrait (transparent bg): trim, fit, anchor bottom-right.
    convert "$src" -trim +repage -resize "x$((H - 30))" "$person"
    convert "$base" "$person" -gravity southeast -geometry +0+0 -composite "$base"
  else
    # Opaque photo: fit to full height, keep at most the right 600px,
    # then fade its left edge into the background.
    convert "$src" -resize "x${H}" -gravity east -crop "600x${H}+0+0" +repage "$person"
    local pw
    pw="$(identify -format '%w' "$person")"
    convert "$person" \
      \( -size "${pw}x${H}" xc:white \
         \( -size "${H}x$((pw * 40 / 100))" gradient:black-white -rotate -90 \) \
         -gravity west -composite \) \
      -alpha off -compose CopyOpacity -composite "$person"
    convert "$base" "$person" -gravity east -compose over -composite "$base"
  fi

  # Text column (kept in the top ~70% so X's title pill does not cover it).
  convert "$base" \
    -fill "$ACCENT" -draw "rectangle 64,96 120,100" \
    -font "$FONT_MONO" -pointsize 20 -fill "$ACCENT" -gravity northwest \
    -annotate +64+112 "$kicker" \
    -font "$FONT_DISPLAY" -pointsize 58 -interline-spacing -6 -fill "$TEXT" \
    -annotate +62+150 "$title" \
    -font "$FONT_BODY" -pointsize 26 -interline-spacing 4 -fill "$MUTED" \
    -annotate +64+310 "$subtitle" \
    "$TMP/$name.png"
  save_jpg "$TMP/$name.png" "$OUT/$name.jpg"
  echo "✅ og/$name.jpg"
}

# 🪪 Branded portrait cards
card "$SRC_AI/Professional_Executive_Portrait_9d49b2b1.webp" home \
  "PAGUIRE.COM" "Christopher R\nMcGuire" "SVP of Engineering,\nUX/UI & AI Architecture"
card "$SRC_AI/Confident_Twilight_City_Portrait_b31578fb.webp" resume \
  "RESUME & CAREER DOSSIER" "Christopher R\nMcGuire" "20+ years leading engineering,\ndesign systems and applied AI"
card "$SRC_AI/Seated_portrait_with_walnut_table_b754e931.webp" library \
  "LIBRARY" "Books, Playbooks\n& Essays" "FinTech UX, design systems,\nAI and engineering leadership"
card "$SRC_AI/Charcoal_Blazer_Portrait_in_Warm_Studio_6a74e7c0.webp" contact \
  "LET'S TALK" "Contact &\nCollaboration" "Engineering leadership, UX/UI\nand applied AI advisory"

# 📸 Landscape page heroes
photo "$SRC_AI/ChristopherMcGuire__AnEvolvingStory_5603d57c.webp" biography
photo "$SRC_AI/Burgundy-shirted_man_at_his_desk_6adaa473.webp" projects
photo "$SRC_AI/FuturisticAILabHeroSection_9403f7f4.webp" ai-explorations
photo "$SRC_AI/Modus_AI_e260817c.webp" modus-ai
photo "$SRC_AI/SnapClipper_dc1f331f.webp" snapclipper
photo "$SRC_AI/Christopher_Building_a_Web_App_39016f52.webp" blueprint North

# 📸 Blog article covers (file name = cover image base name)
for src in \
  "$SRC_IMG/blog-fintech-safe.webp" \
  "$SRC_AI/Exploring_AI_in_a_Walnut_Studio_1fb365fd.webp" \
  "$SRC_IMG/blog-icon-types.webp" \
  "$SRC_IMG/blog-roi.webp" \
  "$SRC_AI/ChristopherWorkingWithTradingApps.webp" \
  "$SRC_IMG/blog-custom-icons.webp" \
  "$SRC_IMG/blog-web-ui.webp" \
  "$SRC_IMG/blog-job-titles.webp" \
  "$SRC_IMG/blog-fullstack.webp" \
  "$SRC_IMG/blog-frontend.webp"; do
  base="$(basename "$src")"
  photo "$src" "${base%.*}"
done
