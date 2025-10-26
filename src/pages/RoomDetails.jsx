import { AdultsDropdown, CheckIn, CheckOut, KidsDropdown, ScrollToTop } from '../components';
import { useRoomContext } from '../context/RoomContext';
import { hotelRules } from '../constants/data';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { addBooking as localAddBooking } from '../utils/bookings'; // keep fallback

const RoomDetails = () => {
  const { id } = useParams(); // Get room id from URL
  const navigate = useNavigate();
  const { rooms } = useRoomContext();

  // Find the matching room (id is string, so convert to number)
  const room = rooms.find((room) => room.id === +id);

  // If room not found, redirect or show fallback
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
    checkIn: '',
    checkOut: '',
    amount: '',
  });

  const onBookSubmit = async (formValues) => {
    const payload = {
      guest: formValues.name,
      email: formValues.email,
      room: room.name,
      checkIn: formValues.checkIn,
      checkOut: formValues.checkOut,
      amount: formValues.amount || room.price,
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Booking failed');
      const data = await res.json();
      // optional local copy
      localAddBooking(payload);
      alert('Booking confirmed — staff dashboard updated');
      // navigate to confirmation or update UI
      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
      localAddBooking(payload);
      alert('Booking stored locally (offline)');
      navigate('/', { replace: true });
    }
  };

  return (
    <section>
      <ScrollToTop />

      {/* Hero section */}
      <div
        className="bg-room h-[560px] relative flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${imageLg})` }}
      >
        <div className="absolute w-full h-full bg-black/70" />
        <h1 className="text-6xl text-white z-20 font-primary text-center">
          {name} Details
        </h1>
      </div>

      {/* Main content */}
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-x-8 h-full py-24">

          {/* Left side */}
          <div className="w-full lg:w-[60%] h-full text-justify">
            <h2 className="h2">{name}</h2>
            <p className="mb-8">{description}</p>
            <img className="mb-8 rounded-2xl shadow-lg" src={imageLg} alt={name} />

            <div className="mt-12">
              <h3 className="h3 mb-6">Facilities</h3>

              {/* icons grid */}
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

          {/* Right side */}
          <div className="w-full lg:w-[40%] h-full">

            {/* reservation */}
            <div className="py-8 px-6 bg-accent/20 mb-12 rounded-2xl shadow-md">
              <div className="flex flex-col space-y-4 mb-4">
                <h3 className="h3">Your Reservation</h3>
                <div className="h-[60px]"><CheckIn /></div>
                <div className="h-[60px]"><CheckOut /></div>
                <div className="h-[60px]"><AdultsDropdown /></div>
                <div className="h-[60px]"><KidsDropdown /></div>
              </div>

              <button className="btn btn-lg btn-primary w-full">
                Book now for ${price}
              </button>
            </div>

            {/* Hotel Rules */}
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
