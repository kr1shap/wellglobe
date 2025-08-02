from fastapi import APIRouter, HTTPException
import json
from pathlib import Path
import httpx

router = APIRouter()
data_dir = Path(__file__).parent.parent / "data"

#iso codes 
with open(data_dir / "iso.json", "r") as f:
    isocodes = json.load(f)


@router.get("/emergency/{country}")
async def get_emergency_numbers(country: str):
    country_lower = country.lower()

    if country_lower not in isocodes:
        raise HTTPException(status_code=404, detail="Country not found")

    iso_code = isocodes[country_lower]

    api_url = f"https://emergencynumberapi.com/api/country/{iso_code}"

    async with httpx.AsyncClient() as client:
        resp = await client.get(api_url)
        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail="Failed to fetch emergency numbers")

        data = resp.json()

    # Extract emergency numbers labeled by service
    emergency_numbers = {}

    for service in ("ambulance", "fire", "police"):
        all_numbers = data.get("data", {}).get(service, {}).get("all", [])
        valid_numbers = [num.strip() for num in all_numbers if num.strip()]
        if not valid_numbers:
            valid_numbers = ["911"]  # default fallback
        emergency_numbers[service] = valid_numbers

    # If no numbers found, append "911"
    if not emergency_numbers:
        emergency_numbers.add("911")

    return {
        "country": country,
        "iso_code": iso_code,
        "emergency_numbers": emergency_numbers
    }