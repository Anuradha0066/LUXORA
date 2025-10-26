const KEY = 'hotelBookings';

export function getBookings() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addBooking(booking) {
  const bookings = getBookings();
  const id = Date.now();
  const record = { id, ...booking };
  bookings.unshift(record);
  localStorage.setItem(KEY, JSON.stringify(bookings));
  return record;
}

export function clearBookings() {
  localStorage.removeItem(KEY);
}