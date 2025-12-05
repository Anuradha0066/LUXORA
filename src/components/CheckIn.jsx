import { BsCalendar } from 'react-icons/bs';
import { useRoomContext } from '../context/RoomContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/datepicker.css';

const CheckIn = () => {
  const { checkInDate, setCheckInDate, checkOutDate } = useRoomContext();

  const today = new Date();

  return (
    <div className='relative flex items-center justify-end h-full'>
      <div className='absolute z-10 pr-8'>
        <BsCalendar className='text-accent text-base' />
      </div>

      <DatePicker
        className='w-full h-full'
        selected={checkInDate}
        placeholderText='Check in'
        onChange={(date) => {
          setCheckInDate(date);
          // if checkout is before checkin, reset checkout
          if (checkOutDate && date > checkOutDate) {
            setCheckOutDate(null);
          }
        }}
        minDate={today}
      />
    </div>
  );
};

export default CheckIn;
