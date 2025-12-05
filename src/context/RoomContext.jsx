import { createContext, useContext, useEffect, useState } from "react";
import { roomData } from "../db/data";


const RoomInfo = createContext();


export const RoomContext = ({ children }) => {

  const [rooms, setRooms] = useState(roomData);
  const [loading, setLoading] = useState(false);

  const [adults, setAdults] = useState('1 Adult');
  const [kids, setKids] = useState('0 Kid');
  const [total, setTotal] = useState(0);
  const [availabilityCount, setAvailabilityCount] = useState(null);
  const [availabilityMessage, setAvailabilityMessage] = useState('');

  // New states for check-in and check-out dates
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);


  useEffect(() => { setTotal(+adults[0] + +kids[0]) });


  const resetRoomFilterData = () => {
    setAdults('1 Adult');
    setKids('0 Kid');
    setRooms(roomData)
    setAvailabilityCount(null);
    setAvailabilityMessage('');
    setCheckInDate(null);
    setCheckOutDate(null);
  };


  // user click at --> Check Now button... then execute this function...
  const handleCheck = (e) => {
    e.preventDefault();
    setLoading(true);

    // filter rooms based on total persons...
    const filterRooms = roomData.filter(room => total <= room.maxPerson)

    setTimeout(() => {
      setLoading(false);
      setRooms(filterRooms); // refresh UI with new filtered rooms after 3 second...
      // update availability info
      setAvailabilityCount(filterRooms.length);
      if (filterRooms.length === 0) {
        setAvailabilityMessage('No rooms available for selected guests');
      } else if (filterRooms.length === 1) {
        setAvailabilityMessage('1 room available for selected guests');
      } else {
        setAvailabilityMessage(`${filterRooms.length} rooms available for selected guests`);
      }
      // automatically clear message after 8 seconds
      setTimeout(() => {
        setAvailabilityMessage('');
      }, 8000);
    }, 3000);
  }


  const shareWithChildren = {
    rooms, loading,
    adults, setAdults,
    kids, setKids,
    checkInDate, setCheckInDate,
    checkOutDate, setCheckOutDate,
    handleCheck,
    resetRoomFilterData,
    availabilityCount,
    availabilityMessage,
  };


  return (
    <RoomInfo.Provider value={shareWithChildren}>
      {
        children
      }
    </RoomInfo.Provider>
  )
}

export const useRoomContext = () => useContext(RoomInfo);
