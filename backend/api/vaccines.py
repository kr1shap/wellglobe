from fastapi import APIRouter, HTTPException
import json
from pathlib import Path

router = APIRouter()
data_dir = Path(__file__).parent.parent / "data"

with open(data_dir / "reccVacc.json", "r") as f:
    reccomVaccines = json.load(f)

with open(data_dir / "vaccInfo.json", "r") as f:
    vaccInfo = json.load(f)


@router.get("/vaccines/{country}")
async def get_vaccines_by_country(country: str):
    country = country.lower()
    if country not in reccomVaccines:
        raise HTTPException(status_code=404, detail="Country not found")

    vaccines = reccomVaccines[country].get("recommended", [])
    result = []

    for v in vaccines:
        info = vaccInfo.get(v)
        if info:
            result.append({
                "vaccine": v,
                "description": info.get("description", "No description available"),
                "link": info.get("link", "")
            })
        else:
            result.append({
                "vaccine": v,
                "description": "Description not available",
                "link": ""
            })

    return {"country": country, "vaccines": result}
