import React, { useState, useEffect } from "react";
import { ref, set } from "firebase/database";
import { db } from "../../firebase";
const index = () => {
  const [NoteNumber, setNoteNumber] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [UID, setUID] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        console.log(p.coords.longitude);
        console.log(p.coords.latitude);
        setLongitude(p.coords.longitude);
        setLatitude(p.coords.latitude);
        setUID(localStorage.getItem("userUID"));
      });
    } else {
      setError("Your Longitude and Latitude was not found");
    }
  }, []);

  function setData(NoteNumber, price, longitude, latitude, uid) {
    return set(ref(db, "CurrencyInfo/" + uid), {
      NoteNumber: NoteNumber,
      Price: price,
      Longitude: longitude,
      Latitude: latitude,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (NoteNumber === "" && price === "") {
      setError("Enter the value");
      return;
    }
    try {
      setLoading(true);
      await setData(NoteNumber, price, longitude, latitude, UID);
      setError("Your data is Submited Successfully");
      setNoteNumber("");
      setPrice("");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <section>
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="w-full max-w-xl mx-auto lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-neutral-600">
              Currency App
            </h2>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form method="POST" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  {/* <label
                    htmlFor="text"
                    className="block text-sm font-medium text-neutral-600"
                  >
                    Note Number
                  </label> */}
                  <div className="mt-1">
                    <input
                      id="noteNumber"
                      name="noteNumber"
                      onChange={(e) => setNoteNumber(e.target.value)}
                      type="text"
                      required=""
                      value={NoteNumber}
                      placeholder="Enter Note Number"
                      className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="mt-1">
                    <input
                      id="price"
                      name="price"
                      type="number"
                      onChange={(e) => setPrice(e.target.value)}
                      required=""
                      value={price}
                      placeholder="Enter Price"
                      className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    />
                  </div>
                </div>

                {error && <p className="text-2xl text-teal-500">{error}</p>}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
