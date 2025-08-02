import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HospitalMap from "../components/HospitalMap";
import EmerMedCard from "../components/medServ";
import WarnCard from "../components/warningCard";
import VaxCard from "../components/VaxCard";

type VaccineData = {
  vaccine: string;
  description: string;
  link: string;
};

function ResultPage() {
  const location = useLocation();
  const state = location.state as { to?: string; from?: string } | null;

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ✅ Static test vaccine list
  const vaccines: VaccineData[] = [
    {
      vaccine: "Hepatitis A",
      description: "Recommended for most travelers due to food and water risk.",
      link: "https://example.com/hepatitis-a"
    },
    {
      vaccine: "Typhoid",
      description: "Especially important if staying with locals or visiting rural areas.",
      link: "https://example.com/typhoid"
    },
    {
      vaccine: "Yellow Fever",
      description: "Required for entry into certain countries.",
      link: "https://example.com/yellow-fever"
    }
  ];

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setError("Unable to retrieve your location.");
        }
      );
    }
  }, []);

  if (!state?.to || !state?.from) {
    return (
      <div className="p-4 text-red-600">
        Missing travel data. Please navigate from the Home page.
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <h2 className="text-5xl font-extrabold text-[#4B7399] mb-6 text-center">
          {state?.to ?? "[TRIPNAME]"}
        </h2>
      </div>

      <WarnCard />

      <div className="flex flex-col lg:flex-row justify-center items-start gap-6 mt-6 mb-6">
        {/* Recommended Vaccines Card */}
        <div className="p-4 rounded-3xl border-[3px] border-black shadow-md bg-white w-full max-w-md">
            <h2 className="text-lg font-bold text-center text-[#4B7399] mb-4">
            Recommended Vaccines
            </h2>
            <div className="flex flex-col gap-4">
            {vaccines.map((v, index) => (
                <VaxCard
                key={index}
                avoidName={v.vaccine}
                description={v.description}
                symbol="bi bi-syringe"
                />
            ))}
            </div>
        </div>

        {/* Avoid... Card */}
        <div className="p-4 rounded-3xl border-[3px] border-black shadow-md bg-[#E9F7FF] w-full max-w-md">
            <h2 className="text-lg font-bold text-center text-[#4B7399] mb-4">
            Avoid...
            </h2>
            <div className="flex flex-col gap-4">
            <VaxCard
                avoidName="Food"
                description="• Uncooked meats\n• Street food\n• Tap water"
                symbol="bi bi-fork-knife"
            />
            <VaxCard
                avoidName="Animal"
                description="• Stray dogs\n• Monkeys\n• Farm animals"
                symbol="bi bi-paw"
            />
            <VaxCard
                avoidName="Insect"
                description="• Mosquitoes\n• Ticks\n• Sandflies"
                symbol="bi bi-bug"
            />
            </div>
        </div>
        </div>

      <EmerMedCard />

      <h2 className="text-xl font-bold mt-10 text-blue-900 mb-4">
        Hospitals and Clinics Nearby You...
      </h2>

      {error && <p className="text-red-600">{error}</p>}

      {userLocation ? (
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden">
            <HospitalMap center={userLocation} />
          </div>

          <button
            onClick={() => console.log("Clicked!")}
            className="fixed bottom-6 right-6 w-12 h-12 bg-[#4B7399] text-white rounded-full flex items-center justify-center hover:bg-[#37536d] transition"
          >
            <i className="bi bi-chat-dots-fill text-xl"></i>
          </button>
        </div>
      ) : (
        <p className="text-gray-600">Getting your location...</p>
      )}
    </div>
  );
}

export default ResultPage;
