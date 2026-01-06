#!/bin/bash

# Create SVG images for each alphabet
create_svg() {
  local name=$1
  local color=$2
  local emoji=$3
  
  cat > "${name}.svg" << EOF
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="$color"/>
  <text x="100" y="100" font-size="80" text-anchor="middle" dominant-baseline="middle" fill="white">$emoji</text>
  <text x="100" y="180" font-size="16" font-weight="bold" text-anchor="middle" fill="white">$name</text>
</svg>
EOF
}

# Create all images
create_svg "apple" "#FF6B6B" "🍎"
create_svg "ball" "#FFE66D" "⚽"
create_svg "cat" "#FF9F43" "🐱"
create_svg "dog" "#A65628" "🐶"
create_svg "elephant" "#95A5A6" "🐘"
create_svg "fish" "#FF6348" "🐠"
create_svg "grape" "#9B59B6" "🍇"
create_svg "house" "#C0392B" "🏠"
create_svg "icecream" "#F39C12" "��"
create_svg "jellyfish" "#E74C3C" "🪼"
create_svg "kite" "#3498DB" "🪁"
create_svg "lion" "#F4A460" "🦁"
create_svg "monkey" "#D4A574" "🐵"
create_svg "nest" "#8B7355" "🪹"
create_svg "orange" "#FF8C42" "🍊"
create_svg "penguin" "#2C3E50" "🐧"
create_svg "queen" "#D35400" "👑"
create_svg "rainbow" "#9B59B6" "🌈"
create_svg "sun" "#FFD700" "☀️"
create_svg "tiger" "#FF6B35" "🐯"
create_svg "umbrella" "#E74C3C" "☂️"
create_svg "violin" "#8B4513" "🎻"
create_svg "whale" "#1E90FF" "🐋"
create_svg "xylophone" "#FF69B4" "🎵"
create_svg "yoyo" "#FFB347" "🪀"
create_svg "zebra" "#000000" "🦓"

echo "✅ All images created!"
