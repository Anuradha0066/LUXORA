import { AdultsDropdown, CheckIn, CheckOut, KidsDropdown } from '.';
import { useRoomContext } from '../context/RoomContext';
import { Link } from 'react-router-dom';


const BookForm = () => {

  const { handleCheck } = useRoomContext();
  const { availabilityMessage, availabilityCount } = useRoomContext();

const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ /* booking data */ }) });
  // handle response ...
};

  return (
    <form className='h-[300px] lg:h-[70px] w-full'>
      <div className='flex flex-col w-full h-full lg:flex-row'>

        <div className='flex-1 border-r'>
          <CheckIn />
        </div>

        <div className='flex-1 border-r'>
          <CheckOut />
        </div>

        <div className='flex-1 border-r'>
          <AdultsDropdown />
        </div>

        <div className='flex-1 border-r'>
          <KidsDropdown />
        </div>

        <div className='flex items-center gap-4'>
          <button
            type='submit'
            className='btn btn-primary'
            onClick={(e) => handleCheck(e)}
          >
            Check Now
          </button>

          {/* availability message shown after check */}
          {
            availabilityMessage && (
              <div className='text-sm text-primary bg-white/90 px-3 py-2 rounded shadow'>
                <span>{availabilityMessage}</span>
                {
                  availabilityCount > 0 && (
                    <button
                      onClick={() => {
                        const el = document.getElementById('rooms');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className='ml-3 underline'
                    >
                      View
                    </button>
                  )
                }
              </div>
            )
          }
        </div>

      </div>
    </form>
  );
};

export default BookForm;
