import re

def generate_summary(content: str) -> str:
    """
    Lightweight heuristic-based summarizer.
    Produces 2–3 meaningful bullet points instead of raw sentence copy.
    """

    if not content or len(content.strip()) < 30:
        return "Summary not available."

    # Clean text
    text = re.sub(r"\s+", " ", content.strip())

    # Split into sentences
    sentences = re.split(r"[.!?]", text)

    # Remove very short / useless sentences
    sentences = [
        s.strip()
        for s in sentences
        if len(s.strip()) > 40
    ]

    if not sentences:
        return "Summary not available."

    # Pick top 2–3 important sentences
    selected = sentences[:3]

    bullets = []
    for s in selected:
        # Light compression
        s = re.sub(
            r"\b(very|really|extremely|basically|actually|significantly)\b",
            "",
            s,
            flags=re.IGNORECASE,
        )

        bullets.append(f"• {s.strip()}")

    return "\n".join(bullets)
