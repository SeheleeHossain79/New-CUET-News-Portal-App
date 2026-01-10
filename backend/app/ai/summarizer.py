def generate_summary(content: str) -> str:
    """
    Temporary AI summary logic.
    Later we can plug OpenAI / real LLM here.
    """

    if not content:
        return "Summary not available."

    sentences = content.split(".")
    short = sentences[:3]

    bullets = []
    for s in short:
        s = s.strip()
        if s:
            bullets.append(f"• {s}")

    return "\n".join(bullets)
