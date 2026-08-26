import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

def generate_all_tickets():
    # Exact 1080 x 1920 resolution
    W, H = 1080, 1920
    
    # Ticket Card Dimensions
    card_w, card_h = 980, 1820
    cx1 = (W - card_w) // 2  # 50
    cy1 = (H - card_h) // 2  # 50
    cx2 = cx1 + card_w       # 1030
    cy2 = cy1 + card_h       # 1870
    
    split_y = cy1 + int(card_h * 0.63)  # ~1196
    corner_r = 36
    notch_r = 44

    out_dir = 'public/tickets'
    os.makedirs(out_dir, exist_ok=True)

    # Load Fonts
    try:
        font_huge = ImageFont.truetype('C:/Windows/Fonts/bahnschrift.ttf', 84)
        font_sub = ImageFont.truetype('C:/Windows/Fonts/bahnschrift.ttf', 28)
        font_tag = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 20)
        font_event_bar = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 28)
        font_lbl_name = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 32)
        font_lbl_code = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 30)
        font_footer = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 18)
    except:
        font_huge = ImageFont.load_default()
        font_sub = font_huge
        font_tag = font_huge
        font_event_bar = font_huge
        font_lbl_name = font_huge
        font_lbl_code = font_huge
        font_footer = font_huge

    # Build Card Mask
    def get_card_mask():
        mask = Image.new('L', (W, H), 0)
        draw = ImageDraw.Draw(mask)
        draw.rounded_rectangle([(cx1, cy1), (cx2, cy2)], radius=corner_r, fill=255)
        # Top center notch
        draw.ellipse([(W//2 - notch_r, cy1 - notch_r), (W//2 + notch_r, cy1 + notch_r)], fill=0)
        # Bottom center notch
        draw.ellipse([(W//2 - notch_r, cy2 - notch_r), (W//2 + notch_r, cy2 + notch_r)], fill=0)
        # Left perforation notch
        draw.ellipse([(cx1 - notch_r, split_y - notch_r), (cx1 + notch_r, split_y + notch_r)], fill=0)
        # Right perforation notch
        draw.ellipse([(cx2 - notch_r, split_y - notch_r), (cx2 + notch_r, split_y + notch_r)], fill=0)
        return mask

    card_mask = get_card_mask()

    # Load Shared Logos
    col_logo = None
    if os.path.exists('public/college-logo-white.png'):
        col_logo = Image.open('public/college-logo-white.png').convert('RGBA')
    elif os.path.exists('public/college-logo.png'):
        col_logo = Image.open('public/college-logo.png').convert('RGBA')

    alg_logo = None
    if os.path.exists('public/algora-logo.png'):
        alg_logo = Image.open('public/algora-logo.png').convert('RGBA')

    # All 7 Event Configurations
    events = [
        {
            "id": "Aivora",
            "filename": "Aivora_ticket_template.png",
            "god_img": "public/god-zeus.png",
            "tag_text": "FLAGSHIP MARQUEE TRIAL",
            "tag_color": (124, 58, 237, 220),       # Royal Purple
            "title": "AIVORA",
            "subtitle": "AI APP DEVELOPMENT",
            "event_bar_text": "Aivora - AI App Development",
            "accent_color": (225, 29, 72, 255),       # Rose / Red
            "bg_color_top": (14, 8, 26),
            "bg_color_bot": (35, 15, 65),
            "glass_tint": (14, 8, 28, 140),
            "bar_outline": (124, 58, 237, 200),
        },
        {
            "id": "Athenas_Quest",
            "filename": "Athenas_Quest_ticket_template.png",
            "god_img": "public/god-athena.png",
            "tag_text": "CAMPUS QR & TREASURE HUNT",
            "tag_color": (5, 150, 105, 220),        # Emerald Green
            "title": "ATHENA'S QUEST",
            "subtitle": "CAMPUS QR & TREASURE HUNT",
            "event_bar_text": "Athena's Quest - Campus QR & Treasure Hunt",
            "accent_color": (5, 150, 105, 255),      # Emerald Green
            "bg_color_top": (6, 22, 18),
            "bg_color_bot": (10, 45, 35),
            "glass_tint": (6, 20, 16, 140),
            "bar_outline": (16, 185, 129, 200),
        },
        {
            "id": "Artemis_Hunt",
            "filename": "Artemis_Hunt_ticket_template.png",
            "god_img": "public/god-artemis.png",
            "tag_text": "CODE DEBUGGING COMPETITION",
            "tag_color": (101, 163, 13, 220),       # Lime Green
            "title": "ARTEMIS' HUNT",
            "subtitle": "CODE DEBUGGING COMPETITION",
            "event_bar_text": "Artemis' Hunt - Code Debugging Competition",
            "accent_color": (101, 163, 13, 255),     # Lime Green
            "bg_color_top": (12, 22, 10),
            "bg_color_bot": (28, 48, 20),
            "glass_tint": (10, 20, 8, 140),
            "bar_outline": (132, 204, 22, 200),
        },
        {
            "id": "Echoes_of_Eros",
            "filename": "Echoes_of_Eros_ticket_template.png",
            "god_img": "public/god-aphrodite.png",
            "tag_text": "REEL EDITING & STORYTELLING",
            "tag_color": (219, 39, 119, 220),       # Rose / Magenta
            "title": "ECHOES OF EROS",
            "subtitle": "REEL EDITING & STORYTELLING",
            "event_bar_text": "Echoes of Eros - Reel Editing & Storytelling",
            "accent_color": (219, 39, 119, 255),     # Magenta / Pink
            "bg_color_top": (26, 8, 20),
            "bg_color_bot": (58, 15, 45),
            "glass_tint": (24, 8, 18, 140),
            "bar_outline": (236, 72, 153, 200),
        },
        {
            "id": "Helios",
            "filename": "Helios_ticket_template.png",
            "god_img": "public/god-poseidon.png",
            "tag_text": "SPEED TYPING COMPETITION",
            "tag_color": (2, 132, 199, 220),        # Ocean Cyan
            "title": "HELIOS",
            "subtitle": "SPEED TYPING COMPETITION",
            "event_bar_text": "Helios - Speed Typing Competition",
            "accent_color": (2, 132, 199, 255),      # Ocean Cyan
            "bg_color_top": (6, 18, 30),
            "bg_color_bot": (12, 40, 68),
            "glass_tint": (6, 16, 28, 140),
            "bar_outline": (14, 165, 233, 200),
        },
        {
            "id": "Chronos",
            "filename": "Chronos_ticket_template.png",
            "god_img": "public/god-apollo.png",
            "tag_text": "SHORT FILM REVIEW",
            "tag_color": (217, 119, 6, 220),        # Amber / Solar Gold
            "title": "CHRONOS",
            "subtitle": "SHORT FILM REVIEW",
            "event_bar_text": "Chronos - Short Film Review",
            "accent_color": (217, 119, 6, 255),      # Amber / Solar Gold
            "bg_color_top": (26, 16, 6),
            "bg_color_bot": (58, 36, 12),
            "glass_tint": (24, 14, 6, 140),
            "bar_outline": (245, 158, 11, 200),
        },
        {
            "id": "Ares_Golazo",
            "filename": "Ares_Golazo_ticket_template.png",
            "god_img": "public/god-ares.png",
            "tag_text": "EFOOTBALL TOURNAMENT",
            "tag_color": (220, 38, 38, 220),        # Crimson Red
            "title": "ARES GOLAZO",
            "subtitle": "EFOOTBALL TOURNAMENT",
            "event_bar_text": "Ares Golazo - eFootball Tournament",
            "accent_color": (220, 38, 38, 255),      # Crimson Red
            "bg_color_top": (28, 8, 8),
            "bg_color_bot": (64, 16, 16),
            "glass_tint": (24, 8, 8, 140),
            "bar_outline": (239, 68, 68, 200),
        }
    ]

    for ev in events:
        print(f"Generating Ticket for {ev['id']}...")
        
        # 1. Base Canvas Gradient
        base = Image.new('RGBA', (W, H), (0, 0, 0, 255))
        draw_b = ImageDraw.Draw(base)
        for y in range(H):
            t = y / H
            r = int(ev['bg_color_top'][0] + (ev['bg_color_bot'][0] - ev['bg_color_top'][0]) * np.sin(t * np.pi * 0.85))
            g = int(ev['bg_color_top'][1] + (ev['bg_color_bot'][1] - ev['bg_color_top'][1]) * np.sin(t * np.pi * 0.85))
            b = int(ev['bg_color_top'][2] + (ev['bg_color_bot'][2] - ev['bg_color_top'][2]) * np.sin(t * np.pi * 0.85))
            draw_b.line([(0, y), (W, y)], fill=(r, g, b, 255))

        # Drop shadow
        shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        draw_s = ImageDraw.Draw(shadow)
        draw_s.bitmap((0, 0), card_mask, fill=(0, 0, 0, 210))
        shadow = shadow.filter(ImageFilter.GaussianBlur(22))
        base = Image.alpha_composite(base, shadow)

        # 2. Top Card Layer (Full-Bleed Artwork)
        top_card = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        
        # Scale and paste God artwork
        if os.path.exists(ev['god_img']):
            god_raw = Image.open(ev['god_img']).convert('RGBA')
            scale_w = card_w + 60
            scale_h = int(god_raw.height * (scale_w / god_raw.width))
            god_scaled = god_raw.resize((scale_w, scale_h), Image.Resampling.LANCZOS)
            
            # Position character in right-center while background naturally covers left
            zx = cx1 - 30
            zy = cy1 - 40
            top_card.paste(god_scaled, (zx, zy))

            # Translucent frosted glass backing behind text on left
            text_glass = Image.new('RGBA', (W, H), (0, 0, 0, 0))
            draw_tg = ImageDraw.Draw(text_glass)
            draw_tg.rounded_rectangle([(cx1 + 25, cy1 + 160), (cx1 + 550, cy1 + 440)], radius=24,
                                      fill=ev['glass_tint'], outline=(255, 255, 255, 40), width=1)
            top_card = Image.alpha_composite(top_card, text_glass)

        # Header Logos
        if col_logo:
            target_col_h = 75
            col_w = int(col_logo.width * (target_col_h / col_logo.height))
            col_resized = col_logo.resize((col_w, target_col_h), Image.Resampling.LANCZOS)
            top_card.paste(col_resized, (cx1 + 40, cy1 + 55), col_resized)

        if alg_logo:
            target_alg_h = 72
            alg_w = int(alg_logo.width * (target_alg_h / alg_logo.height))
            alg_resized = alg_logo.resize((alg_w, target_alg_h), Image.Resampling.LANCZOS)
            top_card.paste(alg_resized, (cx2 - 40 - alg_w, cy1 + 55), alg_resized)

        draw_top = ImageDraw.Draw(top_card)
        
        # Tag Pill
        tag_x, tag_y = cx1 + 45, cy1 + 178
        tag_w = draw_top.textbbox((0, 0), ev['tag_text'], font=font_tag)[2] + 36
        draw_top.rounded_rectangle([(tag_x, tag_y), (tag_x + tag_w, tag_y + 40)], radius=10,
                                   fill=ev['tag_color'], outline=(212, 175, 55, 220), width=1)
        draw_top.text((tag_x + 18, tag_y + 8), ev['tag_text'], font=font_tag, fill=(255, 255, 255, 255))

        # Event Title
        draw_top.text((cx1 + 45, cy1 + 245), ev['title'], font=font_huge, fill=(255, 255, 255, 255))
        title_w = draw_top.textbbox((0, 0), ev['title'], font=font_huge)[2]
        draw_top.line([(cx1 + 45, cy1 + 355), (cx1 + 45 + max(title_w, 350), cy1 + 355)], fill=(212, 175, 55, 255), width=3)
        draw_top.text((cx1 + 45, cy1 + 375), ev['subtitle'], font=font_sub, fill=(225, 235, 255, 255))

        # Center Event Name Bar (Away from side notches with auto-fitting font size)
        bar_x1, bar_y1 = cx1 + 70, split_y - 85
        bar_x2, bar_y2 = cx2 - 70, split_y - 22
        draw_top.rounded_rectangle([(bar_x1, bar_y1), (bar_x2, bar_y2)], radius=16,
                                   fill=(ev['bg_color_top'][0], ev['bg_color_top'][1], ev['bg_color_top'][2], 235), 
                                   outline=ev['bar_outline'], width=2)
        
        # Calculate optimal font size for event bar text so it fits comfortably
        max_avail_w = (bar_x2 - bar_x1) - 50
        font_bar_sz = 26
        while font_bar_sz >= 18:
            try:
                cur_font = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', font_bar_sz)
            except:
                cur_font = font_tag
            full_str = "EVENT NAME : " + ev['event_bar_text']
            box = draw_top.textbbox((0, 0), full_str, font=cur_font)
            if (box[2] - box[0]) <= max_avail_w:
                break
            font_bar_sz -= 1

        prefix = "EVENT NAME : "
        draw_top.text((bar_x1 + 25, bar_y1 + 17), prefix, font=cur_font, fill=ev['accent_color'])
        prefix_w = draw_top.textbbox((0, 0), prefix, font=cur_font)[2]
        draw_top.text((bar_x1 + 25 + prefix_w, bar_y1 + 17), ev['event_bar_text'], font=cur_font, fill=(255, 255, 255, 255))

        # 3. Bottom Stub (White Card)
        bot_stub = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        draw_bot = ImageDraw.Draw(bot_stub)
        draw_bot.rounded_rectangle([(cx1, split_y), (cx2, cy2)], radius=corner_r, fill=(255, 255, 255, 255))

        # Perforation Line
        for x in range(cx1 + notch_r + 15, cx2 - notch_r - 15, 16):
            draw_bot.line([(x, split_y), (x + 8, split_y)], fill=(180, 185, 195, 255), width=2)

        # Left Column: Delegate Name & Invite Code
        left_x = cx1 + 55
        name_y = split_y + 65
        draw_bot.text((left_x, name_y), "Delegate Name", font=font_lbl_name, fill=ev['accent_color'])
        code_y = name_y + 140
        draw_bot.text((left_x, code_y), "Invite Code:", font=font_lbl_code, fill=ev['accent_color'])

        # Footer Text (Safely above bottom notch)
        draw_bot.text((left_x, cy2 - 95), "ALGORA 2026 · ST. GEORGE'S COLLEGE ARUVITHURA", font=font_footer, fill=(160, 165, 175, 255))

        # Right Column: QR Code Slot
        qr_x1, qr_y1 = cx2 - 380, split_y + 50
        qr_w, qr_h = 330, 330
        qr_x2, qr_y2 = qr_x1 + qr_w, qr_y1 + qr_h
        draw_bot.rounded_rectangle([(qr_x1, qr_y1), (qr_x2, qr_y2)], radius=18,
                                   fill=(255, 255, 255, 255), outline=(235, 240, 245, 255), width=2)
        cw = 22
        draw_bot.line([(qr_x1 + 6, qr_y1 + 6), (qr_x1 + 6 + cw, qr_y1 + 6)], fill=(190, 200, 215, 255), width=2)
        draw_bot.line([(qr_x1 + 6, qr_y1 + 6), (qr_x1 + 6 + cw, qr_y1 + 6)], fill=(190, 200, 215, 255), width=2)
        draw_bot.line([(qr_x2 - 6, qr_y1 + 6), (qr_x2 - 6 - cw, qr_y1 + 6)], fill=(190, 200, 215, 255), width=2)
        draw_bot.line([(qr_x2 - 6, qr_y1 + 6), (qr_x2 - 6, qr_y1 + 6 + cw)], fill=(190, 200, 215, 255), width=2)
        draw_bot.line([(qr_x1 + 6, qr_y2 - 6), (qr_x1 + 6 + cw, qr_y2 - 6)], fill=(190, 200, 215, 255), width=2)
        draw_bot.line([(qr_x1 + 6, qr_y2 - 6), (qr_x1 + 6, qr_y2 - 6 - cw)], fill=(190, 200, 215, 255), width=2)
        draw_bot.line([(qr_x2 - 6, qr_y2 - 6), (qr_x2 - 6 - cw, qr_y2 - 6)], fill=(190, 200, 215, 255), width=2)
        draw_bot.line([(qr_x2 - 6, qr_y2 - 6), (qr_x2 - 6, qr_y2 - 6 + cw)], fill=(190, 200, 215, 255), width=2)

        # 4. Composite Layers
        top_mask = card_mask.copy()
        ImageDraw.Draw(top_mask).rectangle([(0, split_y), (W, H)], fill=0)
        base.paste(top_card, (0, 0), top_mask)

        bot_mask = card_mask.copy()
        ImageDraw.Draw(bot_mask).rectangle([(0, 0), (W, split_y)], fill=0)
        base.paste(bot_stub, (0, 0), bot_mask)

        # Save to tickets folder
        save_path = os.path.join(out_dir, ev['filename'])
        base.save(save_path, format='PNG', optimize=True)
        print(f"Saved: {save_path}")

    print("All 7 tickets generated and saved successfully!")

if __name__ == '__main__':
    generate_all_tickets()
