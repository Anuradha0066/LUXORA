import { BsCalendar } from 'react-icons/bs';
import { useRoomContext } from '../context/RoomContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/datepicker.css';

const CheckOut = () => {
  const { checkInDate, checkOutDate, setCheckOutDate } = useRoomContext();

  return (
    <div className='relative flex items-center justify-end h-full'>
      <div className='absolute z-10 pr-8'>
        <BsCalendar className='text-accent text-base' />
      </div>

      <DatePicker
        className='w-full h-full'
        selected={checkOutDate}
        placeholderText='Check out'
        onChange={(date) => setCheckOutDate(date)}
        minDate={checkInDate || new Date()} // cannot select before check-in
      />
    </div>
  );
};

export default CheckOut;
