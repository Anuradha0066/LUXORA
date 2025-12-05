import { AdultsDropdown, CheckIn, CheckOut, KidsDropdown, ScrollToTop } from '../components';
import { useRoomContext } from '../context/RoomContext';
import { hotelRules } from '../constants/data';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { addBooking as localAddBooking } from '../utils/bookings';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rooms, checkInDate, checkOutDate, adults, kids } = useRoomContext();

  const room = rooms.find((room) => room.id === +id);

  useEffect(() => {
    if (!room) {
      const timer = setTimeout(() => navigate('/'), 3000);
      return () => clearTimeout(timer);
    }
  }, [room, navigate]);

  if (!room) {
    return (
      <section className="flex justify-center items-center h-screen flex-col text-center">
        <h1 className="text-3xl font-semibold mb-4">Room not found 🏨</h1>
        <p>Redirecting to homepage...</p>
      </section>
    );
  }

  const { name, description, facilities, price, imageLg } = room;

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
  });

  // NEW CHANGE ADDED HERE 👇 (DO NOT REMOVE ORIGINAL)
const onBookSubmit = async () => {
  // ✅ Check-in & Check-out validation
  if (!checkInDate || !checkOutDate) {
    alert("Please select check-in and check-out dates.");
    return;
  }

 const payload = {
  guestName: formValues.name || "Unknown Guest",
  guestEmail: formValues.email || "Not Provided",
  roomName: room.name,
  roomId: Number(room.id),                  // ensure number
  checkIn: checkInDate ? new Date(checkInDate) : null,
  checkOut: checkOutDate ? new Date(checkOutDate) : null,
  adults: Number(adults[0]) || 1,           // convert "1 Adult" -> 1
  kids: Number(kids[0]) || 0,               // convert "0 Kid" -> 0
  price: room.price,
  createdAt: new Date()
};

  try {
    const res = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error("Booking failed");
    }

    alert("Booking Successful! Staff will see.");

    // 🔥 Reset inserted values automatically
    setFormValues({ name: "", email: "" });

    // Optional: reset RoomContext dates/dropdowns if needed
    navigate('/', { replace: true });

  } catch (err) {
    console.error(err);

    // Save locally if offline
    localAddBooking(payload);
    alert("Offline booking saved temporarily!");

    setFormValues({ name: "", email: "" });
    navigate('/', { replace: true });
  }
};



  return (
    <section>
      <ScrollToTop />

      <div
        className="bg-room h-[560px] relative flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${imageLg})` }}
      >
        <div className="absolute w-full h-full bg-black/70" />
        <h1 className="text-6xl text-white z-20 font-primary text-center">
          {name} Details
        </h1>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-x-8 h-full py-24">

          <div className="w-full lg:w-[60%] h-full text-justify">
            <h2 className="h2">{name}</h2>
            <p className="mb-8">{description}</p>
            <img className="mb-8 rounded-2xl shadow-lg" src={imageLg} alt={name} />

            <div className="mt-12">
              <h3 className="h3 mb-6">Facilities</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-12">
                {facilities.map((item, index) => (
                  <div key={index} className="flex items-center gap-x-3 flex-1">
                    <div className="text-3xl text-accent">
                      <item.icon />
                    </div>
                    <div className="text-base">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[40%] h-full">

            <div className="py-8 px-6 bg-accent/20 mb-12 rounded-2xl shadow-md">
              <div className="flex flex-col space-y-4 mb-4">
                <h3 className="h3">Your Reservation</h3>

                {/* NEW ADDED INPUTS HERE */}
                <input
                  type="text"
                  value={formValues.name}
                  onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                  placeholder="Enter Your Name"
                  className="border p-2 rounded"
                />

                <input
                  type="email"
                  value={formValues.email}
                  onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                  placeholder="Enter Your Email"
                  className="border p-2 rounded"
                />

                {/* NO REMOVAL DONE BELOW */}
                <div className="h-[60px]"><CheckIn /></div>
                <div className="h-[60px]"><CheckOut /></div>
                <div className="h-[60px]"><AdultsDropdown /></div>
                <div className="h-[60px]"><KidsDropdown /></div>
              </div>

              <button
                className="btn btn-lg btn-primary w-full"
                onClick={onBookSubmit}
              >
                Book now for ${price}
              </button>

            </div>

            <div>
              <h3 className="h3 mb-4">Hotel Rules</h3>
              <ul className="flex flex-col gap-y-4">
                {hotelRules.map(({ rules }, idx) => (
                  <li key={idx} className="flex items-center gap-x-4">
                    <FaCheck className="text-accent" />
                    {rules}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
