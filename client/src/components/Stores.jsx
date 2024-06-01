import { useEffect, useState } from "react";
import LocationSelector from "./StoreLocation/StoreLocation";
import { useNavigate, useLocation } from "react-router-dom";

const ViewStore = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8000/api/v1/store/getStores`,
          {
            method: "GET",
            headers: {
              authorization: "Bearer " + token,
              "Content-type": "application/json",
            },
          }
        ).then((response) => response.json());
        setStores(response.data.stores);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStores();
  }, []);

  return (
    <div className="w-full h-full">
      {loading && <div>Loading...</div>}{" "}
      {!loading && (
        <div className="flex flex-col h-full">
          <p className="text-2xl text-light-gray py-2 border-b border-light-gray font-bold">
            Stores
          </p>
          {stores && stores.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 overflow-y-scroll hide-scrollbar">
              {stores?.map((store) => (
                <div
                  key={store.id}
                  className="bg-mid-gray p-2 rounded-md border border-dark-gray shadow-sm shadow-dark-gray text-light-gray flex flex-col gap-1"
                >
                  <p className="text-lg font-semibold">{store.name}</p>
                  <p className="text-md">Address: {store.address}</p>
                  <p className="text-md">Contact: {store.contactNumber}</p>
                  {store.workers.length > 0 ? (
                    // <div className="flex flex-wrap gap-1 text-sm text-light-gray">
                    //   <span className="font-bold">WorkerIds:</span>
                    //   {store.workers.map((worker) => (
                    //     <span className="text-white">{worker}</span>
                    //   ))}
                    // </div>
                    <div className="text-light-gray">
                      {store.workers.length} workers in this store
                    </div>
                  ) : (
                    <div className="text-light-gray">
                      No workers in this store
                    </div>
                  )}
                  <div className="w-full">
                    <LocationSelector
                      onLocationSelected={() => {}}
                      DEFAULT_POSITION={store.location}
                      styles={"w-full aspect-video"}
                    />
                  </div>
                  <button className="bg-soft-black hover:bg-soft-black/60 px-2 py-1 rounded-md text-light-gray font-bold" onClick={() => navigate(`/u/${store.name}/deep/${store._id}`)}>
                    See Inventories
                  </button>
                </div>
              ))}
            </div>
          )}
          {!stores.length > 0 && (
            <div className="flex-1 flex justify-center items-center w-full">
              <p className="text-lg text-center text-light-gray">
                You are not a part of any store. Kindly join a store.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default ViewStore;
