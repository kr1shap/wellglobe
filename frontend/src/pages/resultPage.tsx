import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HospitalMap from "../components/HospitalMap";
import EmerMedCard from "../components/medServ";
import WarnCard from "../components/warningCard";
import VaxCard from "../components/vaxCard";
import AvoidCard from "../components/avoidCard";
import CheckList from "../components/checkList";

import type { advisory } from "../schema/advisory";
import type { emergency } from "../schema/emergency";
import type { vaccines } from "../schema/vaccine";
import type { avoidance } from "../schema/avoidance";

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { to?: string; from?: string } | null;
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [avoidance, setAvoidance] = useState<avoidance | null>(null);
  const [advisory, setAdvisory] = useState<advisory | null>(null);
  const [emergency, setEmergency] = useState<emergency | null>(null);
  const [vaccines, setVaccines] = useState<vaccines | null>(null);

  const goToChatBot = () => {
    navigate("/chat", {
      state: {
        to: state?.to,
        from: state?.from,
      },
    });
  };

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
    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      if (!state || !state.to) {
        setError("Missing destination country.");
        setLoading(false);
        return;
      }

      try {
        const [advisoryRes, emergencyRes, vaccinesRes, avoidanceRes] =
          await Promise.all([
            fetch(
              `http://localhost:8000/advisory/${encodeURIComponent(state.to)}`
            ),
            fetch(
              `http://localhost:8000/emergency/${encodeURIComponent(state.to)}`
            ),
            fetch(
              `http://localhost:8000/vaccines/${encodeURIComponent(state.to)}`
            ),
            fetch(
              `http://localhost:8000/avoidance/${encodeURIComponent(state.to)}`
            ),
          ]);

        if (!advisoryRes.ok || !emergencyRes.ok || !vaccinesRes.ok) {
          throw new Error("One or more requests failed.");
        }

        const [advisoryData, emergencyData, vaccinesData, avoidanceData] =
          await Promise.all([
            advisoryRes.json(),
            emergencyRes.json(),
            vaccinesRes.json(),
            avoidanceRes.json(),
          ]);

        setAdvisory(advisoryData);
        setEmergency(emergencyData);
        setVaccines(vaccinesData);
        setAvoidance(avoidanceData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data.");
        setAdvisory(null);
        setEmergency(null);
        setVaccines(null);
        setAvoidance(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (!state?.to || !state?.from) {
    return (
      <div className="p-4 text-red-600">
        Missing travel data. Please navigate from the Home page.
      </div>
    );
  }

  //function capitalizes first letter of string
  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="p-4 min-h-screen justify-center max-w-7xl mx-auto w-full flex flex-col items-center">
      <div className="flex justify-center mt-5">
        <h2 className="text-5xl font-extrabold text-[#0f3252] mb-6 text-center">
          {state?.to.toUpperCase() ?? "[TRIPNAME]"}
        </h2>
      </div>

      <WarnCard advisory={advisory} />

      <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mt-6 mb-6 w-full">
        {/* Recommended vax */}
        <div className="flex flex-col justify-center items-center p-4 rounded-3xl border-[3px] border-black shadow-md bg-white/60 w-full max-w-md">
          <h2 className="text-lg font-bold text-center text-[#4B7399] mb-4">
            Recommended Vaccines
          </h2>
          <div
            className="flex flex-col gap-4 overflow-y-auto max-h-[400px] pr-2"
            style={{ minHeight: "200px" }}
          >
            {vaccines &&
              vaccines.vaccines.map((v, index) => (
                <div key={index} className="flex-shrink-0">
                  <VaxCard
                    avoidName={capitalizeFirst(v.vaccine)}
                    description={v.description}
                    url={v.link}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* things to avoid, be concerned abt */}
        <div className="flex flex-col justify-center items-center p-4 rounded-3xl border-[3px] border-black shadow-md bg-white/60 w-full max-w-md">
          <h2 className="text-lg font-bold text-center text-[#4B7399] mb-4">
            Avoid...
          </h2>
          {avoidance && (
            <div className="flex flex-col gap-4">
              <AvoidCard
                title="Animals"
                desc={avoidance.animal}
                symbol="bi bi-bluesky"
              />
              <AvoidCard
                title="Food"
                desc={avoidance.food}
                symbol="bi bi-fork-knife"
              />
              <AvoidCard
                title="Insects"
                desc={avoidance.insect}
                symbol="bi bi-bug"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <EmerMedCard emerg={emergency?.emergency_numbers} />

        <CheckList />
      </div>

      <h2 className="text-xl font-bold mt-10 text-blue-900 mb-4 text-center">
        Hospitals and Clinics Nearby You...
      </h2>

      {error && <p className="text-red-600">{error}</p>}

      {userLocation ? (
        <div className="space-y-4 w-full max-w-4xl mx-auto">
          <div className="rounded-lg overflow-hidden">
            <HospitalMap center={userLocation} />
          </div>

          <button
            onClick={() => goToChatBot()}
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
