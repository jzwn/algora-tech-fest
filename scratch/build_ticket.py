import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

def generate_tickets():
    # Target resolution: Exactly 1080 x 1920 (Vertical 9:16)
    W, H = 1080, 1920
    
    # Ticket Card Dimensions
    card_w, card_h = 980, 1820
    cx1 = (W - card_w) // 2  # 50
    cy1 = (H - card_h) // 2  # 50
    cx2 = cx1 + card_w       # 1030
    cy2 = cy1 + card_h       # 1870
    
    split_y = cy1 + int(card_h * 0.63)  # ~1196
    top_h = split_y - cy1               # 1146
    corner_r = 36
    notch_r = 44

    out_dir = 'public/tickets'
    os.makedirs(out_dir, exist_ok=True)

    # Load Fonts
    try:
        font_huge_aivora = ImageFont.truetype('C:/Windows/Fonts/bahnschrift.ttf', 90)
        font_huge_athena = ImageFont.truetype('C:/Windows/Fonts/bahnschrift.ttf', 76)
        font_sub = ImageFont.truetype('C:/Windows/Fonts/bahnschrift.ttf', 30)
        font_tag = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 20)
        font_event_bar = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 28)
        font_lbl_name = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 32)
        font_lbl_code = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 30)
        font_footer = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 18)
    except:
        font_huge_aivora = ImageFont.load_default()
        font_huge_athena = font_huge_aivora
        font_sub = font_huge_aivora
        font_tag = font_huge_aivora
        font_event_bar = font_huge_aivora
        font_lbl_name = font_huge_aivora
        font_lbl_code = font_huge_aivora
        font_footer = font_huge_aivora

    # Helper to build card mask with 4 notches
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

    # Load shared logos
    col_logo = None
    if os.path.exists('public/college-logo-white.png'):
        col_logo = Image.open('public/college-logo-white.png').convert('RGBA')
    elif os.path.exists('public/college-logo.png'):
        col_logo = Image.open('public/college-logo.png').convert('RGBA')

    alg_logo = None
    if os.path.exists('public/algora-logo.png'):
        alg_logo = Image.open('public/algora-logo.png').convert('RGBA')

    # =========================================================================
    # 1. TICKET 1: AIVORA - AI APP DEVELOPMENT (Zeus Theme)
    # =========================================================================
    print("Generating Aivora Ticket (Full Artwork Background)...")
    base_aivora = Image.new('RGBA', (W, H), (14, 8, 26, 255))
    draw_base_a = ImageDraw.Draw(base_aivora)
    for y in range(H):
        t = y / H
        r = int(14 + 40 * np.sin(t * np.pi * 0.85))
        g = int(8 + 18 * np.sin(t * np.pi * 0.85))
        b = int(28 + 75 * np.sin(t * np.pi * 0.85))
        draw_base_a.line([(0, y), (W, y)], fill=(r, g, b, 255))

    # Drop shadow
    shadow_a = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw_sha_a = ImageDraw.Draw(shadow_a)
    draw_sha_a.bitmap((0, 0), card_mask, fill=(0, 0, 0, 210))
    shadow_a = shadow_a.filter(ImageFilter.GaussianBlur(22))
    base_aivora = Image.alpha_composite(base_aivora, shadow_a)

    # Top Card Layer
    top_aivora = Image.new('RGBA', (W, H), (0, 0, 0, 0))

    # Scale Zeus artwork to fill the full width & height seamlessly
    if os.path.exists('public/god-zeus.png'):
        zeus_raw = Image.open('public/god-zeus.png').convert('RGBA')
        # Scale to width slightly larger than card_w (e.g. 1040px)
        scale_w = card_w + 60  # 1040px
        scale_h = int(zeus_raw.height * (scale_w / zeus_raw.width)) # ~1560px
        zeus_scaled = zeus_raw.resize((scale_w, scale_h), Image.Resampling.LANCZOS)
        
        # Position so Zeus character stays in the right-center while background fills left
        zx = cx1 - 30
        zy = cy1 - 40
        top_aivora.paste(zeus_scaled, (zx, zy))

        # Soft frosted glass backing behind text on the left (semi-transparent, background still visible!)
        text_glass = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        draw_tg = ImageDraw.Draw(text_glass)
        
        # Rounded frosted glass panel on top-left
        draw_tg.rounded_rectangle([(cx1 + 25, cy1 + 160), (cx1 + 540, cy1 + 440)], radius=24,
                                  fill=(14, 8, 28, 140), outline=(255, 255, 255, 40), width=1)
        top_aivora = Image.alpha_composite(top_aivora, text_glass)

    # Logos on top (Clean direct overlay with subtle drop shadow for crisp visibility)
    if col_logo:
        target_col_h = 75
        col_w = int(col_logo.width * (target_col_h / col_logo.height))
        col_resized = col_logo.resize((col_w, target_col_h), Image.Resampling.LANCZOS)
        top_aivora.paste(col_resized, (cx1 + 40, cy1 + 55), col_resized)

    if alg_logo:
        target_alg_h = 72
        alg_w = int(alg_logo.width * (target_alg_h / alg_logo.height))
        alg_resized = alg_logo.resize((alg_w, target_alg_h), Image.Resampling.LANCZOS)
        top_aivora.paste(alg_resized, (cx2 - 40 - alg_w, cy1 + 55), alg_resized)

    draw_top_a = ImageDraw.Draw(top_aivora)
    # Tag Pill
    tag_x, tag_y = cx1 + 45, cy1 + 178
    draw_top_a.rounded_rectangle([(tag_x, tag_y), (tag_x + 340, tag_y + 40)], radius=10,
                                 fill=(124, 58, 237, 220), outline=(212, 175, 55, 220), width=1)
    draw_top_a.text((tag_x + 18, tag_y + 8), "FLAGSHIP MARQUEE TRIAL", font=font_tag, fill=(255, 255, 255, 255))

    # Event Title: AIVORA
    draw_top_a.text((cx1 + 45, cy1 + 245), "AIVORA", font=font_huge_aivora, fill=(255, 255, 255, 255))
    draw_top_a.line([(cx1 + 45, cy1 + 355), (cx1 + 450, cy1 + 355)], fill=(212, 175, 55, 255), width=3)
    draw_top_a.text((cx1 + 45, cy1 + 375), "AI APP DEVELOPMENT", font=font_sub, fill=(225, 210, 255, 255))

    # Center Event Name Bar (Away from side notches)
    bar_x1, bar_y1 = cx1 + 70, split_y - 85
    bar_x2, bar_y2 = cx2 - 70, split_y - 22
    draw_top_a.rounded_rectangle([(bar_x1, bar_y1), (bar_x2, bar_y2)], radius=16,
                                 fill=(14, 8, 26, 235), outline=(124, 58, 237, 200), width=2)
    prefix = "EVENT NAME : "
    title_str = "Aivora - AI App Development"
    draw_top_a.text((bar_x1 + 25, bar_y1 + 16), prefix, font=font_event_bar, fill=(225, 29, 72, 255))
    prefix_w = draw_top_a.textbbox((0, 0), prefix, font=font_event_bar)[2]
    draw_top_a.text((bar_x1 + 25 + prefix_w, bar_y1 + 16), title_str, font=font_event_bar, fill=(255, 255, 255, 255))

    # Bottom Stub (White Card)
    bot_stub_a = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw_bot_a = ImageDraw.Draw(bot_stub_a)
    draw_bot_a.rounded_rectangle([(cx1, split_y), (cx2, cy2)], radius=corner_r, fill=(255, 255, 255, 255))

    # Perforation Line
    for x in range(cx1 + notch_r + 15, cx2 - notch_r - 15, 16):
        draw_bot_a.line([(x, split_y), (x + 8, split_y)], fill=(180, 180, 200, 255), width=2)

    # Left Column: Delegate Name & Invite Code
    left_x = cx1 + 55
    name_y = split_y + 65
    draw_bot_a.text((left_x, name_y), "Delegate Name", font=font_lbl_name, fill=(225, 29, 72, 255))
    code_y = name_y + 140
    draw_bot_a.text((left_x, code_y), "Invite Code:", font=font_lbl_code, fill=(225, 29, 72, 255))

    # Footer Text (Safely above bottom notch)
    draw_bot_a.text((left_x, cy2 - 95), "ALGORA 2026 · ST. GEORGE'S COLLEGE ARUVITHURA", font=font_footer, fill=(160, 160, 180, 255))

    # Right Column: QR Code Slot
    qr_x1, qr_y1 = cx2 - 380, split_y + 50
    qr_w, qr_h = 330, 330
    qr_x2, qr_y2 = qr_x1 + qr_w, qr_y1 + qr_h
    draw_bot_a.rounded_rectangle([(qr_x1, qr_y1), (qr_x2, qr_y2)], radius=18,
                                 fill=(255, 255, 255, 255), outline=(240, 240, 248, 255), width=2)
    cw = 22
    draw_bot_a.line([(qr_x1 + 6, qr_y1 + 6), (qr_x1 + 6 + cw, qr_y1 + 6)], fill=(210, 210, 230, 255), width=2)
    draw_bot_a.line([(qr_x1 + 6, qr_y1 + 6), (qr_x1 + 6, qr_y1 + 6 + cw)], fill=(210, 210, 230, 255), width=2)
    draw_bot_a.line([(qr_x2 - 6, qr_y1 + 6), (qr_x2 - 6 - cw, qr_y1 + 6)], fill=(210, 210, 230, 255), width=2)
    draw_bot_a.line([(qr_x2 - 6, qr_y1 + 6), (qr_x2 - 6, qr_y1 + 6 + cw)], fill=(210, 210, 230, 255), width=2)
    draw_bot_a.line([(qr_x1 + 6, qr_y2 - 6), (qr_x1 + 6 + cw, qr_y2 - 6)], fill=(210, 210, 230, 255), width=2)
    draw_bot_a.line([(qr_x1 + 6, qr_y2 - 6), (qr_x1 + 6, qr_y2 - 6 - cw)], fill=(210, 210, 230, 255), width=2)
    draw_bot_a.line([(qr_x2 - 6, qr_y2 - 6), (qr_x2 - 6 - cw, qr_y2 - 6)], fill=(210, 210, 230, 255), width=2)
    draw_bot_a.line([(qr_x2 - 6, qr_y2 - 6), (qr_x2 - 6, qr_y2 - 6 + cw)], fill=(210, 210, 230, 255), width=2)

    # Composite Aivora
    top_mask = card_mask.copy()
    ImageDraw.Draw(top_mask).rectangle([(0, split_y), (W, H)], fill=0)
    base_aivora.paste(top_aivora, (0, 0), top_mask)

    bot_mask = card_mask.copy()
    ImageDraw.Draw(bot_mask).rectangle([(0, 0), (W, split_y)], fill=0)
    base_aivora.paste(bot_stub_a, (0, 0), bot_mask)

    # Save Aivora
    base_aivora.save(os.path.join(out_dir, 'Aivora_ticket_template.png'), format='PNG', optimize=True)
    base_aivora.save('public/Aivora_ticket_template.png', format='PNG', optimize=True)
    base_aivora.save('public/ticket_template.png', format='PNG', optimize=True)
    base_aivora.save('public/ticket-template.png', format='PNG', optimize=True)
    print("Aivora ticket saved successfully!")

    # =========================================================================
    # 2. TICKET 2: ATHENA'S QUEST (Athena Theme - Emerald / Cyan / Gold)
    # =========================================================================
    print("Generating Athena's Quest Ticket (Full Artwork Background)...")
    base_athena = Image.new('RGBA', (W, H), (6, 22, 18, 255))
    draw_base_ath = ImageDraw.Draw(base_athena)
    for y in range(H):
        t = y / H
        r = int(6 + 18 * np.sin(t * np.pi * 0.85))
        g = int(24 + 48 * np.sin(t * np.pi * 0.85))
        b = int(20 + 35 * np.sin(t * np.pi * 0.85))
        draw_base_ath.line([(0, y), (W, y)], fill=(r, g, b, 255))

    # Drop shadow
    shadow_ath = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw_sha_ath = ImageDraw.Draw(shadow_ath)
    draw_sha_ath.bitmap((0, 0), card_mask, fill=(0, 0, 0, 210))
    shadow_ath = shadow_ath.filter(ImageFilter.GaussianBlur(22))
    base_athena = Image.alpha_composite(base_athena, shadow_ath)

    # Top Card
    top_athena = Image.new('RGBA', (W, H), (0, 0, 0, 0))

    # Scale Athena artwork to fill full width & height
    if os.path.exists('public/god-athena.png'):
        athena_raw = Image.open('public/god-athena.png').convert('RGBA')
        scale_w = card_w + 60  # 1040px
        scale_h = int(athena_raw.height * (scale_w / athena_raw.width)) # ~1560px
        athena_scaled = athena_raw.resize((scale_w, scale_h), Image.Resampling.LANCZOS)
        
        zx = cx1 - 30
        zy = cy1 - 40
        top_athena.paste(athena_scaled, (zx, zy))

        # Soft frosted glass backing behind text on the left
        text_glass_ath = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        draw_tg_ath = ImageDraw.Draw(text_glass_ath)
        draw_tg_ath.rounded_rectangle([(cx1 + 25, cy1 + 160), (cx1 + 550, cy1 + 440)], radius=24,
                                      fill=(6, 20, 16, 140), outline=(255, 255, 255, 40), width=1)
        top_athena = Image.alpha_composite(top_athena, text_glass_ath)

    # Logos on top
    if col_logo:
        target_col_h = 75
        col_w = int(col_logo.width * (target_col_h / col_logo.height))
        col_resized = col_logo.resize((col_w, target_col_h), Image.Resampling.LANCZOS)
        top_athena.paste(col_resized, (cx1 + 40, cy1 + 55), col_resized)

    if alg_logo:
        target_alg_h = 72
        alg_w = int(alg_logo.width * (target_alg_h / alg_logo.height))
        alg_resized = alg_logo.resize((alg_w, target_alg_h), Image.Resampling.LANCZOS)
        top_athena.paste(alg_resized, (cx2 - 40 - alg_w, cy1 + 55), alg_resized)

    draw_top_ath = ImageDraw.Draw(top_athena)
    # Tag Pill
    tag_x, tag_y = cx1 + 45, cy1 + 178
    draw_top_ath.rounded_rectangle([(tag_x, tag_y), (tag_x + 360, tag_y + 40)], radius=10,
                                   fill=(5, 150, 105, 220), outline=(212, 175, 55, 220), width=1)
    draw_top_ath.text((tag_x + 18, tag_y + 8), "CAMPUS QR & TREASURE HUNT", font=font_tag, fill=(255, 255, 255, 255))

    # Event Title: ATHENA'S QUEST
    draw_top_ath.text((cx1 + 45, cy1 + 245), "ATHENA'S QUEST", font=font_huge_athena, fill=(255, 255, 255, 255))
    draw_top_ath.line([(cx1 + 45, cy1 + 355), (cx1 + 480, cy1 + 355)], fill=(212, 175, 55, 255), width=3)
    draw_top_ath.text((cx1 + 45, cy1 + 375), "CAMPUS QR & TREASURE HUNT", font=font_sub, fill=(167, 243, 208, 255))

    # Center Event Name Bar (Away from side notches)
    bar_x1, bar_y1 = cx1 + 70, split_y - 85
    bar_x2, bar_y2 = cx2 - 70, split_y - 22
    draw_top_ath.rounded_rectangle([(bar_x1, bar_y1), (bar_x2, bar_y2)], radius=16,
                                   fill=(6, 20, 16, 235), outline=(16, 185, 129, 200), width=2)
    prefix = "EVENT NAME : "
    title_str = "Athena's Quest - Campus QR & Treasure Hunt"
    draw_top_ath.text((bar_x1 + 25, bar_y1 + 16), prefix, font=font_event_bar, fill=(16, 185, 129, 255))
    prefix_w = draw_top_ath.textbbox((0, 0), prefix, font=font_event_bar)[2]
    draw_top_ath.text((bar_x1 + 25 + prefix_w, bar_y1 + 16), title_str, font=font_event_bar, fill=(255, 255, 255, 255))

    # Bottom Stub (White Card)
    bot_stub_ath = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw_bot_ath = ImageDraw.Draw(bot_stub_ath)
    draw_bot_ath.rounded_rectangle([(cx1, split_y), (cx2, cy2)], radius=corner_r, fill=(255, 255, 255, 255))

    # Perforation Line
    for x in range(cx1 + notch_r + 15, cx2 - notch_r - 15, 16):
        draw_bot_ath.line([(x, split_y), (x + 8, split_y)], fill=(180, 200, 190, 255), width=2)

    # Left Column: Delegate Name & Invite Code
    left_x = cx1 + 55
    name_y = split_y + 65
    draw_bot_ath.text((left_x, name_y), "Delegate Name", font=font_lbl_name, fill=(5, 150, 105, 255))
    code_y = name_y + 140
    draw_bot_ath.text((left_x, code_y), "Invite Code:", font=font_lbl_code, fill=(5, 150, 105, 255))

    # Footer Text (Safely above bottom notch)
    draw_bot_ath.text((left_x, cy2 - 95), "ALGORA 2026 · ST. GEORGE'S COLLEGE ARUVITHURA", font=font_footer, fill=(160, 175, 170, 255))

    # Right Column: QR Code Slot
    qr_x1, qr_y1 = cx2 - 380, split_y + 50
    qr_w, qr_h = 330, 330
    qr_x2, qr_y2 = qr_x1 + qr_w, qr_y1 + qr_h
    draw_bot_ath.rounded_rectangle([(qr_x1, qr_y1), (qr_x2, qr_y2)], radius=18,
                                   fill=(255, 255, 255, 255), outline=(235, 245, 240, 255), width=2)
    cw = 22
    draw_bot_ath.line([(qr_x1 + 6, qr_y1 + 6), (qr_x1 + 6 + cw, qr_y1 + 6)], fill=(180, 215, 200, 255), width=2)
    draw_bot_ath.line([(qr_x1 + 6, qr_y1 + 6), (qr_x1 + 6, qr_y1 + 6 + cw)], fill=(180, 215, 200, 255), width=2)
    draw_bot_ath.line([(qr_x2 - 6, qr_y1 + 6), (qr_x2 - 6 - cw, qr_y1 + 6)], fill=(180, 215, 200, 255), width=2)
    draw_bot_ath.line([(qr_x2 - 6, qr_y1 + 6), (qr_x2 - 6, qr_y1 + 6 + cw)], fill=(180, 215, 200, 255), width=2)
    draw_bot_ath.line([(qr_x1 + 6, qr_y2 - 6), (qr_x1 + 6 + cw, qr_y2 - 6)], fill=(180, 215, 200, 255), width=2)
    draw_bot_ath.line([(qr_x1 + 6, qr_y2 - 6), (qr_x1 + 6, qr_y2 - 6 - cw)], fill=(180, 215, 200, 255), width=2)
    draw_bot_ath.line([(qr_x2 - 6, qr_y2 - 6), (qr_x2 - 6 - cw, qr_y2 - 6)], fill=(180, 215, 200, 255), width=2)
    draw_bot_ath.line([(qr_x2 - 6, qr_y2 - 6), (qr_x2 - 6, qr_y2 - 6 + cw)], fill=(180, 215, 200, 255), width=2)

    # Composite Athena
    top_mask_ath = card_mask.copy()
    ImageDraw.Draw(top_mask_ath).rectangle([(0, split_y), (W, H)], fill=0)
    base_athena.paste(top_athena, (0, 0), top_mask_ath)

    bot_mask_ath = card_mask.copy()
    ImageDraw.Draw(bot_mask_ath).rectangle([(0, 0), (W, split_y)], fill=0)
    base_athena.paste(bot_stub_ath, (0, 0), bot_mask_ath)

    # Save Athena
    base_athena.save(os.path.join(out_dir, 'Athenas_Quest_ticket_template.png'), format='PNG', optimize=True)
    print("Athena's Quest ticket saved successfully!")

if __name__ == '__main__':
    generate_tickets()
