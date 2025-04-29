import { useEffect, useState } from "react";

import { SubmissionsService } from "../../services/submissions/submissions.service";
import TanstackRiwayatVerifikasi from "../../components/table/TanstackRiwayatVerifikasi";

const RiwayatVerifikasi = () => {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerifications = async () => {
      try {
        setLoading(true);
        const response = await SubmissionsService.getSubmissions({
          status: { eq: "pending" },
        });

        setVerifications(response.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching verification history:", error);
        setError("Failed to fetch verification history");
        setLoading(false);
      }
    };

    fetchVerifications();
  }, []);

  return (
    <div className="py-10 px-6">
      <h1 className="text-3xl font-bold text-black text-center">
        Riwayat Verifikasi
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      ) : (
        <TanstackRiwayatVerifikasi data={verifications} />
      )}
    </div>
  );
};

export default RiwayatVerifikasi;
