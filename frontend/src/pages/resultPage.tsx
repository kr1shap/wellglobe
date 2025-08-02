import { useLocation } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const state = location.state as { to?: string; from?: string } | null;

  if (!state?.to || !state?.from) {
    return (
      <div className="p-4 text-red-600">
        Missing travel data. Please navigate from the Home page.
      </div>
    );
  }

  return (
    <div className="p-4">
      <p className="text-xl font-bold">From: {state.from}</p>
      <p className="text-xl font-bold">To: {state.to}</p>
    </div>
  );
}

export default ResultPage;
